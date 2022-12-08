import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsPageComponent } from "./components/graphs-page/graphs-page.component";
import { SingleGraphComponent } from './components/single-graph/single-graph.component';

const routes: Routes = [
  {
    path: '',
    component: GraphsPageComponent,
  },
  {
    path:':id',
    component: SingleGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphsRoutingModule { }
