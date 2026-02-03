import { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function SectionWrapper({ id, className = '', children }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
