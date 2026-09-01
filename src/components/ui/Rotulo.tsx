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
        claro ? "text-white/70" : "text-muted"
      }`}
    >
      <span
        aria-hidden
        className={`inline-block h-px w-6 ${claro ? "bg-white/50" : "bg-azul"}`}
      />
      {children}
    </span>
  );
}
