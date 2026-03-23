export interface Investment {
  id: number;
  clientId: number;
  name: string;
  type: string;
  amount: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  performance: number;
  inceptionDate: string;
}

export interface ClientDocument {
  id: number;
  clientId: number | null;
  name: string;
  category: string;
  uploadedAt: string;
  owner: string;
}

export interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Active' | 'Review' | 'Inactive';
  aum: number;
  region: string;
  segment: string;
  onboardingDate: string;
  relationshipManager: string;
  notes: string;
}
