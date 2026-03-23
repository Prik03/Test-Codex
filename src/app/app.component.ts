import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MenubarModule, ButtonModule, AvatarModule, DrawerModule, TagModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly mobileNavOpen = signal(false);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  readonly menuItems = computed(() => [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Clients', icon: 'pi pi-users', route: '/clients' },
    { label: 'Investments', icon: 'pi pi-chart-line', route: '/investments' },
    { label: 'Documents', icon: 'pi pi-folder-open', route: '/documents' },
    { label: 'Reports', icon: 'pi pi-chart-bar', route: '/reports' }
  ]);

  logout(): void {
    this.authService.logout();
    this.mobileNavOpen.set(false);
    void this.router.navigate(['/login']);
  }
}
