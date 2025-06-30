import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../../models/note';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-archived-notes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './archived-notes.component.html',
  styleUrls: ['./archived-notes.component.scss']
})
export class ArchivedNotesComponent implements OnInit {
  allNotes = signal<Note[]>([]);
  searchTerm = signal('');
  showToast = signal(false);
  toastMessage = signal('');
toastType = signal<'success' | 'error'>('success');

  constructor(private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('notes');
    if (stored) {
      try {
        this.allNotes.set(JSON.parse(stored));
      } catch {
        this.allNotes.set([]);
      }
    }
  }
  

  get archivedNotes() {
    return this.allNotes().filter(n => n.isArchived);
  }

  filteredNotes = computed(() =>
    this.archivedNotes.filter(note =>
      note.title.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  goToNoteDetails(noteId: string) {
  this.router.navigate(['/note', noteId]);
}

 unarchiveNote(noteId: string) {
  const index = this.allNotes().findIndex(note => note.id === noteId);
  if (index === -1) {
    this.toastMessage.set('Note not found');
    this.toastType.set('error');
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 2000);
    return;
  }

  const updated = this.allNotes().map(note =>
    note.id === noteId ? { ...note, isArchived: false, updatedAt: new Date() } : note
  );
  this.allNotes.set(updated);
  localStorage.setItem('notes', JSON.stringify(updated));

  this.toastMessage.set('Note unarchived');
  this.toastType.set('success');
  this.showToast.set(true);
  setTimeout(() => this.showToast.set(false), 2000);
}


  getArchivedAgo(date: string | Date): string {
  if (!date) return 'some time ago';

  const now = new Date();
  const updated = new Date(date);
  const diffMs = now.getTime() - updated.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;

  const weeks = Math.floor(diffDays / 7);
  return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
}


  deleteNote(noteId: string) {
  const index = this.allNotes().findIndex(note => note.id === noteId);
  if (index === -1) {
    this.toastMessage.set('Note not found');
    this.toastType.set('error');
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 2000);
    return;
  }

  const updated = this.allNotes().filter(note => note.id !== noteId);
  this.allNotes.set(updated);
  localStorage.setItem('notes', JSON.stringify(updated));

  this.toastMessage.set('Note deleted');
  this.toastType.set('success');
  this.showToast.set(true);
  setTimeout(() => this.showToast.set(false), 2000);
}


  closeToast() {
    this.showToast.set(false);
  }
}
