import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DataItem} from "../model/data-types";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

   // generalData$: Subject<DataItem[]> = new Subject<DataItem[]>();

    dataSubject = new BehaviorSubject([]);
   // dataSubject$ = this.dataSubject.asObservable();
    constructor(
        private http: HttpClient
    ) {
    }

    // getGeneralData(): Observable<any> {
    //     return this.http.get(`http://${environment.url}:${environment.port}/test_data_layer1.json`)
    // };

    // getGeneralData() {
    //     this.http.get(`http://${environment.url}:${environment.port}/test_data_layer1.json`).subscribe((res) => {
    //         let resSTR = JSON.stringify(res);
    //         let resJSON = JSON.parse(resSTR);
    //         this.generalData$.next(resJSON);
    //         console.log(resJSON)
    //         // this.generalData$.subscribe(value => {
    //         //     console.log("subj: ", value)
    //         // })
    //         //console.log("subj: ", this.generalData$)
    //         //console.log(resJSON);
    //         //this.generalData(nex)
    //         //return resJSON;
    //     })
    //
    // }


    //constructor(private apiService: ApiService) {}

    getGeneralData() {
        this.http.get(`http://${environment.url}:${environment.port}/test_data_layer1.json`)
            .pipe(
                map(x => JSON.stringify(x)),
                map(x => JSON.parse(x)),
               // pluck("hydra:member")
            )
            .subscribe((data) => {
                console.log(data);
                this.dataSubject.next(data);
               // console.log(this.dataSubject);
            });
    }
}
