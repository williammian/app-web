import { ItensCadComponent } from './itens/itens-cad/itens-cad.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthGuard } from "./core/auth/auth.guard";
import { SignInComponent } from './signin/signin.component';
import { ItensListComponent } from './itens/itens-list/itens-list.component';
import { LoginGuard } from "./core/auth/login.guard";
import { GlobalErrorComponent } from "./errors/global-error/global-error.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [

  {
    path: '',
    component: SignInComponent,
    canActivate: [LoginGuard],
    data: {
      title: 'Login'
    }
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    }
  },

  {
    path: 'itens',
    loadChildren: () => import('./itens/itens.module').then(m => m.ItensModule)
  },

  {
    path: 'error',
    component: GlobalErrorComponent,
    data: {
      title: 'Error'
    }
  },

  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Not found'
    }
  },

  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true } )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
