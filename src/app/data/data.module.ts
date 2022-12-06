import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPageComponent } from './components/data-page/data-page.component';
import { DataRoutingModule } from "./data-routing.module";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    DataPageComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    MatTableModule,
    MatIconModule
  ]
})
export class DataModule { }
