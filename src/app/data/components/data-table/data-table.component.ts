import { Component, OnInit } from '@angular/core';
import {DataItem, DataItemDetailed} from "../../../model/data-types";
import {HttpService} from "../../../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



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
    public statDataSource = new MatTableDataSource([]);
    columnsToDisplay = ["office_id"];
    storagesColumnsToDisplay = [ "wh_id"];
    statColumnsToDisplay = ["dt_date", "qty"];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    storagesColumnsToDisplayWithExpand = [...this.storagesColumnsToDisplay, 'expand'];
   // expandedElement!: DataItemDetailed[] | null;
    expandedOffice!: DataItemDetailed[] | null;
    expandedStorages!: DataItemDetailed[] | null;
    expandedStat!: DataItemDetailed[] | null;

   sub?: Subscription;
   public allData  = new Map();

  constructor(
      private httpService: HttpService,
      private readonly router: Router
  ) {
    this.httpService.getGeneralData();
    this.httpService.dataSubject$.subscribe(val => {
      this.generalData = val as DataItem[];
      this.allData = this.httpService.collectData(val);
      this.dataSource.data = Array.from(this.allData.keys());
    //  console.log("office sorted: ", this.dataSource.data);

    });
  }

  openGraph(id:number) {  //НАВИГАЦИЯ
    this.router.navigate([`/graphs/${id}`])
  }

  getExpandedStorages(param: string, id: number) {
    this.storagesDataSource = this.allData.get(id);
  }

  getExpandedStat(param: string, id: number) {
    this.httpService.getDetailedDataById(param, id).subscribe(val => {
      this.expandedStat = val;
      this.statDataSource = val;
      console.log("last table data: ", val);
    })
  }

  clearStorages() {
    this.expandedStorages = [];
    console.log("clear");
  }

  clearStat() {
    this.expandedStat = [];
    console.log("clear");
  }

  ngOnInit(): void {
   //  this.httpService.getGeneralData();
   // // this.httpService.getDetailedDataById("office_id", 1518).subscribe();
   //  this.sub = this.httpService.dataSubject$.subscribe(val => {
   //    this.generalData = val as DataItem[];
   //    this.dataSource.data = val;
   //
   //    this.CollectData(this.dataSource.data)
   //  });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }


  // CollectData(res: Array<DataItem>): Map<number, number[]>
  //   {
  //       const data: Map<number, number[]> = new Map();
  //       res.forEach((object: DataItem) => {
  //
  //           if (!data.has(object.office_id)) {
  //               data.set(object.office_id, [object.wh_id]);
  //
  //           } else {
  //               const graphData = data.get(object.office_id);
  //               if (graphData) {
  //                   graphData.push(object.wh_id)
  //               }
  //           }
  //       });
  //       console.log(data)
  //       return data;
  //   }
    

}
