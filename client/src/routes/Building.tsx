import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { probeCapability } from "@/lib/capability";
import { portfolioData, type Project } from "@/lib/data";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import {
  advance,
  createElevator,
  doorOpening,
  FLOORS,
  requestFloor,
  type ElevatorState,
  type FloorId,
} from "@/world/building/elevator";
import { FLOOR_PLAN, floorById } from "@/world/building/floors";
import Index from "./Index";

const Scene = lazy(() => import("@/world/building/Scene"));

const META = "font-mono uppercase tracking-widest";

function FloorPanel({ floor }: { floor: FloorId }) {
  const plan = floorById(floor);
  const project = plan.projectId
    ? portfolioData.projects.find((p) => p.id === plan.projectId)
    : undefined;

  if (plan.kind === "lobby") {
    const current = portfolioData.experience[portfolioData.experience.length - 1];
    return (
      <>
        <p className={META} style={{ fontSize: "var(--text-meta)", color: plan.accent }}>
          1F · 로비
        </p>
        <h1
          className="mt-4 font-bold leading-[0.9] tracking-tight"
          style={{ fontSize: "var(--text-h1)" }}
        >
          {portfolioData.name}
        </h1>
        <p className="mt-4" style={{ color: "var(--ink-soft)" }}>
          {portfolioData.title} · {current.company}
        </p>
        <p
          className="mt-6"
          style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--ink)", wordBreak: "keep-all" }}
        >
          값을 먼저 재고, 구간을 쪼개고, 비중이 큰 곳부터 고칩니다. 위층으로 올라갈수록 최근
          작업입니다.
        </p>
        <ul className="mt-8 space-y-2">
          {[...FLOOR_PLAN].reverse().map((item) => (
            <li key={item.id} className="flex gap-4">
              <span
                className={META}
                style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)", width: "2.5rem" }}
              >
                {item.id}F
              </span>
              <span style={{ color: "var(--ink)" }}>{item.name}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (plan.kind === "roof") {
    const { openSource, contact, experience } = portfolioData;
    return (
      <>
        <p className={META} style={{ fontSize: "var(--text-meta)", color: plan.accent }}>
          6F · 옥상
        </p>
        <h2 className="mt-4 font-bold leading-tight" style={{ fontSize: "var(--text-h2)" }}>
          그 밖의 것들
        </h2>
        {openSource.map((item) => (
          <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className="mt-6 block">
            <p className="font-bold" style={{ color: "var(--ink)" }}>
              {item.repo} {item.pr}
            </p>
            <p className="mt-1" style={{ lineHeight: 1.8, color: "var(--ink-soft)", wordBreak: "keep-all" }}>
              {item.description}
            </p>
          </a>
        ))}
        <p className="mt-8" style={{ color: "var(--ink-soft)" }}>
          {experience.length}개 경력 · 자격증 {portfolioData.certifications.length}종
        </p>
        <a
          href={`mailto:${contact.email}`}
          className="mt-4 block font-bold"
          style={{ fontSize: "var(--text-h3)", color: "var(--ink)" }}
        >
          {contact.email}
        </a>
        <Link
          href="/index"
          className={`mt-6 inline-block ${META}`}
          style={{ fontSize: "var(--text-meta)", color: plan.accent }}
        >
          전체 이력 보기 →
        </Link>
      </>
    );
  }

  if (!project) return null;

  return (
    <>
      <p className={META} style={{ fontSize: "var(--text-meta)", color: plan.accent }}>
        {floor}F · {project.category}
      </p>
      <h2 className="mt-4 font-bold leading-tight" style={{ fontSize: "var(--text-h2)" }}>
        {project.title}
      </h2>

      {/* 무엇을 만든 것인지 한 줄로 — 제목만으로는 무슨 서비스인지 알 수 없다 */}
      <p className="mt-3 leading-snug" style={{ fontSize: "var(--text-lead)", color: "var(--ink)" }}>
        {project.subtitle}
      </p>

      <dl
        className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-5"
        style={{ borderColor: "var(--rule)" }}
      >
        <div>
          <dt className={META} style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}>
            기간
          </dt>
          <dd className="mt-1 font-mono" style={{ fontSize: "var(--text-meta)", color: "var(--ink)" }}>
            {project.period}
          </dd>
        </div>
        <div>
          <dt className={META} style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}>
            맡은 역할
          </dt>
          <dd className="mt-1 font-bold" style={{ color: plan.accent }}>
            {project.role}
          </dd>
        </div>
      </dl>

      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} 화면`}
          loading="lazy"
          className="mt-6 w-full"
          style={{ border: "1px solid var(--rule)" }}
        />
      )}
      {/* 이 프로젝트가 무엇인지 설명하는 본문. 없는 프로젝트는 요약으로 대신한다. */}
      <p
        className="mt-7"
        style={{
          fontSize: "1rem",
          lineHeight: 1.85,
          color: "var(--ink)",
          wordBreak: "keep-all",
        }}
      >
        {project.description || project.summary}
      </p>

      {project.highlights.length > 0 && (
        <>
          <h3
            className={`mt-8 ${META}`}
            style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}
          >
            핵심 성과
          </h3>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((line) => (
              <li
                key={line}
                className="pl-4"
                style={{
                  borderLeft: `2px solid ${plan.accent}`,
                  lineHeight: 1.75,
                  color: "var(--ink)",
                  wordBreak: "keep-all",
                }}
              >
                {line}
              </li>
            ))}
          </ul>
        </>
      )}
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.techStack.slice(0, 6).map((tech) => (
          <li
            key={tech}
            className={META}
            style={{
              fontSize: "var(--text-meta)",
              color: "var(--ink-soft)",
              border: "1px solid var(--rule)",
              padding: "0.2rem 0.55rem",
            }}
          >
            {tech}
          </li>
        ))}
      </ul>
      {project.hasDetail && (
        <Link
          href={`/case/${project.id}`}
          className={`mt-8 inline-block px-5 py-3 ${META}`}
          style={{ fontSize: "var(--text-meta)", color: "#fff", background: plan.accent }}
        >
          케이스 자세히 읽기 →
        </Link>
      )}
    </>
  );
}

export default function Building() {
  const { name, title } = portfolioData;
  const [, navigate] = useLocation();
  useDocumentTitle(`${name} | ${title}`, `${title}. 층마다 하나씩 쌓은 작업 기록.`);

  const [immersive, setImmersive] = useState<boolean | null>(null);
  const stateRef = useRef<ElevatorState>(createElevator());
  const look = useRef({ yaw: Math.PI, pitch: 0 });
  const move = useRef({ forward: 0, strafe: 0 });
  const [locked, setLocked] = useState(false);
  const [view, setView] = useState({ floor: 1 as FloorId, open: 1, phase: "open" as string });
  const [walking, setWalking] = useState(false);
  const [focused, setFocused] = useState<Project | null>(null);
  const focusedRef = useRef<Project | null>(null);
  const onFocus = useRef<(project: Project | null) => void>(() => {});
  onFocus.current = (project) => {
    focusedRef.current = project;
    setFocused(project);
  };

  const press = (floor: FloorId) => {
    stateRef.current = requestFloor(stateRef.current, floor);
    setView({
      floor: stateRef.current.current,
      open: doorOpening(stateRef.current),
      phase: stateRef.current.phase,
    });
  };

  useEffect(() => {
    setImmersive(probeCapability().immersive);
  }, []);

  // 상태 기계는 ref 로 굴리고, 화면에 필요한 값만 뽑아 리렌더한다.
  useEffect(() => {
    if (!immersive) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      stateRef.current = advance(stateRef.current, delta);
      const next = stateRef.current;
      setView((prev) =>
        prev.floor === next.current && prev.phase === next.phase
          ? prev
          : { floor: next.current, open: doorOpening(next), phase: next.phase },
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [immersive]);

  // 커서를 화면에 가두고 이동량으로 시선을 돌린다.
  // 커서 위치로 각도를 만들면 회전이 화면 폭에 갇혀 뒤를 볼 수 없다.
  useEffect(() => {
    if (!immersive) return;

    const SENSITIVITY = 0.0022;
    const PITCH_LIMIT = 1.2;

    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== document.body) return;
      look.current.yaw -= event.movementX * SENSITIVITY;
      look.current.pitch = Math.max(
        -PITCH_LIMIT,
        Math.min(PITCH_LIMIT, look.current.pitch - event.movementY * SENSITIVITY),
      );
    };

    const onLockChange = () => setLocked(document.pointerLockElement === document.body);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onLockChange);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onLockChange);
    };
  }, [immersive]);

  // WASD · 방향키로 걷는다. 버튼에 포커스가 있을 때는 키를 가로채지 않는다.
  useEffect(() => {
    if (!immersive) return;
    const held = new Set<string>();

    const apply = () => {
      const forward =
        (held.has("KeyW") || held.has("ArrowUp") ? 1 : 0) -
        (held.has("KeyS") || held.has("ArrowDown") ? 1 : 0);
      const strafe =
        (held.has("KeyD") || held.has("ArrowRight") ? 1 : 0) -
        (held.has("KeyA") || held.has("ArrowLeft") ? 1 : 0);
      move.current = { forward, strafe };
      setWalking(forward !== 0 || strafe !== 0);
    };

    const WALK_KEYS = new Set([
      "KeyW",
      "KeyA",
      "KeyS",
      "KeyD",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ]);

    const isTyping = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

    // event.key 가 아니라 event.code 를 본다.
    // 한글 입력 상태에서는 W 를 눌러도 key 가 "ㅈ" 으로 들어와 이동이 통째로 죽는다.
    const down = (event: KeyboardEvent) => {
      if (isTyping(event.target)) return;

      // 커서가 잠긴 동안에는 버튼을 누를 수 없으므로 숫자키로 층을 고른다.
      const digit = Number(event.code.replace(/^(Digit|Numpad)/, ""));
      if (Number.isInteger(digit) && digit >= 1 && digit <= 6) {
        event.preventDefault();
        press(digit as FloorId);
        return;
      }

      // 커서가 잠긴 동안에는 캡션을 클릭할 수 없으므로 E 로 연다.
      if (event.code === "KeyE" || event.code === "Enter") {
        const target = focusedRef.current;
        if (target?.hasDetail) {
          event.preventDefault();
          document.exitPointerLock();
          navigate(`/case/${target.id}`);
        }
        return;
      }

      if (!WALK_KEYS.has(event.code)) return;
      event.preventDefault();
      held.add(event.code);
      apply();
    };
    const up = (event: KeyboardEvent) => {
      held.delete(event.code);
      apply();
    };
    const blur = () => {
      held.clear();
      apply();
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [immersive]);

  if (immersive === null) return null;
  // WebGL 이 없거나 모션을 줄이는 설정이면 평면 이력이 곧 기본 화면이다.
  if (!immersive) return <Index />;

  const moving = view.phase !== "open";

  return (
    <div className="relative min-h-[100svh]">
      <Suspense fallback={null}>
        <Scene state={stateRef} look={look} move={move} onFocus={onFocus} />
      </Suspense>

      {/* 층 표시기 — 크롬을 없애고 숫자와 얇은 선만 남긴다 */}
      <div className="pointer-events-none fixed left-1/2 top-8 z-30 flex -translate-x-1/2 items-baseline gap-3">
        <span
          className="font-mono tabular-nums leading-none"
          style={{ fontSize: "2.6rem", color: "#f6f2ea", textShadow: "0 1px 20px rgba(0,0,0,0.55)" }}
        >
          {String(view.floor).padStart(2, "0")}
        </span>
        <span
          className={META}
          style={{
            fontSize: "var(--text-meta)",
            color: moving ? floorById(view.floor).accent : "rgba(246,242,234,0.72)",
            textShadow: "0 1px 12px rgba(0,0,0,0.6)",
          }}
        >
          {moving ? "이동 중" : floorById(view.floor).name}
        </span>
      </div>

      {/* 조작반 — 실제 엘리베이터 버튼처럼 얇은 링과 점등으로 */}
      <nav
        className="fixed right-8 top-1/2 z-30 -translate-y-1/2 rounded-full px-2 py-3"
        style={{
          background: "rgba(16,15,14,0.55)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
        aria-label="층 선택"
      >
        <ul className="flex flex-col-reverse gap-1.5">
          {FLOORS.map((floor) => {
            const active = view.floor === floor;
            const accent = floorById(floor).accent;
            return (
              <li key={floor}>
                <button
                  type="button"
                  onClick={() => press(floor)}
                  disabled={moving}
                  aria-current={active ? "true" : undefined}
                  aria-label={`${floor}층 ${floorById(floor).name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full font-mono tabular-nums"
                  style={{
                    fontSize: "0.8rem",
                    color: active ? accent : "rgba(246,242,234,0.62)",
                    border: `1px solid ${active ? accent : "rgba(255,255,255,0.14)"}`,
                    background: active ? "rgba(255,255,255,0.06)" : "transparent",
                    boxShadow: active ? `0 0 14px ${accent}55` : "none",
                    opacity: moving && !active ? 0.3 : 1,
                    transition:
                      "color var(--motion-base) var(--ease), border-color var(--motion-base) var(--ease), box-shadow var(--motion-base) var(--ease), opacity var(--motion-base) var(--ease)",
                  }}
                >
                  {floor}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 층 콘텐츠 — 한글은 3D 에 굽지 않고 DOM 으로 얹는다.
          문 앞을 가리지 않도록 왼쪽 아래에 붙이고, 도착한 뒤에만 올라온다. */}
      <div className="pointer-events-none fixed inset-y-0 left-0 z-20 flex items-end">
        <div
          className="pointer-events-auto m-4 max-h-[74svh] w-[min(31rem,calc(100vw-2rem))] overflow-y-auto p-8 sm:m-8"
          style={{
            // 움직이는 3D 위에 반투명 판을 두면 글자 사이로 배경이 비쳐 읽기 어렵다.
            background: "var(--surface)",
            borderLeft: `3px solid ${floorById(view.floor).accent}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            color: "var(--ink)",
            opacity: moving ? 0 : 1,
            transform: moving ? "translateY(2rem)" : "none",
            transition:
              "opacity var(--motion-base) var(--ease), transform var(--motion-slow) var(--ease-out)",
          }}
        >
          <FloorPanel floor={view.floor} />
        </div>
      </div>

      {/* 조준선 — 무엇을 겨냥하는지 보여야 선택이 우연처럼 느껴지지 않는다 */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: focused ? "0.9rem" : "0.32rem",
          height: focused ? "0.9rem" : "0.32rem",
          border: `1px solid ${focused ? focused.accent : "rgba(246,242,234,0.6)"}`,
          background: focused ? "transparent" : "rgba(246,242,234,0.6)",
          transition: "all var(--motion-fast) var(--ease-out)",
        }}
      />

      {/* 조작 안내 — 걷기 시작하면 물러난다 */}
      <div
        className={`pointer-events-none fixed bottom-7 left-1/2 z-30 -translate-x-1/2 ${META}`}
        style={{
          fontSize: "var(--text-meta)",
          color: "rgba(246,242,234,0.7)",
          textShadow: "0 1px 12px rgba(0,0,0,0.7)",
          opacity: walking || moving ? 0 : 1,
          transition: "opacity var(--motion-slow) var(--ease)",
        }}
      >
        WASD 이동 · 마우스 시선 · 숫자키 1–6 층 이동 · ESC 커서 해제
      </div>

      {/* 커서가 풀려 있으면 화면을 눌러 다시 잠근다 */}
      {!locked && (
        <button
          type="button"
          onClick={() => document.body.requestPointerLock()}
          className="fixed inset-0 z-20 flex items-center justify-center"
          style={{ background: "rgba(12,11,10,0.42)", backdropFilter: "blur(2px)" }}
        >
          <span
            className={`px-7 py-4 ${META}`}
            style={{
              fontSize: "var(--text-meta)",
              color: "#f6f2ea",
              border: "1px solid rgba(246,242,234,0.35)",
              background: "rgba(16,15,14,0.6)",
            }}
          >
            화면을 클릭하면 둘러볼 수 있습니다
          </span>
        </button>
      )}

      {/* 미술관에서 작품을 바라보면 뜨는 캡션 */}
      {focused && (
        <button
          type="button"
          onClick={() => focused.hasDetail && navigate(`/case/${focused.id}`)}
          className="fixed bottom-24 left-1/2 z-30 -translate-x-1/2 px-6 py-4 text-left"
          style={{
            background: "rgba(16,15,14,0.72)",
            backdropFilter: "blur(14px)",
            borderLeft: `2px solid ${focused.accent}`,
            color: "#f6f2ea",
          }}
        >
          <span className={META} style={{ fontSize: "var(--text-meta)", color: focused.accent }}>
            {focused.period} · {focused.role}
          </span>
          <span className="mt-1 block font-bold" style={{ fontSize: "var(--text-h3)" }}>
            {focused.title}
          </span>
          <span
            className="mt-1 block max-w-md"
            style={{ color: "rgba(246,242,234,0.78)" }}
          >
            {focused.subtitle}
          </span>
          {focused.hasDetail && (
            <span
              className={`mt-2 block ${META}`}
              style={{ fontSize: "var(--text-meta)", color: "rgba(246,242,234,0.66)" }}
            >
              {locked ? "E 키로 케이스 읽기 →" : "클릭해서 케이스 읽기 →"}
            </span>
          )}
        </button>
      )}

      <Link
        href="/index"
        className={`fixed right-6 top-6 z-30 ${META}`}
        style={{ fontSize: "var(--text-meta)", color: "rgba(246,242,234,0.8)" }}
      >
        Index
      </Link>
    </div>
  );
}
