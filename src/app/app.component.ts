import {Component, inject} from '@angular/core';
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'UltraGroup Reservation App';

  private authService: AuthService = inject(AuthService);

  constructor() {
    this.authService.initAuthListener();
  }

}
