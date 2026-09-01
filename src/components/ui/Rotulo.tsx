export default function Rotulo({
  children,
  claro = false,
}: {
  children: React.ReactNode;
  claro?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] ${
        claro ? "text-on-dark-muted" : "text-muted"
      }`}
    >
      <span
        aria-hidden
        className="inline-block h-px w-6 bg-brass"
      />
      {children}
    </span>
  );
}
