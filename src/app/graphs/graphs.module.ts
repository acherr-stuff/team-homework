import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsPageComponent } from './components/graphs-page/graphs-page.component';
import {GraphsRoutingModule} from "./graphs-routing.module";
import { GraphComponent } from './components/graph/graph.component';
import { SingleGraphComponent } from './components/single-graph/single-graph.component';



@NgModule({
  declarations: [
    GraphComponent,
    GraphsPageComponent,
    SingleGraphComponent
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
  ],
})
export class GraphsModule { }
