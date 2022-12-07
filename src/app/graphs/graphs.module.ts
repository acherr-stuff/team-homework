import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsPageComponent } from './components/graphs-page/graphs-page.component';
import {GraphsRoutingModule} from "./graphs-routing.module";
import { GraphComponent } from './components/graph/graph.component';



@NgModule({
  declarations: [
    GraphComponent,
    GraphsPageComponent
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule
  ]
})
export class GraphsModule { }
