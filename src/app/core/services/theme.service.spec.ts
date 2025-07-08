import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  let fakeStore: Record<string, string>;

  beforeEach(() => {
    fakeStore = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => fakeStore[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      fakeStore[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete fakeStore[key];
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      for (const key in fakeStore) delete fakeStore[key];
    });

    document.body.className = ''; // Reset DOM
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should set theme and update document body class', () => {
    service.setTheme('dark');
    expect(service.getTheme()).toBe('dark');
    expect(document.body.className).toBe('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should toggle theme from light to dark', () => {
    service.setTheme('light');
    service.toggleTheme();
    expect(service.getTheme()).toBe('dark');
    expect(document.body.className).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    service.setTheme('dark');
    service.toggleTheme();
    expect(service.getTheme()).toBe('light');
    expect(document.body.className).toBe('light');
  });
});
