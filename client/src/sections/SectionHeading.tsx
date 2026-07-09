export default function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="border-t-2 border-foreground pt-4 mb-12">
      <span className="font-mono text-xs font-medium tracking-[0.2em] text-primary">
        {index} — {title}
      </span>
    </div>
  );
}
