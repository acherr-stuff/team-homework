import { Injectable } from '@angular/core';
import {
  ChartDataInterface,
  ChartDatasetsInterface,
  DataItemDetailed,
} from '../model/data-types';

@Injectable()
export class GraphLogicService {
  constructor() {}


  createCharts(res: Array<DataItemDetailed>): ChartDataInterface[] {
    const data: Map<number, ChartDataInterface> = new Map();
    res.forEach((object: DataItemDetailed) => {
      if (!data.has(object.wh_id)) {
        const chartDatasets: ChartDatasetsInterface = {
          label: `склад ${object.wh_id}`,
          data: [object.qty],
          borderWidth: 2,
          borderColor: '#FF9416',
          tension: 0.2,
        };

        data.set(object.wh_id, {
          title: `склад ${object.wh_id}`,
          label: [object.dt_date],
          datasets: [chartDatasets],
        });
      } else {
        const graphData = data.get(object.wh_id);

        if (graphData) {
          graphData.datasets[0].data.push(object.qty);

          graphData.label.push(object.dt_date);
        }
      }
    });
    return [...data.values()];
  }
}
