import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MockDataService } from '../../core/services/mock-data.service';
import { Investment } from '../../core/models/client.model';

type TagSeverity = 'success' | 'info' | 'warn' | 'danger';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, PercentPipe, ReactiveFormsModule, CardModule, TableModule, DialogModule, ButtonModule, InputTextModule, SelectModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './investments.component.html'
})
export class InvestmentsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dataService = inject(MockDataService);

  readonly clients = this.dataService.clients;
  readonly investments = this.dataService.investments;
  readonly dialogVisible = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly riskOptions = ['Low', 'Medium', 'High'];
  readonly typeOptions = ['Equity', 'Fixed Income', 'Infrastructure', 'Private Credit', 'Real Estate'];
  readonly totalInvestmentValue = computed(() => this.investments().reduce((sum, item) => sum + item.amount, 0));
  readonly clientOptions = computed(() => this.clients().map((client) => ({ label: client.name, value: client.id })));

  readonly investmentForm = this.fb.group({
    clientId: [1, Validators.required],
    name: ['', Validators.required],
    type: ['Equity', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    riskLevel: ['Medium', Validators.required],
    performance: [0, Validators.required],
    inceptionDate: ['', Validators.required]
  });

  openDialog(investment?: Investment): void {
    if (investment) {
      this.editingId.set(investment.id);
      this.investmentForm.patchValue(investment);
    } else {
      this.editingId.set(null);
      this.investmentForm.reset({ clientId: this.clients()[0]?.id ?? 1, type: 'Equity', riskLevel: 'Medium', amount: 0, performance: 0 });
    }
    this.dialogVisible.set(true);
  }

  save(): void {
    if (this.investmentForm.invalid) {
      this.investmentForm.markAllAsTouched();
      return;
    }

    const payload = this.investmentForm.getRawValue() as Omit<Investment, 'id'>;
    const editingId = this.editingId();

    if (editingId) {
      this.dataService.updateInvestment(editingId, payload);
    } else {
      this.dataService.addInvestment(payload);
    }

    this.dialogVisible.set(false);
  }

  deleteInvestment(id: number): void {
    this.dataService.deleteInvestment(id);
  }

  clientName(clientId: number): string {
    return this.clients().find((client) => client.id === clientId)?.name ?? 'Unknown client';
  }

  riskSeverity(riskLevel: string): TagSeverity {
    switch (riskLevel) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warn';
      default:
        return 'danger';
    }
  }
}
