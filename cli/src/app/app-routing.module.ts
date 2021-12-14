import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarComponent } from './view/adicionar/adicionar.component';
import { HomeComponent } from './view/home/home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},{
  path: 'adicionar',
  component: AdicionarComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
