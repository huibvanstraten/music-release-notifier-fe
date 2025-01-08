import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientBgComponent } from './gradient-bg.component';

describe('GradientBgComponent', () => {
  let component: GradientBgComponent;
  let fixture: ComponentFixture<GradientBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientBgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
