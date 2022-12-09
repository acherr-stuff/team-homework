import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsPageComponent } from './components/graphs-page/graphs-page.component';
import {GraphsRoutingModule} from "./graphs-routing.module";
import { GraphComponent } from './components/graph/graph.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'


@NgModule({
  declarations: [
    GraphComponent,
    GraphsPageComponent,
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    MatProgressSpinnerModule
  ],
})
export class GraphsModule { }
