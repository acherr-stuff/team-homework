import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
      private http: HttpClient
  ) { }

  getGeneralData() {
    this.http.get('http://127.0.0.1:8081/test_data_layer1.json').subscribe(value => {
      console.log("data: ", value);
    });
  }

}
