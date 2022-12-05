import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataPageComponent } from "./components/data-page/data-page.component";

const routes: Routes = [
  {
    path: '',
    component: DataPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
