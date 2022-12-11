import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";
import { DataLogicService } from 'src/app/services/data-logic.service';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss'],
  providers: [DataLogicService]
})
export class DataPageComponent implements OnInit {

  constructor(
      public httpService: HttpService,
      public dataLogicService: DataLogicService
  ) {

  }
  ngOnInit(): void {
  }

}
