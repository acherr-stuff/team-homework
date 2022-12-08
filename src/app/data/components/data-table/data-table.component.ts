import { Component, OnInit } from '@angular/core';
import {DataItem, DataItemDetailed} from "../../../model/data-types";
import {HttpService} from "../../../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable, of} from 'rxjs';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class DataTableComponent implements OnInit {

  generalData: DataItem[] = [];
    public dataSource = new MatTableDataSource<number>([]);
    public storagesDataSource = new MatTableDataSource<number>([]);
   // public statDataSource = new MatTableDataSource([]);
    public statDataSource$: Observable<any> = of([]);
    columnsToDisplay = ["office_id"];
    storagesColumnsToDisplay = [ "wh_id"];
    statColumnsToDisplay = ["dt_date", "qty"];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    storagesColumnsToDisplayWithExpand = [...this.storagesColumnsToDisplay, 'expand'];
    expandedOffice!: DataItemDetailed[] | null;
    expandedStorages!: DataItemDetailed[] | null;
    expandedStat!: DataItemDetailed[] | null;
    mapOfIdS  = new Map();

    range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

    private startDateField: string = "";
    private endDateField: string = "";
    public startDate!: Date;
    public endDate!: Date;
    public maxDate: Date = new Date();
    public minDate: Date = new Date()


  constructor(
      private httpService: HttpService
  ) {
    this.httpService.getGeneralData();
    this.httpService.dataSubject$.subscribe(val => {
      this.generalData = val as DataItem[];
      this.mapOfIdS = this.httpService.collectData(val);
      this.dataSource.data = Array.from(this.mapOfIdS.keys());
    });
  }

  getExpandedStorages(id: number) {
    this.storagesDataSource = this.mapOfIdS.get(id);
  }

  getExpandedStat(param: string, id: number) {
    this.statDataSource$ = this.httpService.getDetailedDataById(param, id)
  }

  clearStorages() {
    this.expandedStorages = [];
  }

  clearStat() {
    this.expandedStat = [];
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.httpService.dataSubject$.unsubscribe();
  }

  public dateRangeChange(dateRangeStart: any, dateRangeEnd: any): void {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timezone: "UTC"
    };
    console.log("start date: ", )
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

}
