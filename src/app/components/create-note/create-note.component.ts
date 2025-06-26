import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../../models/note';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {
  title = signal('');
  content = signal('');
  tagInput = signal('');
  tags = signal<string[]>([]);
  saving = signal(false);
  showToast = signal(false);
  error = signal('');

  @Output() cancel = new EventEmitter<void>();
  @Output() noteCreated = new EventEmitter<Note>();

  constructor(private router: Router) {}

  addTag(): void {
    const tag = this.tagInput().trim();
    if (tag && !this.tags().includes(tag)) {
      this.tags.update(t => [...t, tag]);
    }
    this.tagInput.set('');
  }

  removeTag(tag: string): void {
    this.tags.update(t => t.filter(x => x !== tag));
  }

  closeToast(): void {
    this.showToast.set(false);
    this.error.set('');
  }

  saveNote(): void {
    const title = this.title().trim();
    const content = this.content().trim();

    if (!title || !content) {
      this.error.set('Title and content are required.');
      this.showToast.set(true);
      return;
    }

    this.saving.set(true);

    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      tags: this.tags(),
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      existingNotes.unshift(newNote);
      localStorage.setItem('notes', JSON.stringify(existingNotes));

      this.noteCreated.emit(newNote);

      this.error.set('');
      this.showToast.set(true);

      // Reset form
      this.title.set('');
      this.content.set('');
      this.tags.set([]);
      this.tagInput.set('');

      setTimeout(() => {
        this.saving.set(false);
        this.router.navigate(['/notes-dashboard']);
      }, 1200);

    } catch (err) {
      this.error.set('Failed to save note. Please try again.');
      this.saving.set(false);
      this.showToast.set(true);
    }
  }

  cancelCreate(): void {
    this.router.navigate(['/notes-dashboard']);
  }
}
