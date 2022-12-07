import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    ViewChild,
  } from '@angular/core';
  import { Chart } from 'chart.js/auto';
import { ChartDataInterface } from 'src/app/model/data-types';
  

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {

@ViewChild('canvas') ctx?: ElementRef<HTMLCanvasElement>;
  @Input() graphData: ChartDataInterface = {
      title: 'none',
      label: [],
      datasets: [],
  };
  @Input() isDialog = false;

  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.graphData)
      this.setChart();
  }

  setChart() {
      if (this.ctx) {
          new Chart(this.ctx.nativeElement, {
              type: 'line',
              options: {
                  responsive: false,
                  maintainAspectRatio: false,
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