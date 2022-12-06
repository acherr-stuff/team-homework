import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {DataItem} from "../../../model/data-types";

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss']
})
export class DataPageComponent implements OnInit {

  generalData: DataItem[] = [];
  constructor(
      private httpService : HttpService
  ) { }

  ngOnInit(): void {
    this.httpService.getGeneralData();
    this.httpService.dataSubject.subscribe(val=> {
      this.generalData = val as DataItem[];
      console.log(this.generalData);
    });

    //this.generalData = this.httpService.dataSubject.;
     // this.httpService.getGeneralData();
     // //this.generalData =  this.httpService.generalData$;
     // this.httpService.generalData$.subscribe(val => {
     //     this.generalData = val;
     // })
     //console.log(this.generalData);
  }

}
