import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { UserService } from "src/app/core/user/user.service";
import * as StackTrace from "stacktrace-js";
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const router = this.injector.get(Router);
    const zone = this.injector.get(NgZone);
    const toastrService = this.injector.get(ToastrService);
    const loadingService = this.injector.get(LoadingService);

    const url = location instanceof PathLocationStrategy
            ? location.path()
            : '';
    console.log(url);

    const message = error.message
          ? error.message :
          error.toString();
    console.log(message);

    const user = userService.getUserDto();
    console.log(user.nome);

    console.error('Ocorreu um erro', error);

    if(error instanceof Error) {
      StackTrace
        .fromError(error)
        .then(stackFrames => {
          const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n');

          console.log(stackAsString);

        });

      zone.run(() => router.navigate(['/error']));

    }else if(error instanceof HttpErrorResponse) {
      let msg: string;
      if(error.status >= 400 && error.status <= 499) {
        msg = 'Ocorreu um erro ao processar a sua solicitação.';

        if (error.status === 403) {
          msg = 'Você não tem permissão para executar esta ação ou token de acesso inválido.';
          zone.run(() => toastrService.warning(msg));
          userService.logout();
          router.navigate(['']);
          return;
        }

        try {
          msg = error.error.message;
        } catch (e) { }

        try {
          msg = error.error[0].mensagemUsuario;
        } catch (e) { }

        zone.run(() => toastrService.warning(msg));
        loadingService.stop();

      }else{
        msg = 'Erro ao processar serviço remoto. Tente novamente.';
        zone.run(() => toastrService.error(msg));
        loadingService.stop();
      }

    }else{
      zone.run(() => router.navigate(['/error']));
    }

  }
}
