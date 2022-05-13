import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CoreModule } from '../core/core.module';
import { PaginatorModule } from '../shared/components/paginator/paginator.module';
import { ItensListComponent } from "./itens-list/itens-list.component";
import { ItensCadComponent } from './itens-cad/itens-cad.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';

@NgModule({
  declarations: [
    ItensListComponent,
    ItensCadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CurrencyMaskModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    PaginatorModule,
    RouterModule,
    VMessageModule
  ]
})
export class ItensModule {}
