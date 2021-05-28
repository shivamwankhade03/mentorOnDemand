import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  course: string;

  constructor(private _userService: UserService, private _route: Router) { }
  mentorList: any;
  ngOnInit() {
  }

  searchCourse(skill) {
    this._userService.getMentorsListBySkills(skill).subscribe((response) => {
      this.mentorList = response;
      this._userService.skillName = this.mentorList.name;
      this._userService.getSubject().next(this.mentorList);
    }, (error: HttpErrorResponse) => {
      if (error instanceof Error) {
      } else {
      }
    }
    );
  }
}
