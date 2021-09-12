import {Injectable} from '@angular/core';
import {ImageService} from "./image.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CreateCampaign} from "../model/CreateCampaign";
import {Observable} from "rxjs";
import {Campaign} from "../model/Campaign";
import {Post} from "../model/Post";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  path: string;

  constructor(private imageService: ImageService, private http: HttpClient) {
    this.path = `${environment.path}/agent-service/campaign`
  }

  createCampaign(createCampaignDto: CreateCampaign, selectedFile: File, success: Function, failure: Function) {
    this.imageService.uploadImage(selectedFile).subscribe(
      response => {
        createCampaignDto.imageUrl = response.url;
        return this.http.post<Post>(this.path + '/create', createCampaignDto).subscribe(
          response => {
            success();
          }, error => {
            console.log(error);
            failure();
          }
        )
      }
    );
  }

  getAgent(): Observable<Array<Campaign>> {
    return this.http.get<Array<Campaign>>(this.path + '/getAgent');
  }

  deleteCampaign(id: number) {
    return this.http.delete(this.path + '/delete/' + id);
  }
}
