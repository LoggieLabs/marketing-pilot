import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  /** Hide the hairline joint at the top. Use on the section directly after the hero. */
  noSeparator?: boolean;
  children: ReactNode;
}

/**
 * The page's spacing idiom, encoded once instead of re-inlined fourteen times:
 * py-20 md:py-28, a max-w-7xl container, and a 16px minimum side gutter that
 * holds at 400px.
 *
 * The hairline joint at the top is the connective tissue between sections —
 * the best small detail carried over from the previous site.
 */
export function SectionWrapper({ id, className = '', noSeparator = false, children }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}>
      {noSeparator ? null : (
        <div className="section-separator absolute top-0 left-0 right-0" aria-hidden="true" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
