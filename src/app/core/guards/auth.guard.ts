import { CanActivateFn, Router } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {tap} from "rxjs";

export const authGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);

  return authService.isAuth$().pipe(
    tap((isAuth) => {
      if (!isAuth) {
        inject(Router).navigate(['/login']);
      }
    }),
  );
};
