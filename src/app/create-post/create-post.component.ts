import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInfo} from "../model/UserInfo";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {CreatePost} from "../model/CreatePost";
import {PostService} from "../service/post.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private postService: PostService) {
    this.postForm = this.formBuilder.group({
      tags: ['', []],
    });
  }

  postForm: FormGroup;
  userInfo!: UserInfo;
  selectedFile: File | undefined;
  url: any;

  ngOnInit(): void {
  }

  get tags() {
    return this.postForm.controls.tags.value as string;
  }

  post() {
    const listTags: Array<string> = this.tags.split('#').filter(value => value !== "");
    const createPost = new CreatePost('',listTags);
    if (this.selectedFile){
      this.postService.createPost(createPost,this.selectedFile, this.success.bind(this), this.failure.bind(this));
    }
  }

  success() {
    this.url = "";
    this.snackBar.open("Successfully added post");
  }

  failure() {
    this.snackBar.open("Error adding post");
  }

  onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (newEvent) => { // called once readAsDataURL is completed
        this.url = newEvent.target!.result;
      };
    }
  }
}
