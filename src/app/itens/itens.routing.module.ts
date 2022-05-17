import { ItensListComponent } from './itens-list/itens-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../core/auth/auth.guard';
import { ItensCadComponent } from './itens-cad/itens-cad.component';

const routes: Routes = [
  {
    path: '',
    component: ItensListComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Lista de Itens'
    }
  },
  {
    path: 'novo',
    component: ItensCadComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Novo Item'
    }
  },
  {
    path: ':id',
    component: ItensCadComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Alteração de Item'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class ItensRoutingModule {

}
