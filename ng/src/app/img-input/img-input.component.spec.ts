import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgInputComponent } from './img-input.component';

describe('ImgInputComponent', () => {
  let component: ImgInputComponent;
  let fixture: ComponentFixture<ImgInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
