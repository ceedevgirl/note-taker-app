import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Note } from '../../../models/note'; 

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  @Input() note?: Note;
  @Input() isNew = false;

  @Output() onCreate = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onArchive = new EventEmitter<string>();

  constructor(private router: Router) {}

  get lastEdited(): string {
    if (!this.note?.updatedAt) return 'No updates';
    const diff = Date.now() - new Date(this.note.updatedAt).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    return days > 0 ? `${days} day(s) ago` : `${hours} hour(s) ago`;
  }

  createNote(): void {
    // Optionally emit event if needed
    this.onCreate.emit();
    // Navigate to create-note page
    this.router.navigate(['/create-note']);
  }

  deleteNote(): void {
    if (this.note) {
      this.onDelete.emit(this.note.id);
    }
  }

  archiveNote(): void {
    if (this.note) {
      this.onArchive.emit(this.note.id);
    }
  }
}
