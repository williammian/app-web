import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router) {

    route.params.subscribe(val => {
      this.init();
    });
  }

  init() {
    let codigoDescricao = this.route.snapshot.queryParams['codigoDescricao'];
    let page = this.route.snapshot.queryParams['page'];
    let size = this.route.snapshot.queryParams['size'];

    if(codigoDescricao === undefined || codigoDescricao === null) {
      codigoDescricao = '';
    }
    this.filtro.codigoDescricao = codigoDescricao;

    if(page === undefined || page === null) {
      page = 0;
    }
    this.filtro.page = page;

    if(size === undefined || size === null) {
      size = 10;
    }
    this.filtro.size = size;

    this.listar(page);
  }

  ngOnInit(): void {

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

          this.router.navigate([], {
            queryParams: {
              codigoDescricao: this.filtro.codigoDescricao,
              size: this.filtro.size,
              page: this.filtro.page
            }
          });
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
