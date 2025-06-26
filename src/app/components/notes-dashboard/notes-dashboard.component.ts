import { Component, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCardComponent } from '../note-card/note-card.component';
import { Note } from '../../../models/note';
import { CreateNoteComponent } from '../create-note/create-note.component';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [CommonModule, NoteCardComponent, CreateNoteComponent],
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.scss']
})
export class NotesDashboardComponent implements OnInit {
  searchTerm = signal('');
  showTagsFilter = signal(false);
  showCreateForm = signal(false);
  notes = signal<Note[]>([]);

  toastMessage = signal('');
showToast = signal(false);

  ngOnInit(): void {
    // Load notes from localStorage
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        this.notes.set(JSON.parse(savedNotes));
      } catch {
        this.notes.set([]);
      }
    }
  }

  // Filter notes based on search term
  filteredNotes = computed(() =>
    this.notes().filter(note =>
      note.title.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  toggleTagsFilter(): void {
    this.showTagsFilter.update(value => !value);
  }

  createNote(): void {
    this.showCreateForm.set(true);
  }

  deleteNote(noteId: string): void {
    this.notes.update(notes => {
      const updated = notes.filter(n => n.id !== noteId);
      localStorage.setItem('notes', JSON.stringify(updated));
      return updated;
    });
     this.toastMessage.set('Note deleted!');
  this.showToast.set(true);

  setTimeout(() => this.showToast.set(false), 3000); // Hide after 3s
  }

  archiveNote(noteId: string): void {
  this.notes.update(notes => {
    const updated = notes.map(n =>
      n.id === noteId ? { ...n, isArchived: true } : n
    );
    localStorage.setItem('notes', JSON.stringify(updated));
    return updated;
  });

  this.toastMessage.set('Note archived!');
  this.showToast.set(true);

  setTimeout(() => this.showToast.set(false), 3000); // Hide after 3s
}


  handleNoteCreated(note: Note): void {
    this.notes.update(n => {
      const updated = [note, ...n];
      localStorage.setItem('notes', JSON.stringify(updated));
      return updated;
    });
    this.showCreateForm.set(false);
  }

  handleCancelCreate(): void {
    this.showCreateForm.set(false);
  }
}
