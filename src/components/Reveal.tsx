import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay,
  as: As = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: 1 | 2 | 3 | 4;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = `reveal ${delay ? `reveal-delay-${delay}` : ""} ${className}`.trim();
  // @ts-expect-error generic ref
  return <As ref={ref} className={cls}>{children}</As>;
}
