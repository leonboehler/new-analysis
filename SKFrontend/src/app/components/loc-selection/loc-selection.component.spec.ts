import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocSelectionComponent } from './loc-selection.component';

describe('LocSelectionComponent', () => {
  let component: LocSelectionComponent;
  let fixture: ComponentFixture<LocSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
