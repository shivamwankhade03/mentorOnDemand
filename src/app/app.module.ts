import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './site/user-login/user-login.component';
import { UserSignupComponent } from './site/user-signup/user-signup.component';
import { UserComponent } from './users/user/user.component';
import { MentorComponent } from './users/mentor/mentor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { MentorInfoComponent } from './users/mentor-info/mentor-info.component';
import { TrainerComponent } from './users/trainer/trainer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { DatePipe } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserComponent,
    MentorComponent,
    SearchComponent,
    MentorInfoComponent,
    TrainerComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    })
  ],
  providers: [DatePipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
