import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {
  mentorList: any;
  constructor(private _userService: UserService) { }


  ngOnInit() {

    this._userService.getSubject().subscribe((data) => {
      this.mentorList = data;
    })

  }
}