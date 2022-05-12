import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ErrorsModule } from './errors/errors.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { SignInModule } from './signin/signin.module';
import { HomeModule } from './home/home.module';
import { ItensModule } from './itens/itens.module';
import { ToastrModule } from 'ngx-toastr';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
