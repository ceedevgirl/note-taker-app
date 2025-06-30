import { Component, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCardComponent } from '../note-card/note-card.component';
import { Note } from '../../../models/note';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { Router } from '@angular/router';
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
selectedTag = signal<string | null>(null);
  // notes = signal<Note[]>([]);
 viewMode = signal<'grid' | 'list'>('grid');
 tagOptions = ['work', 'personal', 'ideas', 'reminders', 'important'];
selectedTags = signal<string[]>([]);


  toastMessage = signal('');
showToast = signal(false);
toastType = signal<'success' | 'error' | 'info'>('success');


constructor(private router: Router) {}
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

   setView(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }

  // Filter notes based on search term
 filteredNotes = computed(() =>
  this.notes().filter(note =>
    !note.isArchived && (
      note.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      note.content.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(this.searchTerm().toLowerCase()))
    )
  )
);


goToNoteDetails(noteId: string) {
  this.router.navigate(['/note', noteId]);
}

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
     this.toastType.set('success'); // or 'error'
this.toastMessage.set('Note deleted!');
this.showToast.set(true);

  setTimeout(() => this.showToast.set(false), 3000); // Hide after 3s
  }

 archiveNote(noteId: string): void {
  const noteIndex = this.notes().findIndex(n => n.id === noteId);
  if (noteIndex === -1) {
    this.toastMessage.set('Error: Note not found.');
    this.showToast.set(true);
    return;
  }

  const updated = this.notes().map(note =>
    note.id === noteId ? { ...note, isArchived: true, updatedAt: new Date() } : note
  );

  this.notes.set(updated);
  localStorage.setItem('notes', JSON.stringify(updated));

  this.toastType.set('success');
this.toastMessage.set('Note archived!');
this.showToast.set(true);

  setTimeout(() => this.showToast.set(false), 2000);
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

 
toggleTag(tag: string): void {
  const current = this.selectedTags();
  if (current.includes(tag)) {
    this.selectedTags.set(current.filter(t => t !== tag));
  } else {
    this.selectedTags.set([...current, tag]);
  }
}

}
