import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from 'ngx-toastr';
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";
import { Paginator } from "src/app/shared/components/paginator/paginator";
import { ConfirmaExclusaoComponent } from './../../shared/components/confirma-exclusao/confirma-exclusao.component';
import { Item } from "../item";
import { ItemFiltro } from "../item-filtro";
import { ItemService } from './../item.service';

@Component({
  selector: 'app-itens-list',
  templateUrl: './itens-list.component.html',
  styleUrls: ['./itens-list.component.css']
})
export class ItensListComponent implements OnInit {

  @ViewChild('codigoDescricaoInput') codigoDescricaoInput: ElementRef<HTMLInputElement>;

  filtro = new ItemFiltro();
  itens: Item[] = [];
  paginator = new Paginator();

  constructor(
    private itemService: ItemService,
    private platformDetectorService: PlatformDetectorService,
    private toastrService: ToastrService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.listar();
  }

  ngAfterViewInit() {
    this.platformDetectorService.isPlatformBrowser() &&
              this.codigoDescricaoInput.nativeElement.focus();
  }

  listar(pagina = 0) {
    this.filtro.page = pagina;

    this.itemService
        .listar(this.filtro)
        .subscribe(page => {
          this.itens = page.content;
          this.paginator.setPage(page);
        });
  }

  confirmaExclusao(item: Item) {
    const dialogConfirmaExclusao = this.modalService.open(ConfirmaExclusaoComponent);
    dialogConfirmaExclusao.componentInstance.obj = item;
    dialogConfirmaExclusao.componentInstance.msg = 'Confirma a exclusão do item ' + item.codigo + ' - ' + item.descricao + ' ?';
    dialogConfirmaExclusao.result.then(
      (obj: any) => {
        this.excluir(obj.id);
      },
      (reason: any) => { }
    );
  }

  excluir(id: number) {
    this.itemService
        .excluir(id)
        .subscribe(() => {
          this.toastrService.success('Item excluído com sucesso!');
          this.listar(this.paginator.number);
        });
  }

}
