import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationSheetComponent } from './validation-sheet.component';

describe('ValidationSheetComponent', () => {
  let component: ValidationSheetComponent;
  let fixture: ComponentFixture<ValidationSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationSheetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
