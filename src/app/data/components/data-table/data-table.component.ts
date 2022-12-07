import { Component, OnInit } from '@angular/core';
import {DataItem, DataItemDetailed} from "../../../model/data-types";
import {HttpService} from "../../../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

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
    public dataSource = new MatTableDataSource([]);
    public storagesDataSource = new MatTableDataSource([]);
    columnsToDisplay = ["office_id"];
    storagesColumnsToDisplay = [ "wh_id", "dt_date" ,"qty"];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    expandedElement!: DataItemDetailed[] | null;
    expandedOffice!: DataItemDetailed[] | null;
   expandedStorages!: DataItemDetailed[] | null;

  constructor(
      private httpService: HttpService
  ) {
  }

  getExpandedStorages(param: string, id: number) {
    this.httpService.getDetailedDataById(param, id)
        .subscribe(val => {
      this.expandedStorages = val;
      this.storagesDataSource = val;
      console.log("expanded val: ",   this.expandedStorages);
    });
  }

  clearStorages() {
    this.expandedStorages = [];
    console.log("clear");
  }

  ngOnInit(): void {
    this.httpService.getGeneralData();
   // this.httpService.getDetailedDataById("office_id", 1518).subscribe();
    this.httpService.dataSubject$.subscribe(val => {
      this.generalData = val as DataItem[];
      this.dataSource.data = val;
    });

  }
}
