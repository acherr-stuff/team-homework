import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {DataItem} from "../../../model/data-types";

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss']
})
export class DataPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
