import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
      localStorage.clear();
    });
  }

}
