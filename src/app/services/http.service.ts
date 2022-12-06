import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
      private http: HttpClient
  ) { }

  getGeneralData() {
    this.http.get(`http://${environment.url}:${environment.port}/test_data_layer1.json`).subscribe(value => {
      console.log("data: ", value);
    });
  }

}
