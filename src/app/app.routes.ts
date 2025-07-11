import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        m => m.LoginComponent
      )
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/auth/signup/signup.component').then(
        m => m.SignupComponent
      )
  },
  {
    path: 'notes-dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/notes-dashboard/notes-dashboard.component').then(
        m => m.NotesDashboardComponent
      )
  },
  {
    path: 'archived-notes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/archived-notes/archived-notes.component').then(
        m => m.ArchivedNotesComponent
      )
  },
  {
  path: 'notes/:id',
  canActivate: [authGuard],
  loadComponent: () =>
  import('./components/note-edit/note-edit.component').then(m => m.NoteEditComponent)
},
{
  path: 'note/:id',
  canActivate: [authGuard],
  loadComponent: () => 
    import('./components/note-details/note-details/note-details.component').then(m => m.NoteDetailsComponent)
},
{
    path: 'create-note',
    canActivate: [authGuard], 
    loadComponent: () =>
      import('./components/create-note/create-note.component').then(
        m => m.CreateNoteComponent
      )
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
