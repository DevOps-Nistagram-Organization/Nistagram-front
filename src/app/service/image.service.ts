import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private cloudinary = 'https://api.cloudinary.com/v1_1/detmeun2w/image/upload';
  private cloudinaryUploadPreset = 'wur6lgyd';

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.cloudinaryUploadPreset);
    formData.append('cloud_name', 'detmeun2w');
    return this.http.post(this.cloudinary, formData);
  }
}
