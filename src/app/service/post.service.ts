import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageService} from "./image.service";
import {environment} from "../../environments/environment";
import {CreatePost} from "../model/CreatePost";
import {Observable} from "rxjs";
import {Post} from "../model/Post";
import {UserInfo} from "../model/UserInfo";
import {PostIdWrapper} from "../model/PostIdWrapper";
import {AddComment} from "../model/AddComment";

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

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.path + "/get" + id);
  }

  getFeed(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.path + "/getFeed");
  }
  getMyPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.path + "/getMyPosts");
  }
  getLiked(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.path + "/getLiked");
  }
  getSaved(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.path + "/getSaved");
  }
  like(postIdWrapper: PostIdWrapper): Observable<Post> {
    return this.http.post<Post>(this.path+'/like', postIdWrapper);
  }
  unlike(postIdWrapper: PostIdWrapper): Observable<Post> {
    return this.http.post<Post>(this.path+'/unlike', postIdWrapper);
  }
  dislike(postIdWrapper: PostIdWrapper): Observable<Post> {
    return this.http.post<Post>(this.path+'/dislike', postIdWrapper);
  }
  undislike(postIdWrapper: PostIdWrapper): Observable<Post> {
    return this.http.post<Post>(this.path+'/undislike', postIdWrapper);
  }
  favourite(postIdWrapper: PostIdWrapper): Observable<Post> {
    return this.http.post<Post>(this.path+'/favourite', postIdWrapper);
  }
  unfavourite(postIdWrapper: PostIdWrapper): Observable<Post> {
    return this.http.post<Post>(this.path+'/unfavourite', postIdWrapper);
  }
  comment(addComment: AddComment): Observable<Post> {
    return this.http.post<Post>(this.path+'/comment', addComment);
  }
}
