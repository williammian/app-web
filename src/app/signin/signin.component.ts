import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/core/auth/auth.service";
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

  fromUrl: string;
  loginForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.activatedRoute
        .queryParams
        .subscribe(params => this.fromUrl = params['fromUrl']);

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.platformDetectorService.isPlatformBrowser() &&
              this.emailInput.nativeElement.focus();
  }

  login() {
    if(this.loginForm.valid && !this.loginForm.pending) {
      const email = this.loginForm.get('email').value;
      const senha = this.loginForm.get('senha').value;

      this.authService
          .authenticate(email, senha)
          .subscribe(
            () => this.fromUrl
                ? this.router.navigateByUrl(this.fromUrl)
                : this.router.navigate(['home'])
            ,
            err => {
                console.log(err);
                this.loginForm.reset();
                this.platformDetectorService.isPlatformBrowser() &&
                    this.emailInput.nativeElement.focus();

                this.toastrService.error('E-mail ou senha inválidos!');
            }
          );
    }
  }

}
