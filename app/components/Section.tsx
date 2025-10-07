import { ReactNode } from "react";

type Props = {
  title: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
};

export default function Section({ title, intro, children, className }: Props) {
  return (
    <section className={`px-6 sm:px-10 lg:px-14 py-16 ${className ?? ""}`}>
      <div className="max-w-6xl">
        <h2 className="text-3xl font-semibold text-[var(--text-primary)]">{title}</h2>
        {intro ? (
          <p className="mt-3 text-[var(--text-muted)] max-w-3xl">{intro}</p>
        ) : null}
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}


