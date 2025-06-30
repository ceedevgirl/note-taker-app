import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../../../../models/note';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  
  note = signal<Note | null>(null);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]') as Note[];
    const found = notes.find(n => n.id === id);
    if (!found) {
      this.router.navigate(['/notes-dashboard']);
    } else {
      this.note.set(found);
    }
  }

  goBack(): void {
    this.router.navigate(['/notes-dashboard']);
  }

  deleteNote(): void {
    const confirmDelete = confirm('Are you sure you want to delete this note?');
    if (!confirmDelete || !this.note()) return;

    const notes = JSON.parse(localStorage.getItem('notes') || '[]') as Note[];
    const updated = notes.filter(n => n.id !== this.note()!.id);
    localStorage.setItem('notes', JSON.stringify(updated));
    this.router.navigate(['/notes-dashboard']);
  }

  editNote(): void {
    if (!this.note()) return;
    this.router.navigate(['/notes', this.note()!.id]);
  }
}
