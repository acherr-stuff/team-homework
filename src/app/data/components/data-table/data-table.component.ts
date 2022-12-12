import {Component, OnInit} from '@angular/core';
import {DataItem} from "../../../model/data-types";
import {HttpService} from "../../../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable, of, publish, refCount, share, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {
    DateAdapter,
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,
    ThemePalette
} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {DatePipe} from "@angular/common";
import {s} from "chart.js/dist/chunks/helpers.core";
import {DataLogicService} from 'src/app/services/data-logic.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

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
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
        DatePipe
    ]
})
export class DataTableComponent implements OnInit {

    public dataSource = new MatTableDataSource<number>([]);
    public storagesDataSource = new MatTableDataSource<number>([]);
    public statDataSource$: Observable<any> = of([]);
    columnsToDisplay = ["Офис"];
    storagesColumnsToDisplay = ["Склад"];
    statColumnsToDisplay = ["dt_date", "qty"];
    statColumnsNames = ["Дата", "Количество"]; //Добавил доп массив для вывода колонок на русском
    allColumnsToDisplay = ["Офис", "Склад", "Дата", "Количество"];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    storagesColumnsToDisplayWithExpand = [...this.storagesColumnsToDisplay, 'expand'];
    expandedOffice!: DataItem[] | null;
    expandedStorages!: number | null;
    expandedStat!: DataItem[] | null;

    currentWHId!: number;
    mapOfIdS = new Map();
    sub?: Subscription;


    range = new FormGroup({
        start: new FormControl<Date | null>(null, Validators.required),
        end: new FormControl<Date | null>(null, Validators.required),
    });
    public startDate!: string;
    public endDate!: string;

    myFilter = (d: Date): boolean => {
        const maxDate: Date = new Date();
        const minDate = new Date((new Date()).setMonth((new Date()).getMonth() - 6));
        return d <= maxDate && d >= minDate;
    };

    constructor(
        private httpService: HttpService,
        public dataLogicService: DataLogicService,
        private readonly router: Router,
    ) {
        this.httpService.getGeneralData();
        this.sub = this.httpService.dataSubject$.subscribe(val => {
            this.mapOfIdS = this.dataLogicService.collectData(val);
            this.dataSource.data = Array.from(this.mapOfIdS.keys());
        });
    }

    openGraph(id: number): void {
        const url = this.router.serializeUrl(
            this.router.createUrlTree([`graphs/${id}`])
        );
        window.open(url, '_blank');
    }

    getExpandedStorages(id: number): void {
        this.storagesDataSource = this.mapOfIdS.get(id);
    }

    getExpandedStat(param: string, id: number) {
        this.currentWHId = id;
        this.statDataSource$ = this.httpService.getDetailedDataByWHId(param, id, this.startDate, this.endDate).pipe(
            publish(),
            refCount()
        );

    }


    clearStorages() {
        this.expandedStorages = null;
    }

    clearStat() {
        this.expandedStat = [];
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

    public dateRangeChange(dateRangeStart: any, dateRangeEnd: any): void {
        this.startDate = dateRangeStart.value;
        this.endDate = dateRangeEnd.value;
    }

    public updateDates() {
        if (this.currentWHId) {
            this.statDataSource$ = this.httpService.getDetailedDataByWHId('wh_id', this.currentWHId, this.startDate, this.endDate).pipe(
                publish(),
                refCount()
            );
        }
    }

}
