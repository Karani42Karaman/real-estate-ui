import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWithFilterComponent } from './home-with-filter.component';

describe('HomeWithFilterComponent', () => {
  let component: HomeWithFilterComponent;
  let fixture: ComponentFixture<HomeWithFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWithFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
