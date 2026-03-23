import { Component, computed, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, DatePipe, ReactiveFormsModule, CardModule, TableModule, DropdownModule, ButtonModule, FileUploadModule, InputTextModule],
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dataService = inject(MockDataService);

  readonly documents = this.dataService.documents;
  readonly clientOptions = computed(() => [
    { label: 'General', value: null },
    ...this.dataService.clients().map((client) => ({ label: client.name, value: client.id }))
  ]);
  readonly categories = ['Report', 'Compliance', 'Board', 'Subscription'];

  readonly documentForm = this.fb.group({
    name: ['', Validators.required],
    category: ['Report', Validators.required],
    clientId: [null as number | null],
    owner: ['Operations', Validators.required]
  });

  uploadMock(): void {
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    }

    this.dataService.addDocument(this.documentForm.getRawValue() as { name: string; category: string; clientId: number | null; owner: string; });
    this.documentForm.reset({ category: 'Report', clientId: null, owner: 'Operations' });
  }

  clientLabel(clientId: number | null): string {
    if (!clientId) {
      return 'General';
    }
    return this.clientOptions().find((option) => option.value === clientId)?.label ?? 'Unknown client';
  }
}
