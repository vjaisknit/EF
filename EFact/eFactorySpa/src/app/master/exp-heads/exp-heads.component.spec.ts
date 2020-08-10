import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpHeadsComponent } from './exp-heads.component';

describe('ExpHeadsComponent', () => {
  let component: ExpHeadsComponent;
  let fixture: ComponentFixture<ExpHeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpHeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpHeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
