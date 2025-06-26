import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-avatar-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-auth.component.html',
  styleUrls: ['./avatar-auth.component.scss']
})
export class AvatarAuthComponent {
  authMenuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private eRef: ElementRef
  ) {}

  toggleAuthMenu(): void {
    this.authMenuOpen = !this.authMenuOpen;
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

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.eRef.nativeElement.contains(target)) {
      this.authMenuOpen = false;
    }
  }
}
