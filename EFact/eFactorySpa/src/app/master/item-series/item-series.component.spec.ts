import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSeriesComponent } from './item-series.component';

describe('ItemSeriesComponent', () => {
  let component: ItemSeriesComponent;
  let fixture: ComponentFixture<ItemSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
