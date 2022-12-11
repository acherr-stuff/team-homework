import { Injectable } from '@angular/core';
import {
  DataItem,
} from '../model/data-types';

@Injectable()
export class DataLogicService {
  constructor() {}

  collectData(res: Array<DataItem>): Map<number, number[]> {
    const data: Map<number, number[]> = new Map();
    res.forEach((object: DataItem) => {
      if (!data.has(object.office_id)) {
        data.set(object.office_id, [object.wh_id]);
      } else {
        const graphData = data.get(object.office_id);
        if (graphData) {
          graphData.push(object.wh_id);
        }
      }
    });
    return data;
  }
}
