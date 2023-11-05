import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {MessageService} from "../../../../core/services/message.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);
  private afs: AngularFirestore = inject(AngularFirestore);
  private router: Router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.messageService.showLoading();
    const {email, password} = this.loginForm.value;
    this.authService.login(email as string, password as string).then(({user}) => {
      if (user) {
        this.afs.collection('users').doc(user.uid).valueChanges().subscribe((user: any) => {
          localStorage.setItem(('userId'), user.uid);

          const message = `Bienvenido ${user.firstName} ${user.lastName}`;
          this.messageService.showSuccess(message);

          if (user.rol === 'guest') {
            this.router.navigate(['/guest']);
          } else if (user.rol === 'admin') {
            this.router.navigate(['/admin']);
          }
        });
      }
    }).catch((error: any) => {
      this.messageService.showError(error);
    });
  }
}
