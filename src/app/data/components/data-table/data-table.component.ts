import { Component, OnInit } from '@angular/core';
import {DataItem, DataItemDetailed} from "../../../model/data-types";
import {HttpService} from "../../../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable, of} from 'rxjs';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
} from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";

export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY-MM-DD"
  },
  display: {
    dateInput: "YYYY-MM-DD",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD",
    monthYearA11yLabel: "MMMM YYYY"
  }
};



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
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})
export class DataTableComponent implements OnInit {

  generalData: DataItem[] = [];
    public dataSource = new MatTableDataSource<number>([]);
    public storagesDataSource = new MatTableDataSource<number>([]);
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
      start: new FormControl<Date | null>(null, Validators.required),
      end: new FormControl<Date | null>(null, Validators.required),
    });
    //private startDateField: string = "";
    //private endDateField: string = "";
    public startDate!: Date;
    public endDate!: Date;
    public maxDate: Date = new Date();
    public minDate: Date = new Date()


  constructor(
      private httpService: HttpService,
      private readonly router: Router
  ) {
    this.httpService.getGeneralData();
    this.httpService.dataSubject$.subscribe(val => {
      this.generalData = val as DataItem[];
      this.mapOfIdS = this.httpService.collectData(val);
      this.dataSource.data = Array.from(this.mapOfIdS.keys());
    });
    // this.httpService.getDetailedDataById('wh_id', 70, '2022-08-28', '2022-08-31').subscribe(val => {
    //   console.log("filtered by date: ", val);
    // })
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

    this.startDate = dateRangeStart.value;
    this.endDate = dateRangeEnd.value;
    console.log("start date: ",  this.startDate, " end date: ", this.endDate);

    }


}
