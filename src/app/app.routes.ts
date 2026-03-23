import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClientsComponent } from './features/clients/clients.component';
import { InvestmentsComponent } from './features/investments/investments.component';
import { DocumentsComponent } from './features/documents/documents.component';
import { ReportsComponent } from './features/reports/reports.component';

export const appRoutes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'investments', component: InvestmentsComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];
