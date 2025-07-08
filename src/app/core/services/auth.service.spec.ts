import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    // Create a spy object for localStorage
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem']);
    
    // Replace the global localStorage with our spy
    Object.defineProperty(window, 'localStorage', { value: localStorageSpy });

    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    // Clear all spy calls after each test
    localStorageSpy.getItem.calls.reset();
    localStorageSpy.setItem.calls.reset();
    localStorageSpy.removeItem.calls.reset();
  });

  // Service should be created and initialize default user
  it('should be created and initialize default user when no users exist', () => {
    // Arrange
    localStorageSpy.getItem.and.returnValue(null);

    
    const newService = TestBed.inject(AuthService);

    expect(newService).toBeTruthy();
    expect(localStorageSpy.setItem).toHaveBeenCalledWith(
      'noted-users',
      JSON.stringify([{ email: 'test@example.com', password: 'password123' }])
    );
  });

  // Login should succeed with valid credentials
  it('should login successfully with valid credentials', () => {
    
    const users = [
      { email: 'test@example.com', password: 'password123' },
      { email: 'user@test.com', password: 'mypassword' }
    ];
    localStorageSpy.getItem.and.returnValue(JSON.stringify(users));

    
    const result = service.login('test@example.com', 'password123');

    
    expect(result).toBe(true);
    expect(localStorageSpy.setItem).toHaveBeenCalledWith(
      'noted-current-user',
      JSON.stringify({ email: 'test@example.com', password: 'password123' })
    );
  });

  //  Login should fail with invalid credentials
  it('should fail login with invalid credentials', () => {
    
    const users = [{ email: 'test@example.com', password: 'password123' }];
    localStorageSpy.getItem.and.returnValue(JSON.stringify(users));

    const result = service.login('test@example.com', 'wrongpassword');

    expect(result).toBe(false);
    expect(localStorageSpy.setItem).not.toHaveBeenCalledWith(
      'noted-current-user',
      jasmine.any(String)
    );
  });

  //  Login should handle email case sensitivity and whitespace
  it('should handle email case sensitivity and whitespace during login', () => {
    // Arrange
    const users = [{ email: 'test@example.com', password: 'password123' }];
    localStorageSpy.getItem.and.returnValue(JSON.stringify(users));

    
    const result = service.login('  TEST@EXAMPLE.COM  ', 'password123');

    expect(result).toBe(true);
    expect(localStorageSpy.setItem).toHaveBeenCalledWith(
      'noted-current-user',
      JSON.stringify({ email: 'test@example.com', password: 'password123' })
    );
  });

  // Signup should succeed with new email
  it('should signup successfully with new email', () => {
    // Arrange
    const existingUsers = [{ email: 'existing@example.com', password: 'pass123' }];
    localStorageSpy.getItem.and.returnValue(JSON.stringify(existingUsers));
    const result = service.signup('newuser@example.com', 'newpassword');

    expect(result).toBe(true);
    expect(localStorageSpy.setItem).toHaveBeenCalledWith(
      'noted-users',
      JSON.stringify([
        { email: 'existing@example.com', password: 'pass123' },
        { email: 'newuser@example.com', password: 'newpassword' }
      ])
    );
    expect(localStorageSpy.setItem).toHaveBeenCalledWith(
      'noted-current-user',
      JSON.stringify({ email: 'newuser@example.com', password: 'newpassword' })
    );
  });

  //  Signup should handle email normalization
  it('should normalize email during signup', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify([]));
    const result = service.signup('  NEW@EXAMPLE.COM  ', 'password');
    expect(result).toBe(true);
    expect(localStorageSpy.setItem).toHaveBeenCalledWith(
      'noted-users',
      JSON.stringify([{ email: 'new@example.com', password: 'password' }])
    );
    expect(localStorageSpy.setItem).toHaveBeenCalledWith(
      'noted-current-user',
      JSON.stringify({ email: 'new@example.com', password: 'password' })
    );
  });

  // Logout should remove current user from localStorage
  it('should logout and remove current user from localStorage', () => {
    // Act
    service.logout();
    expect(localStorageSpy.removeItem).toHaveBeenCalledWith('noted-current-user');
  });

  //isLoggedIn should return correct status
  it('should return correct login status', () => {
    // Test when logged in
    localStorageSpy.getItem.and.returnValue('{"email":"test@example.com","password":"pass"}');
    expect(service.isLoggedIn()).toBe(true);

    // Test when not logged in
    localStorageSpy.getItem.and.returnValue(null);
    expect(service.isLoggedIn()).toBe(false);

    // Test with empty string
    localStorageSpy.getItem.and.returnValue('');
    expect(service.isLoggedIn()).toBe(false);
  });

  // getCurrentUser should return correct user data
  it('should return current user data or null', () => {
    // Test when user is logged in
    const userData = { email: 'test@example.com', password: 'password123' };
    localStorageSpy.getItem.and.returnValue(JSON.stringify(userData));
    
    const currentUser = service.getCurrentUser();
    expect(currentUser).toEqual(userData);

    // Test when no user is logged in
    localStorageSpy.getItem.and.returnValue(null);
    const noUser = service.getCurrentUser();
    expect(noUser).toBeNull();

    // Test with invalid JSON
    localStorageSpy.getItem.and.returnValue('invalid-json');
    expect(() => service.getCurrentUser()).toThrow();
  });
});