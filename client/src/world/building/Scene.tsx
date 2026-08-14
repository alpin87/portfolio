import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { portfolioData, type Project } from "@/lib/data";
import { carY, doorOpening, FLOOR_HEIGHT, type ElevatorState } from "./elevator";
import Gallery from "./Gallery";
import { stepPosition, type MoveInput } from "./movement";
import { FLOOR_PLAN, floorById } from "./floors";
import { makeFloorDisplay, makeSign } from "./signage";

const CAR_W = 2.9;
const CAR_D = 2.7;
const CAR_H = 3.2;
const DOOR_W = CAR_W / 2;
const DOOR_Z = CAR_D / 2;

const ROOM_W = 16;
const ROOM_D = 20;
const ROOM_H = 4.6;

/** 마우스 이동량으로 누적한 시선 각도(라디안). 커서 위치가 아니라 델타로 돈다. */
type Look = { yaw: number; pitch: number };

/**
 * 재질은 네 가지로 묶는다 — 폴리시드 콘크리트, 무광 플라스터, 아노다이즈드 알루미늄, 오크.
 * 종류를 늘리는 대신 거칠기와 금속성으로 구분하는 편이 현대 건축처럼 읽힌다.
 */
const M = {
  concrete: { color: "#9c968d", roughness: 0.22, metalness: 0.04 },
  plaster: { color: "#e7e3da", roughness: 0.97, metalness: 0 },
  plasterDeep: { color: "#d9d4ca", roughness: 0.97, metalness: 0 },
  anodized: { color: "#3a3936", roughness: 0.34, metalness: 0.85 },
  steel: { color: "#b6b1a8", roughness: 0.2, metalness: 0.95 },
  oak: { color: "#9a7a52", roughness: 0.62, metalness: 0.03 },
} as const;

function useFloorTextures() {
  return useMemo(() => {
    const loader = new THREE.TextureLoader();
    const map = new Map<number, THREE.Texture>();
    for (const floor of FLOOR_PLAN) {
      const project = portfolioData.projects.find((p) => p.id === floor.projectId);
      if (!project?.image) continue;
      const texture = loader.load(project.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      map.set(floor.id, texture);
    }
    return map;
  }, []);
}

function useSigns() {
  return useMemo(() => {
    const map = new Map<number, THREE.CanvasTexture>();
    for (const floor of FLOOR_PLAN) {
      map.set(floor.id, makeSign(`${floor.id}F`, floor.name, floor.accent));
    }
    return map;
  }, []);
}

/** 한쪽 벽을 채우는 수직 핀 루버 — 한 겹으로 공간이 건축처럼 선다. */
function Louvers({ x, rotation }: { x: number; rotation: number }) {
  const fins = useMemo(() => {
    const out: number[] = [];
    for (let z = 1.4; z < ROOM_D - 1; z += 0.42) out.push(z);
    return out;
  }, []);

  return (
    <group position={[x, 0, 0]} rotation={[0, rotation, 0]}>
      {fins.map((z) => (
        <mesh key={z} position={[0, ROOM_H / 2, z]} castShadow>
          <boxGeometry args={[0.16, ROOM_H - 0.5, 0.05]} />
          <meshStandardMaterial {...M.oak} />
        </mesh>
      ))}
    </group>
  );
}

function Room({
  state,
  textures,
  signs,
}: {
  state: RefObject<ElevatorState>;
  textures: Map<number, THREE.Texture>;
  signs: Map<number, THREE.CanvasTexture>;
}) {
  const group = useRef<THREE.Group>(null);
  const screen = useRef<THREE.MeshBasicMaterial>(null);
  const sign = useRef<THREE.MeshBasicMaterial>(null);
  const coveMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#fff6ea", toneMapped: false }),
    [],
  );
  const key = useRef<THREE.PointLight>(null);
  const shown = useRef(-1);
  const tint = useMemo(() => new THREE.Color(), []);
  const white = useMemo(() => new THREE.Color("#fff6ea"), []);

  useFrame(() => {
    const now = state.current;
    if (group.current) group.current.visible = doorOpening(now) > 0.01;
    if (shown.current === now.current) return;
    shown.current = now.current;

    const floor = floorById(now.current);
    tint.set(floor.accent);

    const texture = textures.get(floor.id);
    if (screen.current) {
      screen.current.map = texture ?? null;
      screen.current.color.set(texture ? "#ffffff" : "#191817");
      screen.current.needsUpdate = true;
    }
    const signTexture = signs.get(floor.id);
    if (sign.current && signTexture) {
      sign.current.map = signTexture;
      sign.current.needsUpdate = true;
    }
    // 코브 조명에만 층 색을 아주 옅게 섞는다 — 색이 벽을 물들이되 재질을 덮지 않는다.
    coveMaterial.color.copy(white).lerp(tint, 0.22);
    if (key.current) key.current.color.copy(white).lerp(tint, 0.3);
  });

  return (
    <group ref={group} position={[0, 0, DOOR_Z]}>
      {/* 폴리시드 콘크리트 바닥 */}
      <mesh position={[0, 0, ROOM_D / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial {...M.concrete} />
      </mesh>

      {/* 떠 있는 천장판 — 벽에서 띄워 둘레에 코브 조명이 들어간다 */}
      <mesh position={[0, ROOM_H - 0.18, ROOM_D / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM_W - 1.6, ROOM_D - 1.6]} />
        <meshStandardMaterial {...M.plaster} />
      </mesh>
      <mesh position={[0, ROOM_H, ROOM_D / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial {...M.plasterDeep} />
      </mesh>
      {/* 코브 — 천장판 둘레를 따라 도는 간접광 띠.
          두 띠가 같은 재질 인스턴스를 공유해야 색이 함께 바뀐다. */}
      {[-(ROOM_W - 1.6) / 2, (ROOM_W - 1.6) / 2].map((x) => (
        <mesh
          key={x}
          position={[x, ROOM_H - 0.19, ROOM_D / 2]}
          rotation={[Math.PI / 2, 0, 0]}
          material={coveMaterial}
        >
          <planeGeometry args={[0.16, ROOM_D - 1.6]} />
        </mesh>
      ))}

      {/* 좌: 전면 글레이징 — 바깥 빛이 들어오는 밝은 면 */}
      <mesh position={[-ROOM_W / 2, ROOM_H / 2, ROOM_D / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[ROOM_D, ROOM_H]} />
        <meshBasicMaterial color="#f6f1e6" toneMapped={false} />
      </mesh>
      {/* 창 멀리언 */}
      {[3, 7, 11, 15].map((z) => (
        <mesh key={z} position={[-ROOM_W / 2 + 0.06, ROOM_H / 2, z]}>
          <boxGeometry args={[0.08, ROOM_H, 0.12]} />
          <meshStandardMaterial {...M.anodized} />
        </mesh>
      ))}

      {/* 우: 오크 수직 핀 루버 */}
      <mesh position={[ROOM_W / 2, ROOM_H / 2, ROOM_D / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[ROOM_D, ROOM_H]} />
        <meshStandardMaterial {...M.plasterDeep} />
      </mesh>
      <Louvers x={ROOM_W / 2 - 0.12} rotation={0} />

      {/* 안쪽 끝: 무광 플라스터 벽 + 프레임 없는 대형 스크린 */}
      <mesh position={[0, ROOM_H / 2, ROOM_D]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[ROOM_W, ROOM_H]} />
        <meshStandardMaterial {...M.plaster} />
      </mesh>
      <mesh position={[0, 2.25, ROOM_D - 0.16]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[8, 4.5]} />
        <meshBasicMaterial ref={screen} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      {/* 스크린 뒤 반사광 — 화면이 벽에서 떠 보인다 */}
      <pointLight position={[0, 2.25, ROOM_D - 1.2]} intensity={12} distance={9} color="#cfd6e0" />

      {/* 문 옆 층 사인 */}
      <mesh position={[-3.9, 2.35, 0.06]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.2, 0.8]} />
        <meshBasicMaterial ref={sign} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* 모놀리식 카운터 — 상판 없이 하나의 덩어리로 */}
      <mesh position={[2.6, 0.52, ROOM_D - 6]} castShadow receiveShadow>
        <boxGeometry args={[5, 1.04, 0.8]} />
        <meshStandardMaterial {...M.plasterDeep} />
      </mesh>
      <mesh position={[2.6, 1.05, ROOM_D - 6]}>
        <boxGeometry args={[5.1, 0.03, 0.86]} />
        <meshStandardMaterial {...M.anodized} />
      </mesh>

      {/* 벤치 하나 — 사람이 머무는 자리가 있어야 공간이 산다 */}
      <mesh position={[-4.2, 0.42, ROOM_D - 11]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.14, 0.9]} />
        <meshStandardMaterial {...M.oak} />
      </mesh>
      {[-5.5, -2.9].map((x) => (
        <mesh key={x} position={[x, 0.18, ROOM_D - 11]} castShadow>
          <boxGeometry args={[0.09, 0.36, 0.8]} />
          <meshStandardMaterial {...M.steel} />
        </mesh>
      ))}

      <pointLight ref={key} position={[0, ROOM_H - 0.6, 4.5]} intensity={34} distance={22} />
      <pointLight
        position={[0, ROOM_H - 0.6, ROOM_D - 5]}
        intensity={30}
        distance={20}
        color="#fff3e0"
      />
      {/* 창 쪽에서 들어오는 주광 */}
      <directionalLight position={[-9, 3.2, ROOM_D / 2]} intensity={1.5} color="#f4efe4" />
    </group>
  );
}

/**
 * 도착한 층에 따라 공간을 갈아끼운다.
 * 1층은 미술관, 그 위는 프로젝트 층. 지오메트리를 한 번에 하나만 들고 있는다.
 */
function Floors({
  state,
  textures,
  signs,
  onFocus,
}: {
  state: RefObject<ElevatorState>;
  textures: Map<number, THREE.Texture>;
  signs: Map<number, THREE.CanvasTexture>;
  onFocus: RefObject<(project: Project | null) => void>;
}) {
  const [floor, setFloor] = useState(1);
  const [visible, setVisible] = useState(true);

  useFrame(() => {
    const now = state.current;
    const open = doorOpening(now) > 0.01;
    if (open !== visible) setVisible(open);
    if (now.current !== floor) setFloor(now.current);
  });

  if (!visible) return null;
  return floor === 1 ? (
    <Gallery onFocus={onFocus} />
  ) : (
    <Room state={state} textures={textures} signs={signs} />
  );
}

function Car({ state }: { state: RefObject<ElevatorState> }) {
  const leftDoor = useRef<THREE.Mesh>(null);
  const rightDoor = useRef<THREE.Mesh>(null);
  const display = useMemo(makeFloorDisplay, []);
  const stamp = useRef(Number.NaN);

  useFrame(() => {
    const now = state.current;
    const slide = doorOpening(now) * (DOOR_W - 0.04);
    if (leftDoor.current) leftDoor.current.position.x = -DOOR_W / 2 - slide;
    if (rightDoor.current) rightDoor.current.position.x = DOOR_W / 2 + slide;

    const traveling = now.phase === "traveling";
    const next = traveling ? -now.target : now.current;
    if (stamp.current !== next) {
      stamp.current = next;
      display.draw(traveling ? `${now.target}` : `${now.current}`, floorById(now.target).accent);
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[CAR_W, CAR_D]} />
        <meshStandardMaterial {...M.concrete} />
      </mesh>
      <mesh position={[0, CAR_H, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[CAR_W, CAR_D]} />
        <meshStandardMaterial {...M.plaster} />
      </mesh>

      {/* 뒷벽은 거울 — 승강기 안이라는 신호가 가장 확실한 재질 */}
      <mesh position={[0, CAR_H / 2, -CAR_D / 2]}>
        <planeGeometry args={[CAR_W, CAR_H]} />
        <meshStandardMaterial color="#8e8a84" roughness={0.08} metalness={1} />
      </mesh>
      {[-CAR_W / 2, CAR_W / 2].map((x) => (
        <mesh
          key={x}
          position={[x, CAR_H / 2, 0]}
          rotation={[0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
        >
          <planeGeometry args={[CAR_D, CAR_H]} />
          <meshStandardMaterial {...M.anodized} />
        </mesh>
      ))}

      {/* 삼면 핸드레일 */}
      {[
        { p: [0, 0.95, -CAR_D / 2 + 0.08] as const, r: [0, 0, Math.PI / 2] as const, l: CAR_W - 0.3 },
        { p: [-CAR_W / 2 + 0.08, 0.95, 0] as const, r: [Math.PI / 2, 0, 0] as const, l: CAR_D - 0.3 },
        { p: [CAR_W / 2 - 0.08, 0.95, 0] as const, r: [Math.PI / 2, 0, 0] as const, l: CAR_D - 0.3 },
      ].map((bar, index) => (
        <mesh key={index} position={bar.p} rotation={bar.r}>
          <cylinderGeometry args={[0.028, 0.028, bar.l, 12]} />
          <meshStandardMaterial {...M.steel} />
        </mesh>
      ))}

      {/* 문틀 · 층 표시기 · 문짝 */}
      <mesh position={[0, CAR_H - 0.1, DOOR_Z]}>
        <boxGeometry args={[CAR_W, 0.2, 0.2]} />
        <meshStandardMaterial {...M.anodized} />
      </mesh>
      <mesh position={[0, CAR_H - 0.44, DOOR_Z - 0.02]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.78, 0.34]} />
        <meshBasicMaterial map={display.texture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={leftDoor} position={[-DOOR_W / 2, CAR_H / 2, DOOR_Z]} castShadow>
        <boxGeometry args={[DOOR_W, CAR_H, 0.12]} />
        <meshStandardMaterial {...M.steel} />
      </mesh>
      <mesh ref={rightDoor} position={[DOOR_W / 2, CAR_H / 2, DOOR_Z]} castShadow>
        <boxGeometry args={[DOOR_W, CAR_H, 0.12]} />
        <meshStandardMaterial {...M.steel} />
      </mesh>

      {/* 조작반 — 실제 조작은 DOM 이 맡고 여기서는 사실감만 담당한다 */}
      <mesh position={[CAR_W / 2 - 0.05, 1.28, 0.66]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.34, 1.15]} />
        <meshStandardMaterial color="#22211f" roughness={0.28} metalness={0.9} />
      </mesh>

      {/* 천장 슬롯 조명 두 줄 */}
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, CAR_H - 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.14, CAR_D - 0.7]} />
          <meshBasicMaterial color="#fff8ee" toneMapped={false} />
        </mesh>
      ))}
      <pointLight position={[0, CAR_H - 0.45, 0]} intensity={11} distance={7} color="#ffefdc" />
    </group>
  );
}

/** 통로 — 이동 중 지나가는 층이 보여야 속도가 느껴진다. */
function Shaft() {
  return (
    <group>
      {FLOOR_PLAN.map((floor) => (
        <group key={floor.id} position={[0, (floor.id - 1) * FLOOR_HEIGHT, DOOR_Z + 0.45]}>
          <mesh position={[0, -0.35, 0]}>
            <boxGeometry args={[CAR_W + 1.8, 0.42, 0.4]} />
            <meshStandardMaterial color="#3d3a37" roughness={0.95} />
          </mesh>
          <mesh position={[0, -0.35, 0.22]}>
            <boxGeometry args={[0.5, 0.06, 0.02]} />
            <meshBasicMaterial color={floor.accent} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const EYE_HEIGHT = 1.62;
const WALK_SPEED = 3.4;

/**
 * 1인칭 보행. 시선은 마우스가, 이동은 키가 맡는다.
 * 승강기가 오르내리는 동안에도 바닥은 칸을 따라가므로 발이 붕 뜨지 않는다.
 */
function Player({
  state,
  look,
  move,
}: {
  state: RefObject<ElevatorState>;
  look: RefObject<Look>;
  move: RefObject<MoveInput>;
}) {
  const { camera } = useThree();
  const position = useRef({ x: 0, z: -0.55 });
  const smoothed = useRef<Look>({ yaw: Math.PI, pitch: 0 });
  const shake = useRef(0);
  const bob = useRef(0);

  useFrame((_, rawDelta) => {
    const delta = Math.min(0.05, rawDelta);
    const now = state.current;

    // 아주 살짝만 따라가게 둔다 — 지연이 크면 조준이 미끄러진다.
    const follow = Math.min(1, delta * 24);
    smoothed.current.yaw += (look.current.yaw - smoothed.current.yaw) * follow;
    smoothed.current.pitch += (look.current.pitch - smoothed.current.pitch) * follow;

    const yaw = smoothed.current.yaw;
    const doorsOpen = doorOpening(now) > 0.75;

    const before = position.current;
    position.current = stepPosition(before, yaw, move.current, delta, WALK_SPEED, doorsOpen);

    // 실제로 움직인 거리만큼만 걸음이 흔들린다 — 벽에 막히면 흔들림도 멈춘다.
    const travelled = Math.hypot(position.current.x - before.x, position.current.z - before.z);
    bob.current += travelled * 4.2;
    const step = Math.sin(bob.current) * 0.035;

    const shakeTarget = now.phase === "traveling" ? 1 : 0;
    shake.current += (shakeTarget - shake.current) * Math.min(1, delta * 4);
    const jitter = Math.sin(performance.now() * 0.021) * 0.014 * shake.current;

    camera.position.set(
      position.current.x,
      carY(now) + EYE_HEIGHT + step + jitter,
      position.current.z,
    );
    camera.rotation.set(smoothed.current.pitch, yaw, 0, "YXZ");
  });

  return null;
}

/**
 * 화면 한가운데에서 레이를 쏘아 바라보는 작품을 고른다.
 * 마우스 커서로 고르면 시선 조작과 선택이 같은 마우스를 두고 싸워,
 * 고개를 돌리는 순간 선택이 풀린다.
 */
function Crosshair({ onFocus }: { onFocus: RefObject<(p: Project | null) => void> }) {
  const { camera, scene } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const center = useMemo(() => new THREE.Vector2(0, 0), []);
  const held = useRef<string | null>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    // 매 프레임 레이캐스트할 이유가 없다. 10Hz 면 손끝 느낌에 충분하다.
    elapsed.current += delta;
    if (elapsed.current < 0.1) return;
    elapsed.current = 0;

    raycaster.setFromCamera(center, camera);
    const hits = raycaster.intersectObjects(scene.children, true);
    let found: string | null = null;
    for (const hit of hits) {
      const id = hit.object.userData?.projectId;
      if (typeof id === "string") {
        // 너무 먼 작품은 잡지 않는다 — 복도 끝 그림이 계속 뜨면 소음이다.
        if (hit.distance <= 9) found = id;
        break;
      }
    }

    if (found === held.current) return;
    held.current = found;
    onFocus.current?.(
      found ? (portfolioData.projects.find((p) => p.id === found) ?? null) : null,
    );
  });

  return null;
}

function Lift({ state, children }: { state: RefObject<ElevatorState>; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (group.current) group.current.position.y = carY(state.current);
  });
  return <group ref={group}>{children}</group>;
}

export default function Scene({
  state,
  look,
  move,
  onFocus,
}: {
  state: RefObject<ElevatorState>;
  look: RefObject<Look>;
  move: RefObject<MoveInput>;
  onFocus: RefObject<(project: Project | null) => void>;
}) {
  const textures = useFloorTextures();
  const signs = useSigns();

  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 64, near: 0.1, far: 140, position: [0, 1.62, -0.75] }}
      onCreated={({ scene, camera, gl }) => {
        scene.background = new THREE.Color("#0c0b0a");
        camera.rotation.set(0, Math.PI, 0, "YXZ");
        // 필름 톤매핑 — 밝은 창과 어두운 통로가 한 화면에 있어도 계조가 무너지지 않는다.
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <hemisphereLight args={["#f3ece0", "#5a544c", 0.7]} />
      <Player state={state} look={look} move={move} />
      <Crosshair onFocus={onFocus} />
      <Shaft />
      <Lift state={state}>
        <Car state={state} />
        <Floors state={state} textures={textures} signs={signs} onFocus={onFocus} />
      </Lift>
    </Canvas>
  );
}
