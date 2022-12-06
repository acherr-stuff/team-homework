import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss']
})
export class DataPageComponent implements OnInit {

  constructor(
      private httpService : HttpService
  ) { }

  ngOnInit(): void {
      this.httpService.getGeneralData();
  }

}
