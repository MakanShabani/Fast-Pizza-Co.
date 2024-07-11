export default function Tag({ children, type = "success" }) {
  const base =
    "rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide";
  const styles = {
    success: base + " bg-green-500 text-green-50",
    danger: base + " bg-red-500 text-red-50",
  };

  return <span className={styles[type]}>{children}</span>;
}
