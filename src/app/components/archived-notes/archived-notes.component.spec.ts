import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivedNotesComponent } from './archived-notes.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ArchivedNotesComponent', () => {
  let component: ArchivedNotesComponent;
  let fixture: ComponentFixture<ArchivedNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedNotesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
