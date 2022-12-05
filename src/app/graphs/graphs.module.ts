import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsPageComponent } from './components/graphs-page/graphs-page.component';
import {GraphsRoutingModule} from "./graphs-routing.module";



@NgModule({
  declarations: [
    GraphsPageComponent
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule
  ]
})
export class GraphsModule { }
