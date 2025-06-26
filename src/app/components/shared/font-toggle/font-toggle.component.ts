import {
  Component,
  HostListener,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-font-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './font-toggle.component.html',
  styleUrls: ['./font-toggle.component.scss']
})
export class FontToggleComponent implements OnInit, OnDestroy {
  isOpen = false;

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    const savedFont = localStorage.getItem('font') || 'sans';
    document.body.setAttribute('data-font', savedFont);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  setFont(font: string): void {
    document.body.setAttribute('data-font', font);
    localStorage.setItem('font', font);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.eRef.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }
}