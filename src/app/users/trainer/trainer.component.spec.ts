import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerComponent } from './trainer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('TrainerComponent', () => {
  let component: TrainerComponent;
  let fixture: ComponentFixture<TrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      imports:[ReactiveFormsModule,FormsModule,HttpClientModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
