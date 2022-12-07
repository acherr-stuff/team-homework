import { Component, OnInit } from '@angular/core';
import {DataItem, DataItemDetailed} from "../../../model/data-types";
import {HttpService} from "../../../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { Subscription } from 'rxjs';



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
    //public dataSource1 = new MatTableDataSounrce([]);
    public storagesDataSource = new MatTableDataSource([]);
    columnsToDisplay = ["office_id"];
    storagesColumnsToDisplay = [ "wh_id", "dt_date" ,"qty"];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    expandedElement!: DataItemDetailed[] | null;
    expandedOffice!: DataItemDetailed[] | null;
    expandedStorages!: DataItemDetailed[] | null;
    expandedOffice1!: number[] | null;

   sub?: Subscription;

  constructor(
      private httpService: HttpService
  ) {
    this.httpService.getGeneralData();
    this.httpService.dataSubject$.subscribe(val => {
      this.generalData = val as DataItem[];
      this.dataSource.data = Array.from(this.httpService.collectData(val).keys());
      console.log("office sorted: ", this.dataSource.data);

    });
  }

  getExpandedStorages(param: string, id: number) {
    this.httpService.getDetailedDataById(param, id)
        .subscribe(val => {
      this.expandedStorages = val;
      this.storagesDataSource = val;
      console.log("storage data: ", Array.from(this.httpService.collectData(val).values()))
     // let parsedWh = Array.from()
     // console.log("expanded val: ",   this.expandedStorages);
    });
  }

  clearStorages() {
    this.expandedStorages = [];
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
