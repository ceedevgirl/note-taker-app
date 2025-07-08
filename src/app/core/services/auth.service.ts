import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'noted-users';
  private currentUserKey = 'noted-current-user';

  constructor() {
    this.initializeDefaultUser();
  }

 
   //Attempt login with provided credentials
  login(email: string, password: string): boolean {
    const trimmedEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find(
      u => u.email === trimmedEmail && u.password === password
    );

    if (user) {
      this.setCurrentUser(user);
      return true;
    }

    return false;
  }

 
   // Register a new user
  signup(email: string, password: string): boolean {
    const trimmedEmail = email.trim().toLowerCase();
    const users = this.getUsers();

    const exists = users.some(u => u.email === trimmedEmail);
    if (exists) return false;

    const newUser: User = { email: trimmedEmail, password };
    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);

    return true;
  }

  
   // Log the user out
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  
   // Returns true if a user is currently logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.currentUserKey);
  }

  
   // Get currently logged in user, or null if not logged in
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  //  Private Helpers 
  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.localStorageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  
   // Add a default test user if none exists (optional)
   
  private initializeDefaultUser(): void {
    const users = this.getUsers();
    if (users.length === 0) {
      const defaultUser: User = {
        email: 'test@example.com',
        password: 'password123'
      };
      this.saveUsers([defaultUser]);
    }
  }
}
