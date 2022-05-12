import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";
import { Paginator } from "src/app/shared/components/paginator/paginator";
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
    private platformDetectorService: PlatformDetectorService) {}

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

}
