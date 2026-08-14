import { useMemo, type RefObject } from "react";
import * as THREE from "three";
import { portfolioData, type Project } from "@/lib/data";
import { makeSign } from "./signage";

const ROOM_W = 16;
const ROOM_D = 20;
const ROOM_H = 4.6;
const DOOR_Z = 1.35;

/** 벽에 걸리는 작품 — 프로젝트 하나가 한 점이다. */
type Hang = {
  project: Project;
  /** 좌측 벽이면 -1, 우측 벽이면 1 */
  side: -1 | 1;
  z: number;
};

function useHangs(): Hang[] {
  return useMemo(() => {
    const shown = portfolioData.projects.filter((p) => p.image);
    return shown.map((project, index) => ({
      project,
      side: index % 2 === 0 ? -1 : 1,
      // 문에서 멀어질수록 최신작 — 걸어 들어가며 시간순으로 본다.
      z: DOOR_Z + 3.6 + Math.floor(index / 2) * 5.4,
    }));
  }, []);
}

function useCaptions(hangs: Hang[]) {
  return useMemo(() => {
    const map = new Map<string, THREE.CanvasTexture>();
    for (const hang of hangs) {
      // 미술관 라벨의 문법 — 제목 아래에 연도와 재료. 여기서는 기간과 맡은 역할.
      map.set(
        hang.project.id,
        makeSign(
          hang.project.title,
          `${hang.project.period} · ${hang.project.role}`,
          hang.project.accent,
        ),
      );
    }
    return map;
  }, [hangs]);
}

function useArtworks(hangs: Hang[]) {
  return useMemo(() => {
    const loader = new THREE.TextureLoader();
    const map = new Map<string, THREE.Texture>();
    for (const hang of hangs) {
      if (!hang.project.image) continue;
      const texture = loader.load(hang.project.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      map.set(hang.project.id, texture);
    }
    return map;
  }, [hangs]);
}

/**
 * 1층 로비 = 미술관. 작품을 양쪽 벽에 지그재그로 걸고 각각에 스포트를 떨군다.
 * 벽은 비우고 조명이 작품만 때리게 두는 것이 전시장의 문법이다.
 */
export default function Gallery({ onFocus }: { onFocus: RefObject<(p: Project | null) => void> }) {
  const hangs = useHangs();
  const artworks = useArtworks(hangs);
  const captions = useCaptions(hangs);
  const nameplate = useMemo(
    () => makeSign(portfolioData.name, portfolioData.title, "#e04b26"),
    [],
  );

  return (
    <group position={[0, 0, DOOR_Z]}>
      {/* 마감 — 밝은 벽, 어두운 폴리시드 바닥, 높은 천장 */}
      <mesh position={[0, 0, ROOM_D / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color="#8e8880" roughness={0.18} metalness={0.06} />
      </mesh>
      <mesh position={[0, ROOM_H, ROOM_D / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color="#efece5" roughness={1} />
      </mesh>
      {[-ROOM_W / 2, ROOM_W / 2].map((x) => (
        <mesh
          key={x}
          position={[x, ROOM_H / 2, ROOM_D / 2]}
          rotation={[0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
        >
          <planeGeometry args={[ROOM_D, ROOM_H]} />
          <meshStandardMaterial color="#f1eee7" roughness={0.98} />
        </mesh>
      ))}
      <mesh position={[0, ROOM_H / 2, ROOM_D]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[ROOM_W, ROOM_H]} />
        <meshStandardMaterial color="#f1eee7" roughness={0.98} />
      </mesh>

      {/* 천장 트랙 두 줄 */}
      {[-ROOM_W / 2 + 2.2, ROOM_W / 2 - 2.2].map((x) => (
        <mesh key={x} position={[x, ROOM_H - 0.12, ROOM_D / 2]}>
          <boxGeometry args={[0.07, 0.07, ROOM_D - 2]} />
          <meshStandardMaterial color="#26241f" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}

      {hangs.map((hang) => {
        const wallX = hang.side * (ROOM_W / 2 - 0.06);
        const facing = hang.side < 0 ? Math.PI / 2 : -Math.PI / 2;
        const texture = artworks.get(hang.project.id);
        const caption = captions.get(hang.project.id);

        return (
          <group key={hang.project.id}>
            {/* 작품 — 얇은 흰 매트 위에 이미지 */}
            <mesh position={[wallX - hang.side * 0.02, 2.05, hang.z]} rotation={[0, facing, 0]}>
              <planeGeometry args={[4.3, 2.65]} />
              <meshStandardMaterial color="#ffffff" roughness={0.95} />
            </mesh>
            <mesh
              position={[wallX - hang.side * 0.05, 2.05, hang.z]}
              rotation={[0, facing, 0]}
              userData={{ projectId: hang.project.id }}
            >
              <planeGeometry args={[3.9, 2.25]} />
              <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>

            {/* 캡션 — 전시장의 작품 라벨. 판 비율은 캔버스(4:1)와 맞춘다. */}
            <mesh position={[wallX - hang.side * 0.04, 0.98, hang.z]} rotation={[0, facing, 0]}>
              <planeGeometry args={[2.6, 0.65]} />
              <meshBasicMaterial map={caption} toneMapped={false} />
            </mesh>

            {/* 스포트 — 작품만 때린다 */}
            <spotLight
              position={[wallX - hang.side * 2.1, ROOM_H - 0.2, hang.z]}
              target-position={[wallX, 2.05, hang.z]}
              angle={0.5}
              penumbra={0.75}
              intensity={48}
              distance={9}
              color="#fff5e8"
              castShadow
            />
            {/* 트랙에 달린 헤드 */}
            <mesh position={[wallX - hang.side * 2.1, ROOM_H - 0.22, hang.z]}>
              <cylinderGeometry args={[0.07, 0.09, 0.22, 12]} />
              <meshStandardMaterial color="#26241f" roughness={0.45} metalness={0.7} />
            </mesh>
          </group>
        );
      })}

      {/* 안쪽 끝 — 이름을 새긴 벽 하나. 로비의 초점. */}
      <mesh position={[0, 2.3, ROOM_D - 0.08]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[6.4, 1.6]} />
        <meshBasicMaterial map={nameplate} toneMapped={false} />
      </mesh>
      <spotLight
        position={[0, ROOM_H - 0.3, ROOM_D - 2.6]}
        target-position={[0, 2.3, ROOM_D]}
        angle={0.6}
        penumbra={0.8}
        intensity={40}
        distance={9}
        color="#fff3e2"
      />

      {/* 전시장 중앙 벤치 */}
      <mesh position={[0, 0.4, ROOM_D / 2]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.12, 3.4]} />
        <meshStandardMaterial color="#9a7a52" roughness={0.62} />
      </mesh>
      {[-1.2, 1.2].map((z) => (
        <mesh key={z} position={[0, 0.17, ROOM_D / 2 + z]}>
          <boxGeometry args={[0.8, 0.34, 0.08]} />
          <meshStandardMaterial color="#b6b1a8" roughness={0.2} metalness={0.95} />
        </mesh>
      ))}

      {/* 전시장 기본 조도는 낮게 — 작품이 밝아야 전시장이다 */}
      <pointLight position={[0, ROOM_H - 0.6, 4]} intensity={9} distance={16} color="#efe9de" />
      <pointLight
        position={[0, ROOM_H - 0.6, ROOM_D - 5]}
        intensity={9}
        distance={16}
        color="#efe9de"
      />
    </group>
  );
}
