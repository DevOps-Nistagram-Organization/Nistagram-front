import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";

const routes: Routes = [{path: "login", component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'user/:username', component: UserProfileComponent},
  {path: 'myProfile', component: MyProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
