import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mentor } from '../interface/mentor';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient, private _authService: AuthenticationService) { }
  private subject = new Subject<any>();
  skillurl = environment.skillUrl;
  adduserUrl = environment.addUserUrl;
  addmentorUrl = environment.addMentorUrl;
  trainingUrl = environment.trainingUrl;

  MentorUrl = environment.SkillsUrl;

  skillName: string;


  getSubject(): Subject<any> {
    return this.subject;
  }


  getMentorsListBySkills(course) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.get<any>(this.skillurl + "/" + course, { headers })
  }
  userSignUp(userSignUpData: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.post<User>(this.adduserUrl + '/addUser', userSignUpData,{ headers });
  }

  mentorSignUp(mentorSignUpData: Mentor) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.post<Mentor>(this.addmentorUrl + '/addMentor', mentorSignUpData,{ headers });

  }


  getUserProposedTrainingList(userName, status) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.get<any>(this.trainingUrl + '/user' + "/" + userName + "/" + status + "/N",{ headers })
  }

  getUserCompletedTrainingList(userName) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.get<any>(this.trainingUrl + '/user' + "/" + userName + "/F/C",{ headers })
  }

  getUserCurrentTrainingList(userName) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.get<any>(this.trainingUrl + '/user' + "/" + userName + "/F/I",{ headers })
  }


  getMentorPendingRequest(userName) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.get<any>(this.trainingUrl + '/mentor' + "/" + userName + "/P/N",{ headers })

  }


  getMentorCurrentTrainingRequest(userName) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());

    return this._httpClient.get<any>(this.trainingUrl + '/mentor' + "/" + userName + "/F/I",{ headers })

  }

  getMentorCompletedTrainingList(userName) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.get<any>(this.trainingUrl + '/mentor' + "/" + userName + "/F/C",{ headers })
  }

  updateTrainingStatus(userName, mentorName, skill, status) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.put<any>(this.trainingUrl + '/update' + "/" + userName + "/" + mentorName + "/" + skill + "/" + status, null,{ headers });
  }

  proposeTraining(userName, mentorName, skill) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.post<any>(this.trainingUrl + '/user/propose' + "/" + userName + "/" + mentorName + "/" + skill, null,{ headers });

  }

  mentorApproval(userName, mentorName, skill, status) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.put<any>(this.trainingUrl + '/update' + "/" + userName + "/" + mentorName + "/" + skill + "/" + status, null,{ headers });
  }

  addMentorSkills(mentorName, skill, temp) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.put<any>(this.MentorUrl + '/addSkills' + "/" + mentorName + "/" + skill, temp,{ headers });
  }




  showProfile(mentorName) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._httpClient.get<any>(this.MentorUrl + '/profile' + "/" + mentorName,{ headers });
  }

  rate(username,mentorName,skillName,progress,rating){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._authService.getToken());

    return this._httpClient.put<any>(this.trainingUrl + '/user/' + username+"/" + mentorName+"/"+skillName+"/"+progress+"/"+rating,{ headers });
  }
}
