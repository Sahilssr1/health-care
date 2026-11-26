'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Applies the route marker used by the editorial page treatments. */
export function PageSurface() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.page = pathname;
    return () => {
      if (document.documentElement.dataset.page === pathname) delete document.documentElement.dataset.page;
    };
  }, [pathname]);

  return null;
}
