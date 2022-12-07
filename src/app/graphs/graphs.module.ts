import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsPageComponent } from './components/graphs-page/graphs-page.component';
import {GraphsRoutingModule} from "./graphs-routing.module";
import { GraphComponent } from './components/graph/graph.component';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    GraphComponent,
    GraphsPageComponent
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    ScrollingModule
  ]
})
export class GraphsModule { }
