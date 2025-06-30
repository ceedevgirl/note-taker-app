import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDetailsComponent } from '../note-details/note-details/note-details.component';

describe('NoteDetailComponent', () => {
  let component: NoteDetailsComponent;
  let fixture: ComponentFixture<NoteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
