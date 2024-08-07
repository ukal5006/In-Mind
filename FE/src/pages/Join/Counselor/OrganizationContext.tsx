import React, { createContext, useState, useContext, ReactNode } from 'react';

interface OrganizationContextType {
  organizationName: string;
  orgIdx: number;
  setOrganization: (name: string, idx: number) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [organizationName, setOrganizationName] = useState<string>('');
  const [orgIdx, setOrgIdx] = useState<number>(-1);

  const setOrganization = (name: string, idx: number) => {
    setOrganizationName(name);
    setOrgIdx(idx);
  };

  return (
    <OrganizationContext.Provider value={{ organizationName, orgIdx, setOrganization }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};