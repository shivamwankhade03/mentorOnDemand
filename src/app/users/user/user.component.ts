import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  approvedTrainingList: any;
  errormsgProposedTraining: HttpErrorResponse;
  errormsgCompletedTraining: HttpErrorResponse;
  errormsgCurrentTraining: HttpErrorResponse;
  rating: any;

  constructor(private _router: Router, private _userService: UserService, private _auth: AuthenticationService) { }
  propposedTrainingList: any;
  completedTrainingList: any;
  currentTrainingList: any;
  ngOnInit() {
  }


  returnProposedTraining() {
    this._userService.getUserProposedTrainingList(this._auth.username, 'P').subscribe((data) => {
      this.propposedTrainingList = data;
    },
      (error: HttpErrorResponse) => {
        this.errormsgProposedTraining = error;
        if (error instanceof Error) {
        } else {   
        }
      })
    this._userService.getUserProposedTrainingList(this._auth.username, 'A').subscribe((data) => {
      this.approvedTrainingList = data;
    },
      (error: HttpErrorResponse) => {
        if (error instanceof Error) { 
        } else {
        }
      })





  }


  returnCompletedTrainingList() {
    this._userService.getUserCompletedTrainingList(this._auth.username).subscribe((data) => {
      this.completedTrainingList = data;
    },
      (error: HttpErrorResponse) => {
        this.errormsgCompletedTraining = error
        if (error instanceof Error) {
        } else {
        }
      })

  }

  returnCurrentTrainingList() {
    this._userService.getUserCurrentTrainingList(this._auth.username).subscribe((data) => {
      this.currentTrainingList = data;
    },
      (error: HttpErrorResponse) => {
        this.errormsgCurrentTraining = error
        if (error instanceof Error) { 
        } else {
        }
      })

  }
  acceptTraining(mentorUserName, skillName) {
    this._userService.updateTrainingStatus(this._auth.username, mentorUserName, skillName, "F").subscribe((data) => {
      this.returnProposedTraining();
    }, (error: HttpErrorResponse) => {
      if (error instanceof Error) {
      } else {
      }
    })
  }

  cancelTraining(mentorUserName, skillName) {
    this._userService.updateTrainingStatus(this._auth.username, mentorUserName, skillName, "C").subscribe((data) => {
      this.returnProposedTraining();
    }, (error: HttpErrorResponse) => {
      if (error instanceof Error) {
      } else {
      }
    })
  }

  rate(mentorUserName, rating, skillName) {
    
    this._userService.rate(this._auth.username, mentorUserName, skillName, "C", rating).subscribe((data) => { 
      this.rating=data;
    }, (error: HttpErrorResponse) => {
      if (error instanceof Error) {
      } else {
      }
    })
  }

}
