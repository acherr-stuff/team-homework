import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ChartDataInterface, ChartDatasetsInterface, DataItem, DataItemDetailed} from "../model/data-types";
import {BehaviorSubject, map, Observable, Subject, Subscription} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpService {


    dataSubject$ = new BehaviorSubject<DataItem[]>([]);
    sub?: Subscription;

    constructor(
        private http: HttpClient
    ) {
    }

    getGeneralData(): void {
        this.getData('data')
    }

    getDetailedData(): void {
        this.getData('data_detailed')
    }


    getData(fileName: string): void {
        this.sub = this.http.get(`http://${environment.url}:${environment.port}/${fileName}`,
        )
            .pipe(
                map(x => JSON.stringify(x)),
                map(x => JSON.parse(x)),
            )
            .subscribe((data: DataItem[]) => {
                this.dataSubject$.next(data);
            });
    }


    getDetailedDataByWHId(param: string, id: number, startDate?: string, endDate?: string): Observable<DataItemDetailed[]> {

        let params = new HttpParams().set('wh_id', id)
        if (startDate && endDate) {
            params.set('dt_date_gte', startDate).set('dt_date_lte', endDate);
        }

        return this.http.get(`http://${environment.url}:${environment.port}/data_detailed`, {
            params: params
        })
            .pipe(
                map(x => JSON.stringify(x)),
                map(x => JSON.parse(x)),
            )

    }

}
