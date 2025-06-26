import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarAuthComponent } from './avatar-auth.component';

describe('AvatarAuthComponent', () => {
  let component: AvatarAuthComponent;
  let fixture: ComponentFixture<AvatarAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
