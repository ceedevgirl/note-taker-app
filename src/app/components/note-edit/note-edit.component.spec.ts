import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteEditComponent } from './note-edit.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('NoteEditComponent', () => {
  let component: NoteEditComponent;
  let fixture: ComponentFixture<NoteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteEditComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'mock-note-id'
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
