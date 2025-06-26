import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontToggleComponent } from '../font-toggle/font-toggle.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { AvatarAuthComponent } from "../avatar-auth/avatar-auth/avatar-auth.component";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontToggleComponent, ThemeToggleComponent, AvatarAuthComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 
}
