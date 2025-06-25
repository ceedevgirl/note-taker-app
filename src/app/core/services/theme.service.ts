import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
private theme: Theme = 'light';
  constructor() {
    const savedTheme = localStorage.getItem('theme') as Theme;
this.setTheme(savedTheme || 'light') ;
   }

setTheme(theme: Theme): void {
  this.theme = theme;
  localStorage.setItem('theme', theme);
  document.body.className = theme;
}

getTheme(): Theme {
  return this.theme;
}

toggleTheme(): void {
  this.setTheme(this.theme === 'light' ? 'dark' : 'light');
}
}
