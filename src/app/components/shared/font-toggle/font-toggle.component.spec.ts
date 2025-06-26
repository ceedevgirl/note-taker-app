import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontToggleComponent } from './font-toggle.component';

describe('FontToggleComponent', () => {
  let component: FontToggleComponent;
  let fixture: ComponentFixture<FontToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FontToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
