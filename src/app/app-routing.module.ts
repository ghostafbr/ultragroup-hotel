import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/layouts/admin-layout/admin-layout.module').then((m) => m.AdminLayoutModule),
  },
  {
    path: 'guest',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/layouts/guest-layout/guest-layout.module').then((m) => m.GuestLayoutModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
