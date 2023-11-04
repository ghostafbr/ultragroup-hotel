import { CanActivateFn, Router } from '@angular/router';

/*import { inject } from '@angular/core';
import {TokenService} from "@services/token.service";*/

export const authGuard: CanActivateFn = () => {
  /*const isValidToken = inject(TokenService).isValidRefreshToken();*/
  /*if (!isValidToken) {
    inject(Router).navigate(['/login']);
    return false;
  }*/
  return true;
};
