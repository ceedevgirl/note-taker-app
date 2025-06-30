import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../../models/note';

@Component({
  standalone: true,
  selector: 'app-note-edits',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {
  noteId = '';
  title = '';
  content = '';
  lastSaved = 'Just now';

  tagOptions = ['work', 'personal', 'ideas', 'reminders', 'important'];

  //  signals
  tags = signal<string[]>([]);
  showTagDropdown = signal(false);
  tagInput = signal('');

  toastMessage = '';
showingToast = false;

showToast(message: string) {
  this.toastMessage = message;
  this.showingToast = true;

  setTimeout(() => {
    this.showingToast = false;
    this.toastMessage = '';
  }, 2000); // toast visible for 2s
}

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id') || '';
    const notes = JSON.parse(localStorage.getItem('notes') || '[]') as Note[];
    const note = notes.find(n => n.id === this.noteId);
    if (!note) {
      this.router.navigate(['/notes-dashboard']);
      return;
    }

    this.title = note.title;
    this.content = note.content;
    this.tags.set(note.tags || []);
  }

 onContentChange(event: Event): void {
  const target = event.target as HTMLElement;
  this.content = target.innerText.trim(); 
}


  toggleTagDropdown(): void {
    this.showTagDropdown.update(v => !v);
  }

  toggleTag(tag: string): void {
    const currentTags = this.tags();
    if (currentTags.includes(tag)) {
      this.tags.set(currentTags.filter(t => t !== tag));
    } else {
      this.tags.set([...currentTags, tag]);
    }
  }

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

  archiveNote(): void {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]') as Note[];
    const updated = notes.map(n =>
      n.id === this.noteId ? { ...n, isArchived: true, updatedAt: new Date() } : n
    );
    localStorage.setItem('notes', JSON.stringify(updated));
    this.router.navigate(['/notes-dashboard']);
  }

  saveNote(): void {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]') as Note[];
    const updated = notes.map(n =>
      n.id === this.noteId
        ? {
            ...n,
            title: this.title,
            content: this.content,
            tags: this.tags(),
            updatedAt: new Date()
          }
        : n
    );
    
  localStorage.setItem('notes', JSON.stringify(updated));
  this.lastSaved = `Saved at ${new Date().toLocaleTimeString()}`;

  
  this.showToast('Note saved successfully!');

  // ✅ Route to dashboard
  setTimeout(() => {
    this.router.navigate(['/notes-dashboard']);
  }, 1500);
}
}
