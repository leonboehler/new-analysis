import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditingUserComponent } from './admin-editing-user.component';

describe('AdminEditingUserComponent', () => {
  let component: AdminEditingUserComponent;
  let fixture: ComponentFixture<AdminEditingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditingUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
