/** 인쇄물 질감을 위한 전역 그레인 1장. 포인터 이벤트를 받지 않는다. */
const GRAIN = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
     <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter>
     <rect width="160" height="160" filter="url(#n)"/>
   </svg>`,
)}`;

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage: `url("${GRAIN}")`,
        backgroundRepeat: "repeat",
        opacity: "var(--grain-opacity)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
