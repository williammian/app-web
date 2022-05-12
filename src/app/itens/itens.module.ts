import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ItensListComponent } from "./itens-list/itens-list.component";
import { CoreModule } from '../core/core.module';
import { PaginatorModule } from '../shared/components/paginator/paginator.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ItensListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    PaginatorModule,
    RouterModule
  ]
})
export class ItensModule {}
