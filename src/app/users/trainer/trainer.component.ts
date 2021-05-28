import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  mentorPendingRequest: any;
  editForm: FormGroup
  changeType: boolean;
  isType: boolean = true;
  skills = ["Select course..", "HTML", "Spring", "Java", "Angular", "CSS", "C", "C++", "Python", "Machine Learning"];
  currentTrainingList: any;
  completedTrainingList: any;
  mentor: any;
  errormsggetMentorPendingRequest: HttpErrorResponse;
  errorgetPendingrequest: HttpErrorResponse;
  errormsgCurrentTraining: HttpErrorResponse;
  errormsgCompletedTraining: HttpErrorResponse;
  saveEditError: HttpErrorResponse;
  saveEditboolean: boolean = false
  constructor(private formBuild: FormBuilder, private _userService: UserService, private _auth: AuthenticationService, private _router: Router) { }

  ngOnInit() {
    this.fetchData();
    this.editForm = this.formBuild.group({
      yearsOfExperience: ['', [
        Validators.pattern('[1-9][0-9]$')
      ]],
      skillType: [this.skills[0], [
        Validators.required
      ]],
      fees: ['', [
        Validators.pattern('[1-9][0-9]*$')
      ]],
    })
  }


  fetchData() {
    this._userService.getMentorPendingRequest(this._auth.username).subscribe((response) => {

      this.mentorPendingRequest = response;

    }, (error: HttpErrorResponse) => {
      this.errormsggetMentorPendingRequest = error

      if (error instanceof Error) {

      } else {

      }
    })
  }

  get yearsOfExperience() {
    return this.editForm.get('yearsOfExperience');
  }
  get skillType() {
    return this.editForm.get('skillType');
  }
  get fees() {
    return this.editForm.get('fees');
  }

  changeskillType($event) {
    if ($event.target.selectedIndex != 0) {
      this.changeType = false;
      this.isType = false;
    }
    else {
      this.changeType = true;
      this.isType = true;
    }
  }
  saveEditeDetails(temp) {
    this.saveEditError = null;
    this.saveEditboolean = false
    this._userService.addMentorSkills(this._auth.username, temp.skillType, temp).subscribe((res) => {
      this.saveEditboolean = true
    }, (error: HttpErrorResponse) => {

      this.saveEditError = error;
      if (error instanceof Error) {
      } else {
      }
    });
  }

  getPendingrequest() {
    this._userService.getMentorPendingRequest(this._auth.username).subscribe((response) => {
      this.mentorPendingRequest = response;
    }, (error: HttpErrorResponse) => {
      this.errorgetPendingrequest = error
      if (error instanceof Error) {
      } else {
      }
    })
  }

  returnCurrentTrainingList() {
    this._userService.getMentorCurrentTrainingRequest(this._auth.username).subscribe((data) => {
      this.currentTrainingList = data;
    },
      (error: HttpErrorResponse) => {
        this.errormsgCurrentTraining = error;
        if (error instanceof Error) {
        } else {
        }
      })
  }

  returnCompletedTrainingList() {
    this._userService.getMentorCompletedTrainingList(this._auth.username).subscribe((data) => {
      this.completedTrainingList = data;
    },
      (error: HttpErrorResponse) => {
        this.errormsgCompletedTraining = error;
        if (error instanceof Error) {
        } else {
        }
      })
  }

  acceptProposal(userName, skillName) {
    this._userService.mentorApproval(userName, this._auth.username, skillName, "A").subscribe((res) => {
      this.getPendingrequest()
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      if (error instanceof Error) {
      } else {
      }
    })
  }

  rejectProposal(userName, skillName) {
    this._userService.mentorApproval(userName, this._auth.username, skillName, "R").subscribe((res) => {
      this.getPendingrequest()
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      if (error instanceof Error) {
      } else {
      }
    })
  }

  showProfile() {
    this._userService.showProfile(this._auth.username).subscribe((data) => {
      this.mentor = data;
    },
      (error: HttpErrorResponse) => {
        if (error instanceof Error) {
        } else {
        }
      }
    )
  }
}