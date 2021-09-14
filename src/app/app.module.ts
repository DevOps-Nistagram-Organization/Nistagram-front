import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "./MaterialModule";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptorService} from "./service/token-interceptor-service";
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {DatePipe} from "@angular/common";
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserPreviewRowComponent } from './user-preview-row/user-preview-row.component';
import { HomeComponent } from './home/home.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentComponent } from './comment/comment.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignPostComponent } from './campaign-post/campaign-post.component';
import { SearchTagComponent } from './search-tag/search-tag.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportedPostComponent } from './reported-post/reported-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SearchBarComponent,
    RegistrationComponent,
    UserProfileComponent,
    MyProfileComponent,
    SearchResultsComponent,
    UserPreviewRowComponent,
    HomeComponent,
    EditInfoComponent,
    CreatePostComponent,
    PostComponent,
    PostListComponent,
    CreateCommentComponent,
    CommentComponent,
    CreateCampaignComponent,
    CampaignComponent,
    CampaignPostComponent,
    SearchTagComponent,
    AdminDashboardComponent,
    ReportedPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
