import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  notificationsPanelOpen: boolean;
  setNotificationsPanelOpen: (v: boolean) => void;
  selectedStore: string;
  setSelectedStore: (v: string) => void;
  dateRange: string;
  setDateRange: (v: string) => void;
  theme: 'dark' | 'light';
  setTheme: (v: 'dark' | 'light') => void;
  isTransitioning: boolean;
  setIsTransitioning: (v: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('All Stores');
  const [dateRange, setDateRange] = useState('Today');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <AppContext.Provider value={{
      sidebarCollapsed, setSidebarCollapsed,
      notificationsPanelOpen, setNotificationsPanelOpen,
      selectedStore, setSelectedStore,
      dateRange, setDateRange,
      theme, setTheme,
      isTransitioning, setIsTransitioning,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
