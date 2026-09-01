export default function Rotulo({
  children,
  claro = false,
}: {
  children: React.ReactNode;
  claro?: boolean;
}) {
  return (
    <span
      className={`rotulo inline-flex items-center gap-2.5 ${
        claro ? "text-on-dark-muted" : "text-muted"
      }`}
    >
      <span
        aria-hidden
        className={`inline-block h-px w-6 ${
          claro ? "bg-on-dark-muted" : "bg-ink"
        }`}
      />
      {children}
    </span>
  );
}
