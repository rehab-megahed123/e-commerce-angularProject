import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageService, SharedModule } from 'primeng/api';
import { Message, MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '../../core/service/auth.service';
import { IRegister } from '../../core/interfaces/http';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AutoFocusModule } from 'primeng/autofocus';
import { UserDataService } from '../../core/service/user-data.service';
import { NotifecationsService } from '../../core/service/notifecations.service';
@Component({
  selector: 'app-register',
  imports: [
    NgxSpinnerModule,
    MessagesModule,
    ButtonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    ToastModule,
    AutoFocusModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  providers: [MessageService],
})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  rePassword!: FormControl;
  registrationForm!: FormGroup;
  isRegisterd: boolean = false;

  constructor(
    private _authService: AuthService,
    private _notifecationsService: NotifecationsService,
    private _router: Router,
    private _userData:UserDataService
  ) {
    this.initFormControls();
    this.initFormGroupe();
  }

  messages!: Message[];

  initFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.rePassword = new FormControl('', [
      Validators.required,
      this.passwordMatch(this.password),
    ]);
  }

  passwordMatch(pass: AbstractControl): ValidatorFn {
    return (rePass: AbstractControl): null | { [key: string]: boolean } => {
      if (pass.value !== rePass.value || rePass.value === '') {
        return { passNotMatch: true };
      } else return null;
    };
  }

  initFormGroupe(): void {
    this.registrationForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      rePassword: this.rePassword,
    });
  }
  submit() {
    if (this.registrationForm.valid) {
      this.siginUp(this.registrationForm.value);
      this.isRegisterd = true;
    } else {
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).forEach((control) =>
        this.registrationForm.controls[control].markAsDirty()
      );
    }
  }


  siginUp(data: IRegister): void {
    this._authService.register(data).subscribe({
      next: (response) => {
        if (response._id) {
          this._notifecationsService.showSuccess( 'success', 'SuccessRegister');
        }
        const { email, password } = data;
        this._authService.login({ email, password }).subscribe({
          next: (response) => {
            localStorage.setItem('token', response._id);
            this._router.navigate(['home']);
            this._userData.userName.next(response.name);
            localStorage.setItem('username', response.name);
          },
        });
      },
      error: (err) => {
        this._notifecationsService.showError( 'Error', err.error.error);

        // this._notifecationsService.showError('Error', err.error.error);
      },
    });
  }
}
