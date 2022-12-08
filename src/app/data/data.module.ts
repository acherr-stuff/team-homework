import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPageComponent } from './components/data-page/data-page.component';
import { DataRoutingModule } from "./data-routing.module";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatMomentDateModule} from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    DataPageComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule
  ]
})
export class DataModule { }
