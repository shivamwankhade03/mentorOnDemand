import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/rx';
import { UserLoginComponent } from '../user-login/user-login.component';

// class ActivatedRouteStub {
//   private subject = new Subject();

//   push(value) {
//     this.subject.next(value);
//   }

//   get params() {
//     return this.subject.asObservable();
//   }
// }

fdescribe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginComponent,DummyComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports:[ReactiveFormsModule,FormsModule,
        RouterTestingModule.withRoutes(
          [
            {path:'signup',component:DummyComponent}
          ]
        )],
      // providers: [
      //   { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      // ]
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should contains h1 tag',()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Login');

  })
  it('Should contains Button',()=>{
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('button')).toBeTruthy();

    const saveButton=compiled.querySelector('button');
    const nativeButton:HTMLButtonElement=saveButton;
    expect(nativeButton.textContent).toBe('Login')

  })
  it('Should navigate to / on before Button click',()=>{
    const location = TestBed.get(Location);
 
    expect(location.path()).toBe('');
  
 
   })

   it('is form valid when empty',()=>{

    let user_name = component.loginForm.controls["username"];
      user_name.setValue("Karan");
    let user_password = component.loginForm.controls["password"];
    user_password.setValue("Karan97@gmail.com")
    let user_type = component.loginForm.controls["userType"];
    user_type.setValue("mentor")

      expect(component.loginForm.valid).toBeTruthy();
  })

  it('is form invalid when password is wrong',()=>{

    let user_name = component.loginForm.controls["username"];
    user_name.setValue("Karan");
  let user_password = component.loginForm.controls["password"];
  user_password.setValue("karan@gmail.com")
  let Usre_type = component.loginForm.controls["userType"];
  Usre_type.setValue("mentor")

  expect(component.loginForm.valid).toBeFalsy();
  expect(component.loginForm.controls["password"].valid).toBeFalsy();
  });

  it('should redirect the user to `Signup Form` component when Signup is clicked', () => {
    const compiled = fixture.debugElement.nativeElement;
    const location = TestBed.get(Location);
    const signUp=compiled.querySelector('a.signUpClick');
    const nativeAnchor:HTMLAnchorElement=signUp;
    nativeAnchor.click();
    fixture.detectChanges();

    fixture.whenStable().then(()=>{
      expect(location.path()).toBe('/signup');
    });
  });

});
@Component({template:''})
class DummyComponent{}
