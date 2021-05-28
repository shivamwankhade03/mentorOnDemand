import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/interface/user';
import { Mentor } from 'src/app/interface/mentor';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  signUpForm: FormGroup;
  userType: boolean = false;
  userAdded: boolean = false;
  signupErrorMessage: any;
  mentorAdded: boolean = false;
  newUserAdded: boolean = true;

  constructor(private formBuilder: FormBuilder, private _authService: AuthenticationService, private _userService: UserService, public _datepipe: DatePipe) { }

  ngOnInit() {
    let curDate = this._datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.signUpForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*"),
        Validators.maxLength(50)
      ]],
      firstname: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.maxLength(50)
      ]],
      lastname: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.maxLength(50)
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchConfirmPassword.bind(this)
      ]],

      contact: ['', [
        Validators.required, Validators.pattern('^[1-9]{1}[0-9]{9}$')
      ]],
      url: ['', [

      ]],
      registrationDate: [curDate, [
        Validators.required
      ]]
    })
  }

  get username() {
    return this.signUpForm.get('username');
  }
  get firstname() {
    return this.signUpForm.get('firstname');
  }
  get lastname() {
    return this.signUpForm.get('lastname');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get contact() {
    return this.signUpForm.get('contact');
  }
  get url() {
    return this.signUpForm.get('url');
  }

  get registrationDate() {
    return this.signUpForm.get('registrationDate');
  }
  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.signUpForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signUpForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }

  userSignUp() {
    this.userType = !this.userType;
  }

  addUser(signUpForm) {

    if (this.userType) {

      let mentor: Mentor =
      {
        "id": 0,
        "userName": signUpForm.username,
        "firstName": signUpForm.firstname,
        "lastName": signUpForm.lastname,
        "password": signUpForm.password,
        "contactNumber": signUpForm.contact,
        "registrationDate": signUpForm.registrationDate,
        "linkedInUrl": signUpForm.url,
        "active": "true"
      }

      this._userService.mentorSignUp(mentor).subscribe((response) => {
        this.mentorAdded = true;
        this.newUserAdded = false;
        this.signupErrorMessage = null;
      }, (error: HttpErrorResponse) => {
        this.signupErrorMessage = error.message;
        if (error instanceof Error) {
        } else {
        }
      })
    }
    else {
      let user: User =
      {
        "id": 0,
        "userName": signUpForm.username,
        "firstName": signUpForm.firstname,
        "lastName": signUpForm.lastname,
        "password": signUpForm.password,
        "contactNumber": signUpForm.contact,
        "registrationDate": signUpForm.registrationDate,
        "active": "true"
      }

      this._userService.userSignUp(user).subscribe((response) => {
        this.userAdded = true;
        this.signupErrorMessage = null;
        this.newUserAdded = false;
      }, (error: HttpErrorResponse) => {
        this.signupErrorMessage = error.message;
        if (error instanceof Error) {
        } else {
        }
      })

    }
  }
}
