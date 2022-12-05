import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPageComponent } from './components/data-page/data-page.component';
import {DataRoutingModule} from "./data-routing.module";



@NgModule({
  declarations: [
    DataPageComponent,
  ],
  imports: [
    CommonModule,
    DataRoutingModule
  ]
})
export class DataModule { }
