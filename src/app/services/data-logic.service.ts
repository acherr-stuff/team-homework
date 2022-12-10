import { Injectable } from '@angular/core';
import { ChartDataInterface, ChartDatasetsInterface, DataItem, DataItemDetailed } from '../model/data-types';

@Injectable({
  providedIn: 'root'
})
export class dataLogicService {

  constructor() { }

  collectData(res: Array<DataItem>): Map<number, number[]>
  {
      const data: Map<number, number[]> = new Map();
      res.forEach((object: DataItem) => {

          if (!data.has(object.office_id)) {
              data.set(object.office_id, [object.wh_id]);

          } else {
              const graphData = data.get(object.office_id);
              if (graphData) {
                  graphData.push(object.wh_id)
              }
          }
      });
      return data;
  }

  createCharts(res: Array<DataItemDetailed>): ChartDataInterface[]
  { 
          const data: Map<number, ChartDataInterface> = new Map();
          res.forEach((object: DataItemDetailed) => {
              if (!data.has(object.wh_id)) {
                  const chartDatasets: ChartDatasetsInterface = {
                      label: `склад ${object.wh_id}`,
                      data: [object.qty],
                      borderWidth:2,
                      borderColor: '#FF9416',
                      tension: 0.2,
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
