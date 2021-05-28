import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mentor-info',
  templateUrl: './mentor-info.component.html',
  styleUrls: ['./mentor-info.component.css']
})
export class MentorInfoComponent implements OnInit {

  constructor(private _userService: UserService, private _auth: AuthenticationService, private _router: Router) { }
  @Input() mentorDetails: any;

  mentor: any;
  temp: number;
  isDisabled: boolean = false;
  ngOnInit() {

    this._userService.getSubject().subscribe((data) => {
    })

  }
  viewDetails(id) {
    this.temp = id;
  }
  proposedRequest(mentorName) {
    this._userService.proposeTraining(this._auth.username, mentorName, this._userService.skillName).subscribe((res) => {
      this.isDisabled = true;
    }, (error: HttpErrorResponse) => {
      if (error instanceof Error) {
      } else {
      }
    });
    this._router.navigate[this._auth.redirectUrl]
  }
}
