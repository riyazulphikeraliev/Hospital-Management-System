import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContanctUsComponent } from './contanct-us.component';

describe('ContanctUsComponent', () => {
  let component: ContanctUsComponent;
  let fixture: ComponentFixture<ContanctUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContanctUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContanctUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
