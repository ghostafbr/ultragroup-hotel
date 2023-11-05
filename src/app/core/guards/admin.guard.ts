import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {tap} from "rxjs";
import {MessageService} from "../services/message.service";

export const adminGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const messageService: MessageService = inject(MessageService);

  return authService.isAdmin$().pipe(
    tap(isAdmin => {
      if (!isAdmin) {
        router.navigate(['guest/']);
        messageService.showError({message: 'Usuario no autorizado'});
      }
    }
  ));
};
