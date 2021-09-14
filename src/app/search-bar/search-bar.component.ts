import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar, private router: Router, private authenticationService: AuthService) {
    this.searchForm = this.formBuilder.group({
      searchValue: ['', [Validators.required]]
    });
  }


  searchForm: FormGroup;

  ngOnInit(): void {
  }
  get searchValue() {
    return this.searchForm.controls.searchValue.value as string;
  }

  search() {
    this.router.navigateByUrl('search/'+encodeURIComponent(this.searchValue));
  }
  searchTag() {
    this.router.navigateByUrl('searchTags/'+encodeURIComponent(this.searchValue));
  }
}
