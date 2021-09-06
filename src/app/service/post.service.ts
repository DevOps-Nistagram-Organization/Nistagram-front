import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageService} from "./image.service";
import {environment} from "../../environments/environment";
import {CreatePost} from "../model/CreatePost";
import {Observable} from "rxjs";
import {Post} from "../model/Post";
import {UserInfo} from "../model/UserInfo";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  path: string;

  constructor(private http: HttpClient, private imageService: ImageService) {
    this.path = `${environment.path}/post-service/post`
  }
  createPost(createPost: CreatePost, file: File, success: Function, failure: Function) {
    this.imageService.uploadImage(file).subscribe(
      response => {
        createPost.imagePath = response.url;
        return this.http.post<Post>(this.path + '/create', createPost).subscribe(
          response => {
            success();
          }, error => {
            failure();
          }
        )
      }
    );
  }
}
