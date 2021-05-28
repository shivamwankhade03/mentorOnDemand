import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup
  changeType: boolean;
  isType: boolean = true;
  cate = ["Login as..", "User", "Mentor"];

  constructor(private formBuild: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuild.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      userType: [this.cate[0], [
        Validators.required
      ]]
    })
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  toSignup() {
    this.router.navigate(['signup'])
  }
  get userType() {
    return this.loginForm.get('userType');
  }

  changeUserType($event) {
    if ($event.target.selectedIndex != 0) {
      this.changeType = false;
      this.isType = false;
    }
    else {
      this.changeType = true;
      this.isType = true;
    }
  }
}

