import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { UserService } from '../services/user.service';

fdescribe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let MockUserService:UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      imports:[HttpClientModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    
    MockUserService=new UserService(null,null);
    component=new SearchComponent(MockUserService,null)
    

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set mentors property with the mentorlist returned from the server', () => {
      // Arrange - Setup
      const mentorList1:any= [
        {
          "id": "1",
          "username": "Shivam",
          "password": "$2a$10$R/lZJuT9skteNmAku9Y7aeutxbOKstD5xE5bHOf74M2PHZipyt3yK",
          "first_name": "Shivam",
          "last_name": "Wankhade",
          "contact_number": "0123456789",
          "registration_date_time": "2019-11-10",
          "linkedin_url": "shivam.wankhade",
          "active": "1",
          "mentorSkills": [
            {
              "id": "1",
              "ratings": "4.5",
              "yearsOfExperience": "10.0",
              "trainings_delivered": "3",
              "fk_skill_id": "1",
              "fk_mentor_user_id": "1"
            } 
          ]
        }
      ]
      const mentorList2:any= [
        {
          "id": "1",
          "username": "Shivam",
          "password": "$2a$10$R/lZJuT9skteNmAku9Y7aeutxbOKstD5xE5bHOf74M2PHZipyt3yK",
          "first_name": "Shivam",
          "last_name": "Wankhade",
          "contact_number": "0123456789",
          "registration_date_time": "2019-11-10",
          "linkedin_url": "shivam.wankhade",
          "active": "1",
          "mentorSkills": [
            {
              "id": "1",
              "ratings": "4.5",
              "yearsOfExperience": "10.0",
              "trainings_delivered": "3",
              "fk_skill_id": "1",
              "fk_mentor_user_id": "1"
            } 
          ]
        }
      ]

      spyOn(MockUserService, 'getMentorsListBySkills').withArgs('java').and.callFake(() => {
    
        return Observable.from([mentorList1])
      });
  
  
      // Act - Make the actual call
      component.searchCourse('java');
  
      // Assert - Check and report whether the test is pass or fail
      expect(component.mentorList).toEqual(mentorList2);
    });

});

