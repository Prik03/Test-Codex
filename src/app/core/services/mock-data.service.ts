import { Injectable, signal, computed } from '@angular/core';
import { Client, ClientDocument, Investment } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly clientsState = signal<Client[]>([
    {
      id: 1,
      name: 'Avery Capital Partners',
      company: 'Avery Capital',
      email: 'ops@averycapital.com',
      phone: '+1 (415) 555-0102',
      status: 'Active',
      aum: 12000000,
      region: 'North America',
      segment: 'Institutional',
      onboardingDate: '2024-02-14',
      relationshipManager: 'Sophia Turner',
      notes: 'Focus on quarterly performance reviews and alternative assets.'
    },
    {
      id: 2,
      name: 'Northwind Pension Trust',
      company: 'Northwind Trust',
      email: 'manager@northwindtrust.org',
      phone: '+1 (212) 555-0155',
      status: 'Review',
      aum: 8600000,
      region: 'Europe',
      segment: 'Pension',
      onboardingDate: '2023-11-08',
      relationshipManager: 'James Cole',
      notes: 'Pending ESG allocation approval for Q2 portfolio shift.'
    },
    {
      id: 3,
      name: 'BlueHarbor Family Office',
      company: 'BlueHarbor FO',
      email: 'team@blueharborfo.com',
      phone: '+1 (305) 555-0188',
      status: 'Active',
      aum: 15400000,
      region: 'Middle East',
      segment: 'Family Office',
      onboardingDate: '2025-01-20',
      relationshipManager: 'Mia Patel',
      notes: 'Interested in private credit and real asset diversification.'
    }
  ]);

  private readonly investmentsState = signal<Investment[]>([
    { id: 1, clientId: 1, name: 'Global Equity Alpha', type: 'Equity', amount: 3200000, riskLevel: 'Medium', performance: 8.4, inceptionDate: '2024-03-12' },
    { id: 2, clientId: 1, name: 'Infrastructure Yield Fund', type: 'Infrastructure', amount: 1800000, riskLevel: 'Low', performance: 6.1, inceptionDate: '2024-07-01' },
    { id: 3, clientId: 2, name: 'ESG Fixed Income Strategy', type: 'Fixed Income', amount: 2400000, riskLevel: 'Low', performance: 4.7, inceptionDate: '2023-12-15' },
    { id: 4, clientId: 3, name: 'Private Credit Opportunities', type: 'Private Credit', amount: 4100000, riskLevel: 'High', performance: 11.2, inceptionDate: '2025-02-11' }
  ]);

  private readonly documentsState = signal<ClientDocument[]>([
    { id: 1, clientId: 1, name: 'Q1 Performance Pack.pdf', category: 'Report', uploadedAt: '2026-02-10', owner: 'Sophia Turner' },
    { id: 2, clientId: 2, name: 'KYC Refresh Checklist.xlsx', category: 'Compliance', uploadedAt: '2026-01-27', owner: 'James Cole' },
    { id: 3, clientId: null, name: 'Board Summary Deck.pptx', category: 'Board', uploadedAt: '2026-03-18', owner: 'Operations' }
  ]);

  readonly clients = this.clientsState.asReadonly();
  readonly investments = this.investmentsState.asReadonly();
  readonly documents = this.documentsState.asReadonly();

  readonly totalAum = computed(() => this.clientsState().reduce((sum, client) => sum + client.aum, 0));

  addClient(payload: Omit<Client, 'id'>): void {
    this.clientsState.update((clients) => [...clients, { ...payload, id: Date.now() }]);
  }

  updateClient(id: number, payload: Omit<Client, 'id'>): void {
    this.clientsState.update((clients) => clients.map((client) => client.id === id ? { ...payload, id } : client));
  }

  deleteClient(id: number): void {
    this.clientsState.update((clients) => clients.filter((client) => client.id !== id));
    this.investmentsState.update((investments) => investments.filter((investment) => investment.clientId !== id));
    this.documentsState.update((documents) => documents.filter((document) => document.clientId !== id));
  }

  addInvestment(payload: Omit<Investment, 'id'>): void {
    this.investmentsState.update((investments) => [...investments, { ...payload, id: Date.now() }]);
  }

  updateInvestment(id: number, payload: Omit<Investment, 'id'>): void {
    this.investmentsState.update((investments) => investments.map((investment) => investment.id === id ? { ...payload, id } : investment));
  }

  deleteInvestment(id: number): void {
    this.investmentsState.update((investments) => investments.filter((investment) => investment.id !== id));
  }

  addDocument(payload: Omit<ClientDocument, 'id' | 'uploadedAt'>): void {
    this.documentsState.update((documents) => [
      {
        ...payload,
        id: Date.now(),
        uploadedAt: new Date().toISOString().slice(0, 10)
      },
      ...documents
    ]);
  }
}
