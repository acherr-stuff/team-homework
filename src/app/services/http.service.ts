import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ChartDataInterface, ChartDatasetsInterface, DataItem, DataItemDetailed, GraphItem} from "../model/data-types";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {


    dataSubject$ = new BehaviorSubject([]);
    constructor(
        private http: HttpClient
    ) {
    }


    getGeneralData() {
        this.http.get(`http://${environment.url}:${environment.port}/data`)
            .pipe(
                map(x => JSON.stringify(x)),
                map(x => JSON.parse(x)),
            )
            .subscribe((data) => {
                console.log(data);
                this.dataSubject$.next(data);
            });
    }

    getDetailedDataById(param: string, id: number) {
        return this.http.get(`http://${environment.url}:${environment.port}/data_detailed?${param}=${id}`)
            .pipe(
                map(x => JSON.stringify(x)),
                map(x => JSON.parse(x)),
            )

    }


    getDetailedData() {
        this.http.get(`http://${environment.url}:${environment.port}/data_detailed`)
            .pipe(
                map(x => JSON.stringify(x)),
                map(x => JSON.parse(x)),
            )
            .subscribe((data) => {
                this.dataSubject$.next(data);
            });
    }

    collectData(res: Array<DataItem>): Map<number, number[]>
    {
        const data: Map<number, number[]> = new Map();
        res.forEach((object: DataItem) => {

            if (!data.has(object.office_id)) {
                data.set(object.office_id, [object.wh_id]);

            } else {
                const graphData = data.get(object.office_id);
                if (graphData) {
                    graphData.push(object.wh_id)
                }
            }
        });
        console.log(data)
        return data;
    }

    createCharts(res: Array<GraphItem>): ChartDataInterface[] 
    { 
            const data: Map<number, ChartDataInterface> = new Map();
            res.forEach((object: GraphItem) => {
                if (!data.has(object.wh_id)) {
                    const chartDatasets: ChartDatasetsInterface = {
                        label: `склад ${object.wh_id}`,
                        data: [object.qty],
                        borderWidth:1,
                    };
    
                    data.set(object.wh_id, {
                        title:`склад ${object.wh_id}`,
                        label: [object.dt_date],
                        datasets: [chartDatasets],
                    });
                } else {
                    const graphData = data.get(object.wh_id);
    
                    if (graphData) {
    
                        graphData.datasets[0].data.push(object.qty)
    
                        graphData.label.push(object.dt_date)
                    }
                }
            });
            return [...data.values()];
        }
    

    // сollectData(res: Array<DataItem>): Map<number, DataItem[]>
    // {
    //     const data: Map<number, DataItem[]> = new Map();
    //     res.forEach((object: DataItem) => {
    //
    //         if (!data.has(object.office_id)) {
    //             data.set(object.office_id, [object]);
    //
    //         } else {
    //             const graphData = data.get(object.office_id);
    //             if (graphData) {
    //                 graphData.push(object)
    //             }
    //         }
    //     });
    //     console.log("map data", data)
    //     return data;
    // }

    // collectExpandedData(res: Array<DataItemDetailed>): Map<number, DataItemDetailed> {
    //     const data: Map<number, DataItem[]> = new Map();
    // }

}
