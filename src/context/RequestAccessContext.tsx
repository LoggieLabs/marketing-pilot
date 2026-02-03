import { createContext, useContext, ReactNode } from 'react';
import { useRequestAccessModal } from '../hooks/useRequestAccessModal';
import { RequestAccessModal } from '../components/RequestAccessModal';

interface RequestAccessContextValue {
  openModal: (event?: React.MouseEvent) => void;
  handleRequestAccessClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const RequestAccessContext = createContext<RequestAccessContextValue | null>(null);

export function RequestAccessProvider({ children }: { children: ReactNode }) {
  const { isOpen, openModal, closeModal, handleRequestAccessClick } = useRequestAccessModal();

  return (
    <RequestAccessContext.Provider value={{ openModal, handleRequestAccessClick }}>
      {children}
      <RequestAccessModal isOpen={isOpen} onClose={closeModal} />
    </RequestAccessContext.Provider>
  );
}

export function useRequestAccess() {
  const context = useContext(RequestAccessContext);
  if (!context) {
    throw new Error('useRequestAccess must be used within RequestAccessProvider');
  }
  return context;
}
