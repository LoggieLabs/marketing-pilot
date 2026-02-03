import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook to manage the Request Access modal state with hash routing.
 * - Opens modal when #request-access hash is present
 * - Sets hash when modal opens, clears on close
 * - Returns focus to triggering element on close
 */
export function useRequestAccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Check hash on mount and listen for hash changes
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#request-access') {
        setIsOpen(true);
      }
    };

    // Check on mount
    checkHash();

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const openModal = useCallback((event?: React.MouseEvent) => {
    // Store the triggering element for focus return
    if (event?.currentTarget instanceof HTMLElement) {
      triggerRef.current = event.currentTarget;
    }

    // Set hash without scrolling
    history.pushState(null, '', '#request-access');
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    // Clear hash without scrolling
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setIsOpen(false);

    // Return focus to trigger element
    if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, []);

  // Handle click on #request-access links
  const handleRequestAccessClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openModal(event);
  }, [openModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    handleRequestAccessClick,
  };
}
