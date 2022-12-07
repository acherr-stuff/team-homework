import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphItem, ChartDataInterface, ChartDatasetsInterface } from 'src/app/model/data-types';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-graphs-page',
  templateUrl: './graphs-page.component.html',
  styleUrls: ['./graphs-page.component.scss']
})
export class GraphsPageComponent implements OnInit {

  graphData: ChartDataInterface[] = [];
  sub?: Subscription;

  constructor(
    private httpService: HttpService
) {
}

  ngOnInit(): void {
    this.httpService.getDetailedData();
    // this.httpService.getDetailedDataById("office_id", 1518).subscribe();
     this.sub = this.httpService.dataSubject$.subscribe(val => {
       this.graphData = this.CollectData(val as GraphItem[]);
     });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }


  CollectData(res: Array<GraphItem>): ChartDataInterface[] {
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
}

}
