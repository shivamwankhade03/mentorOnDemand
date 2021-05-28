import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router, NavigationEnd, NavigationError, NavigationCancel, NavigationStart, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLoadingIndicator: boolean = true

  ngOnInit(): void {
    this.router.navigate(['search'])
  }
  constructor(private authService: AuthenticationService, private router: Router) {

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
      }
    });
  }
  title = 'mentor-on-demand';


  loggedIn() {
    if (this.authService.isLoggedIn == true)
      return true;
    else
      return false;

  }
  logout() {
    this.authService.accessToken = null;
    this.authService.loggedIn = false;
  }
}
