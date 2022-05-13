import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";
import { ItemService } from "../item.service";

@Component({
  selector: 'app-itens-cad',
  templateUrl: './itens-cad.component.html',
  styleUrls: ['./itens-cad.component.css']
})
export class ItensCadComponent implements OnInit {

  itemForm: FormGroup;
  @ViewChild('tipoSelect') tipoSelect: ElementRef<HTMLInputElement>;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private platformDetectorService: PlatformDetectorService
  ) {

  }

  ngOnInit(): void {
    this.configurarFormulario();

    const id = this.route.snapshot.params['id'];
    if(id) {
      this.carregarItem(id);
    }
  }

  ngAfterViewInit() {
    this.platformDetectorService.isPlatformBrowser() &&
              this.tipoSelect.nativeElement.focus();
  }

  configurarFormulario() {
    this.itemForm = this.formBuilder.group({
      id: [],
      tipo: [ 0 ],
      codigo: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10)
        ]
      ],
      descricao: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
        ]
      ],
      dataCadastro: [ new Date() ],
      ativo: [ true ],
      abc: [ 'A' ],
      preco: [ 0,
        [
          Validators.required
        ]
      ],
    });
  }

  carregarItem(id: number) {
    this.itemService.buscar(id)
      .subscribe(item => {
        this.itemForm.patchValue(item);
      });
  }

  get editando() {
    return Boolean(this.itemForm.get('id').value);
  }

  adicionarItem() {
    this.itemService.adicionar(this.itemForm.value)
      .subscribe(itemAdicionado => {
        this.toastrService.success('Item adicionado com sucesso!');
        this.router.navigate(['/itens', itemAdicionado.id]);
      });
  }

  atualizarItem() {
    this.itemService.atualizar(this.itemForm.value)
      .subscribe(item => {
        this.itemForm.patchValue(item);
        this.toastrService.success('Item alterado com sucesso!');
      });
  }

  salvar() {
    if(this.itemForm.valid && !this.itemForm.pending) {
      if (this.editando) {
        this.atualizarItem();
      } else {
        this.adicionarItem();
      }
    }
  }

  novo() {
    this.itemForm.reset();

    setTimeout(function() {
      this.item = [];
    }.bind(this), 1);

    this.router.navigate(['/itens/novo']);
  }

}
