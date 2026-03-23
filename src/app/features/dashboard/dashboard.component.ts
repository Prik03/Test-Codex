import { Component, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MockDataService } from '../../core/services/mock-data.service';

type TagSeverity = 'success' | 'info' | 'warn' | 'danger';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, PercentPipe, CardModule, TableModule, TagModule, ButtonModule, ChartModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private readonly dataService = inject(MockDataService);

  readonly clients = this.dataService.clients;
  readonly investments = this.dataService.investments;
  readonly documents = this.dataService.documents;
  readonly totalAum = this.dataService.totalAum;
  readonly averagePerformance = computed(() => {
    const investments = this.investments();
    return investments.length ? investments.reduce((sum, item) => sum + item.performance, 0) / investments.length / 100 : 0;
  });

  readonly allocationData = {
    labels: ['Equity', 'Fixed Income', 'Alternatives', 'Infrastructure'],
    datasets: [{ data: [42, 24, 19, 15], backgroundColor: ['#0f766e', '#2563eb', '#7c3aed', '#f59e0b'] }]
  };

  clientStatusSeverity(status: string): TagSeverity {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Review':
        return 'warn';
      default:
        return 'danger';
    }
  }
}
