import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouAreUnauthourizedComponent } from './you-are-unauthourized.component';

describe('YouAreUnauthourizedComponent', () => {
  let component: YouAreUnauthourizedComponent;
  let fixture: ComponentFixture<YouAreUnauthourizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouAreUnauthourizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouAreUnauthourizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
