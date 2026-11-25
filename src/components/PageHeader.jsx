// Plain editorial page title (eyebrow + serif heading) used on inner pages.
export default function PageHeader({ eyebrow, title, children }) {
  return (
    <div className="container-page pb-2 pt-12 sm:pt-16">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-3 max-w-3xl text-[38px] leading-[1.05] sm:text-6xl">{title}</h1>
      {children && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600 sm:text-base">{children}</p>}
    </div>
  );
}
