import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DataItem} from "../model/data-types";
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
        this.http.get(`http://${environment.url}:${environment.port}/test_data_layer0.json`)
            .pipe(
                map(x => JSON.stringify(x)),
                map(x => JSON.parse(x)),
            )
            .subscribe((data) => {
                console.log(data);
                this.dataSubject$.next(data);
            });
    }
}
