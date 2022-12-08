export interface DataItem {
    office_id: number,
    wh_id: number,
    qty: number
}

export interface DataItemDetailed {
    wh_id: number,
    qty: number,
    dt_date: string
}

export interface GraphItem extends DataItem {
    dt_date: string
}


//GRAPHS TYPES
export interface ChartDataInterface {
    title: string;
    label: string[];
    datasets: ChartDatasetsInterface[];
}

export interface ChartDatasetsInterface {
    label: string;
    data: number[];

    [key: string]: any;

}