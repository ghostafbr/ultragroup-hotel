import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {User} from "../../../../core/models/user.model";
import Swal from "sweetalert2";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
    gender: ['', Validators.required],
    documentType: ['', Validators.required],
    documentNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactPhone: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.messageService.showLoading();
    this.authService.register({rol: 'guest', ...this.registrationForm.value} as User).then((credentials: any) => {
      const message = `Usuario creado correctamente: ${credentials.user.firstName} ${credentials.user.lastName}`;
      this.messageService.showSuccess(message);
    }).catch((error: any) => {
      this.messageService.showError(error);
    });
  }
}
