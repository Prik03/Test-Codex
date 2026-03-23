import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { MockDataService } from '../../core/services/mock-data.service';
import { Client } from '../../core/models/client.model';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, ReactiveFormsModule, CardModule, TableModule, DialogModule, ButtonModule, InputTextModule, DropdownModule, TagModule, TextareaModule],
  templateUrl: './clients.component.html'
})
export class ClientsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dataService = inject(MockDataService);

  readonly clients = this.dataService.clients;
  readonly selectedClient = signal<Client | null>(null);
  readonly dialogVisible = signal(false);
  readonly profileVisible = signal(false);
  readonly editingClientId = signal<number | null>(null);
  readonly statuses = ['Active', 'Review', 'Inactive'];
  readonly segments = ['Institutional', 'Pension', 'Family Office', 'Private Wealth'];
  readonly regions = ['North America', 'Europe', 'Middle East', 'Asia Pacific'];
  readonly activeClients = computed(() => this.clients().filter((client) => client.status === 'Active').length);

  readonly clientForm = this.fb.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    status: ['Active', Validators.required],
    aum: [0, [Validators.required, Validators.min(1)]],
    region: ['North America', Validators.required],
    segment: ['Institutional', Validators.required],
    onboardingDate: ['', Validators.required],
    relationshipManager: ['', Validators.required],
    notes: ['']
  });

  openCreateDialog(): void {
    this.editingClientId.set(null);
    this.clientForm.reset({ status: 'Active', aum: 0, region: 'North America', segment: 'Institutional', notes: '' });
    this.dialogVisible.set(true);
  }

  openEditDialog(client: Client): void {
    this.editingClientId.set(client.id);
    this.clientForm.patchValue(client);
    this.dialogVisible.set(true);
  }

  saveClient(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const payload = this.clientForm.getRawValue() as Omit<Client, 'id'>;
    const editingId = this.editingClientId();

    if (editingId) {
      this.dataService.updateClient(editingId, payload);
    } else {
      this.dataService.addClient(payload);
    }

    this.dialogVisible.set(false);
  }

  deleteClient(id: number): void {
    this.dataService.deleteClient(id);
    if (this.selectedClient()?.id === id) {
      this.profileVisible.set(false);
      this.selectedClient.set(null);
    }
  }

  viewProfile(client: Client): void {
    this.selectedClient.set(client);
    this.profileVisible.set(true);
  }
}
