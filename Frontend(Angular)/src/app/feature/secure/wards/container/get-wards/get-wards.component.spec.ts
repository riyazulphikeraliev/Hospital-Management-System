import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWardsComponent } from './get-wards.component';

describe('GetWardsComponent', () => {
  let component: GetWardsComponent;
  let fixture: ComponentFixture<GetWardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetWardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetWardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
