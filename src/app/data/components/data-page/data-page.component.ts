import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {DataItem} from "../../../model/data-types";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss']
})
export class DataPageComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  private startDateField: string = "";
  private endDateField: string = "";
  public startDate!: Date;
  public endDate!: Date;

  jsonData: any;

  constructor(
      public httpService: HttpService
  ) {

  }
  ngOnInit(): void {
    this.httpService.getDetailedDataById("office_id", 1518).subscribe(val => {
      this.jsonData = val;
      console.log("date data",this.jsonData);
    })
  }

  public dateRangeChange(dateRangeStart: any, dateRangeEnd: any): void {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timezone: "UTC"
    };
    this.startDateField = dateRangeStart.value.toLocaleString("ru", options);
    this.endDateField = dateRangeEnd.value.toLocaleString("ru", options);
    if (this.startDateField !== "" && this.endDateField !== "") {
      this.startDate = new Date(this.startDateField);
      this.endDate = new Date(this.endDateField);
      // this.startTime = this.startDate.getTime();
      // this.endTime = this.endDate.getTime();
      // this.dateInput  =  document.querySelector(".mat-form-field-type-mat-date-range-input ");
      // this.dateInput.style.width = "200px";
      // this.deleteDateIcon.style.display = "inline-flex";
      // this.dateIcon  =  document.querySelector(".mat-form-field-suffix");
      // this.dateIcon.style.display = "none";
      // this.getDealAnalyticsAll(this.startTime, this.endTime);
      // this.dateService.dateRangeMethod(this.startTime, this.endTime);
    }
  }

  getData() {
    this.httpService.getDetailedDataById("office_id", 1518).subscribe(val => {
      this.jsonData = val;
      console.log("date data",this.jsonData);
    })
  }
}
