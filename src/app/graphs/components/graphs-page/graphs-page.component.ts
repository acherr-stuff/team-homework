import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { fromEvent, Subject, Subscription, takeUntil } from 'rxjs';
//import { GraphItem, ChartDataInterface, ChartDatasetsInterface } from 'src/app/model/data-types';
import { GraphItem, ChartDataInterface, ChartDatasetsInterface } from '../../../model/data-types';
//import { HttpService } from 'src/app/services/http.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-graphs-page',
  templateUrl: './graphs-page.component.html',
  styleUrls: ['./graphs-page.component.scss']
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
    


  constructor(
    public httpService: HttpService
) {
}

  ngOnInit(): void {
    console.log('graphCreate')
    this.httpService.getDetailedData();
    // this.httpService.getDetailedDataById("office_id", 1518).subscribe();
     this.sub = this.httpService.dataSubject$.subscribe(val => {
       this.graphData = this.httpService.createCharts(val as GraphItem[]);
       console.log(this.graphData)
     });

  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
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
