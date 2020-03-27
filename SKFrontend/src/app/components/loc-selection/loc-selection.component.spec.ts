import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LocSelectionComponent } from './loc-selection.component';

describe('LocSelectionComponent', () => {
  let component: LocSelectionComponent;
  let fixture: ComponentFixture<LocSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocSelectionComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocSelectionComponent);
    component = fixture.componentInstance;
    component.assignedIds = []; // Initialisation neccessary for @Input attributes
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
