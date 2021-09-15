import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {HomeComponent} from "./home/home.component";
import {EditInfoComponent} from "./edit-info/edit-info.component";
import {CreateCampaignComponent} from "./create-campaign/create-campaign.component";
import {SearchTagComponent} from "./search-tag/search-tag.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'user/:username', component: UserProfileComponent},
  {path: 'myProfile', component: MyProfileComponent},
  {path: 'search/:value', component: SearchResultsComponent},
  {path: 'editProfile', component: EditInfoComponent},
  {path: 'createCampaign', component: CreateCampaignComponent},
  {path: 'searchTags/:tag', component: SearchTagComponent},
  {path: 'adminDashboard', component: AdminDashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
