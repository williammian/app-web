import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { AppComponent } from './app.component';
import { ErrorsModule } from './errors/errors.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { SignInModule } from './signin/signin.module';
import { HomeModule } from './home/home.module';
import { ItensModule } from './itens/itens.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ErrorsModule,
    CoreModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SignInModule,
    HomeModule,
    ItensModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(localeService: BsLocaleService) {
    defineLocale('ptbr', ptBrLocale);
    localeService.use('ptbr');
  }

}
