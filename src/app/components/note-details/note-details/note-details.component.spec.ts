import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteDetailsComponent } from './note-details.component';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NoteDetailsComponent', () => {
  let component: NoteDetailsComponent;
  let fixture: ComponentFixture<NoteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteDetailsComponent], // standalone component
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              paramMap: {
                get: (key: string) => '123'
              }
            }
          }
        },
        provideRouter([]) // ✅ Modern router testing support
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
