import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {User} from "../../../../core/models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);

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
    if (this.registrationForm.invalid) { return; }

      this.authService.register({rol: 'guest', ...this.registrationForm.value} as User).then((credentials: any) => {
        console.log(credentials);
      }). catch((error: any) => {
        console.error(error);
      });
  }
}
