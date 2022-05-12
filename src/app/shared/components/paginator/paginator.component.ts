import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Paginator } from "./paginator";

@Component({
  selector: 'ap-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {

  @Input() paginator: Paginator;

  @Output() callParent = new EventEmitter<any>();

  listar(pagina = 0){
    this.callParent.emit(pagina);
  }
}
