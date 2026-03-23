import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, PercentPipe, CardModule, ChartModule],
  templateUrl: './reports.component.html'
})
export class ReportsComponent {
  readonly revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'AUM Growth', data: [28, 32, 35, 39, 43, 48], borderColor: '#0f766e', backgroundColor: 'rgba(15,118,110,0.2)', fill: true, tension: 0.35 },
      { label: 'Net Flows', data: [8, 11, 12, 10, 16, 17], borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.2)', fill: true, tension: 0.35 }
    ]
  };

  readonly exposureData = {
    labels: ['North America', 'Europe', 'Middle East', 'Asia Pacific'],
    datasets: [{ label: 'Regional Exposure', data: [46, 22, 18, 14], backgroundColor: ['#0f766e', '#3b82f6', '#8b5cf6', '#f59e0b'] }]
  };
}
