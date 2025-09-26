import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

export type PersonalInfo = {
  name: string; nationalId: string; dateOfBirth: string; gender: string; address: string; city: string; state: string; country: string; phone: string; email: string;
};

export type FamilyFinancial = {
  maritalStatus: string; dependents: number; employmentStatus: string; monthlyIncome: number; housingStatus: string;
};

export type Situations = {
  financialSituation: string; employmentCircumstances: string; reasonForApplying: string;
};

export type ApplicationData = {
  personal: PersonalInfo;
  family: FamilyFinancial;
  situations: Situations;
};

type FormContextValue = {
  data: ApplicationData;
  update: (partial: Partial<ApplicationData>) => void;
  reset: () => void;
};

const defaultData: ApplicationData = {
  personal: { name: '', nationalId: '', dateOfBirth: '', gender: '', address: '', city: '', state: '', country: '', phone: '', email: '' },
  family: { maritalStatus: '', dependents: 0, employmentStatus: '', monthlyIncome: 0, housingStatus: '' },
  situations: { financialSituation: '', employmentCircumstances: '', reasonForApplying: '' },
};

const STORAGE_KEY = 'ssa_application_data_v1';

const FormContext = createContext<FormContextValue | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ApplicationData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as ApplicationData : defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const value = useMemo<FormContextValue>(() => ({
    data,
    update: (partial) => setData((prev) => ({ ...prev, ...partial })),
    reset: () => setData(defaultData),
  }), [data]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useFormData() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
}



