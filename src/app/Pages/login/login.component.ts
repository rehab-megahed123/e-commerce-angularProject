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
import { ILogin, IRegister } from '../../core/interfaces/http';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AutoFocusModule } from 'primeng/autofocus';
@Component({
  selector: 'app-login',
  imports: [
    NgxSpinnerModule,
    MessagesModule,
    SharedModule,
    ButtonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    ToastModule,
    AutoFocusModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _router: Router
  ) {
    this.initFormControls();
    this.initFormGroupe();
  }

  messages!: Message[];

  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
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
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
  submit() {
    if (this.loginForm.valid) {
      this.siginIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }
  show(sevirity: string, summary: string, detail: string) {
    this._messageService.add({
      severity: sevirity,
      summary: summary,
      detail: detail,
    });
  }

  siginIn(data: ILogin): void {
    this._ngxSpinnerService.show();
    this._authService.login(data).subscribe({
      next: (response) => {
        if (response._id) {
          this.show('success', 'success', 'SuccessLogin');
          localStorage.setItem('token', response._id);
        }
        this._ngxSpinnerService.hide();
        this._router.navigate(['home']);
      },
      error: (err) => {
        this.show('error', 'Error', err.error.error);
        this._ngxSpinnerService.hide();

        // this._notifecationsService.showError('Error', err.error.error);
      },
    });
  }
}
