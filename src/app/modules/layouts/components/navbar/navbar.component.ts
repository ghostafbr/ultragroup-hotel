import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router)
  showOptions = false;

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
    this.hideOptions();
  }

  hideOptions() {
    const currentURL = this.router.url;
    this.showOptions = currentURL.includes('admin');
  }

}
