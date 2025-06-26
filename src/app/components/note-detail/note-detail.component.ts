import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../../models/note';

@Component({
  standalone: true,
  selector: 'app-note-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  noteId = '';
  title = '';
  content = '';
  tags: string[] = [];
  newTag = '';
  lastSaved = 'Just now';

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
    this.tags = note.tags || [];
  }

  onContentChange(event: Event): void {
    this.content = (event.target as HTMLElement).innerText;
  }

  addTag(): void {
    if (this.newTag.trim() && !this.tags.includes(this.newTag.trim())) {
      this.tags.push(this.newTag.trim());
    }
    this.newTag = '';
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
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
            tags: this.tags,
            updatedAt: new Date()
          }
        : n
    );
    localStorage.setItem('notes', JSON.stringify(updated));
    this.lastSaved = 'Just now';
  }
}
