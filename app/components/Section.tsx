import { ReactNode } from "react";

type Props = {
  title: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
};

export default function Section({ title, intro, children, className }: Props) {
  return (
    <section className={`px-6 sm:px-10 lg:px-14 py-14 ${className ?? ""}`}>
      <h2 className="text-3xl font-semibold">{title}</h2>
      {intro ? (
        <p className="mt-3 max-w-3xl">{intro}</p>
      ) : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}


