import {
    Component,
    ElementRef,
    Input,
    ViewChild,
  } from '@angular/core';
import { Router } from '@angular/router';
  import { Chart } from 'chart.js/auto';
import { ChartDataInterface, GraphItem } from 'src/app/model/data-types';
import { HttpService } from 'src/app/services/http.service';
  

@Component({
  selector: 'app-single-graph',
  templateUrl: './single-graph.component.html',
  styleUrls: ['./single-graph.component.scss']
})
export class SingleGraphComponent {

@ViewChild('canvas') ctx?: ElementRef<HTMLCanvasElement>;
  @Input() graphData: ChartDataInterface = {
      title: 'none',
      label: [],
      datasets: [],
  };
  @Input() isDialog = false;

  constructor(private router: Router, public httpService: HttpService) {}

  ngOnInit(): void {
    const wh_id = +this.router.url.replace( /^\D+/g, '');
    if (!isNaN(wh_id))
        this.httpService.getDetailedDataById("wh_id", wh_id).subscribe(val => {
            const graphDataInArr = this.httpService.createCharts(val as GraphItem[]).pop()
            if (graphDataInArr)
                this.graphData = graphDataInArr;
            this.setChart();
          });
  }

  setChart() {
      if (this.ctx) {
          new Chart(this.ctx.nativeElement, {
              type: 'line',
              options: {
                  responsive: false,
                  maintainAspectRatio: true,
                  plugins: {
                      title: {
                          display: true,
                          text: this.graphData.title,
                      },
                  },
              },
              data: {
                  labels: this.graphData.label,
                  datasets: this.graphData.datasets,
              },
          });
      }
  }
}
