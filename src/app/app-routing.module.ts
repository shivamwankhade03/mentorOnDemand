import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './site/user-login/user-login.component';
import { UserSignupComponent } from './site/user-signup/user-signup.component';
import { SearchComponent } from './search/search.component';
import { MentorComponent } from './users/mentor/mentor.component';
import { UserComponent } from './users/user/user.component';
import { TrainerComponent } from './users/trainer/trainer.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [


  {path:"login",component:UserLoginComponent},
  {path:"signup",component:UserSignupComponent},
  {path:"search",component:SearchComponent},
  {path:'mentor',component:MentorComponent , },
  {path:'user',component:UserComponent,},
  {path:'trainer',component:TrainerComponent ,},
  {path:'home',component:HomeComponent ,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
