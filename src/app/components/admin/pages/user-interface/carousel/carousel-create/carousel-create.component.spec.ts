import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCreateComponent } from './carousel-create.component';

describe('CarouselCreateComponent', () => {
  let component: CarouselCreateComponent;
  let fixture: ComponentFixture<CarouselCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
