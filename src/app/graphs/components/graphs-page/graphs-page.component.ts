import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Subject, Subscription, takeUntil } from 'rxjs';
import { GraphLogicService } from 'src/app/services/graph-logic.service';
//import { GraphItem, ChartDataInterface, ChartDatasetsInterface } from 'src/app/model/data-types';
import { ChartDataInterface, DataItemDetailed } from '../../../model/data-types';
//import { HttpService } from 'src/app/services/http.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-graphs-page',
  templateUrl: './graphs-page.component.html',
  styleUrls: ['./graphs-page.component.scss'],
  providers: [GraphLogicService]
})
export class GraphsPageComponent implements OnInit {

  spinnerColor:ThemePalette = 'warn'
  spinnerMode: ProgressSpinnerMode = 'indeterminate';
  

  graphData: ChartDataInterface[] = [];
  sub?: Subscription;
  visualGraphsSize = 5;

  @ViewChild('graphsArea') GraphsArea?: ElementRef;

  destroy = new Subject();
  destroy$ = this.destroy.asObservable();
  

  id!: number;

  private querySubscription: Subscription;

  constructor( public httpService: HttpService,public graphLogicService: GraphLogicService ,private route: ActivatedRoute) {

      this.querySubscription = route.queryParams.subscribe(
          (queryParam: any) => {
              this.id = queryParam['id'];
          }
      );
  }


  ngOnInit(): void {
    if (this.id) {
      this.httpService.getDetailedDataByWHId("wh_id", this.id).subscribe(val => {
        this.graphData = this.graphLogicService.createCharts(val as DataItemDetailed[])
      })
    }
    else {
    this.httpService.getDetailedData();
     this.sub = this.httpService.dataSubject$.subscribe(val => {
       this.graphData = this.graphLogicService.createCharts(val as DataItemDetailed[]);
     });
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.querySubscription.unsubscribe();
    if ( this.httpService.sub)
      this.httpService.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.GraphsArea)
    fromEvent(this.GraphsArea.nativeElement, 'scroll').pipe(takeUntil(this.destroy$))
			.subscribe((e) => this.scrollHandler(e as Event));

}

  scrollHandler(e: Event) {
    if ((e.target as Element).scrollHeight - ((e.target as Element).scrollTop +  window.innerHeight)<400)
      this.visualGraphsSize +=5;
  }

}
