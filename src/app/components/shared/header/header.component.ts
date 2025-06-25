import {
  Component,
  HostListener,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeToggleComponent } from '../../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  fontDropdownOpen = false;
  authMenuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private eRef: ElementRef
  ) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('font') || 'sans';
    document.body.setAttribute('data-font', saved);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Dropdown togglers
  toggleFontDropdown(): void {
    this.fontDropdownOpen = !this.fontDropdownOpen;
  }

  toggleAuthMenu(): void {
    this.authMenuOpen = !this.authMenuOpen;
  }

  // Font switcher
  setFont(font: string): void {
    document.body.setAttribute('data-font', font);
    localStorage.setItem('font', font);
    this.fontDropdownOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.authMenuOpen = false;
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.authMenuOpen = false;
    this.router.navigate(['/login']);
  }

  goToSignup(): void {
    this.authMenuOpen = false;
    this.router.navigate(['/signup']);
  }

  // Auto-close both dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!this.eRef.nativeElement.contains(target)) {
      this.fontDropdownOpen = false;
      this.authMenuOpen = false;
    }
  }
}
