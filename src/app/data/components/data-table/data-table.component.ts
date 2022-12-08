import { Component, OnInit } from '@angular/core';
import {DataItem, DataItemDetailed} from "../../../model/data-types";
import {HttpService} from "../../../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable, of, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
} from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";
import {s} from "chart.js/dist/chunks/helpers.core";

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

    currentWHId!: number;
    mapOfIdS = new Map();
    sub?: Subscription;


  range = new FormGroup({
      start: new FormControl<Date | null>(null, Validators.required),
      end: new FormControl<Date | null>(null, Validators.required),
    });
    public startDate!: string;
    public endDate!: string;
    public maxDate: Date = new Date();
    public minDate = new Date(this.maxDate.setMonth(this.maxDate.getMonth() - 6));
    myFilter = (d: Date): boolean => {
      const maxDate: Date = new Date();
      const minDate = new Date((new Date()).setMonth((new Date()).getMonth() - 6));
      return d <= maxDate && d >=minDate;
    };

  constructor(
      private httpService: HttpService,
      private readonly router: Router
  ) {
    this.httpService.getGeneralData();
    this.sub = this.httpService.dataSubject$.subscribe(val => {
      this.generalData = val as DataItem[];
      this.mapOfIdS = this.httpService.collectData(val);
      this.dataSource.data = Array.from(this.mapOfIdS.keys());
    });
  }

  getExpandedStorages(id: number) {
    this.storagesDataSource = this.mapOfIdS.get(id);
  }

  getExpandedStat(param: string, id: number) {
    this.currentWHId = id;
    this.statDataSource$ = this.httpService.getDetailedDataById(param, id, this.startDate, this.endDate);

  }

  getExpandedStat1(param: string, id: number, start: string, end: string): Observable<any> {
   return this.httpService.getDetailedDataById(param, id, start, end);
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
    console.log('datatableDestroy')
    this.sub?.unsubscribe();
  }

  public dateRangeChange(dateRangeStart: any, dateRangeEnd: any): void {
    this.startDate = dateRangeStart.value;
    this.endDate = dateRangeEnd.value;
    }

  public updateDates() {
    if (this.currentWHId) {
      this.statDataSource$ = this.httpService.getDetailedDataById('wh_id', this.currentWHId, this.startDate, this.endDate);
    }
  }

}
