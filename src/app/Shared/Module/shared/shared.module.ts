import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardComponent } from '../../card/card/card.component';

@NgModule({
  declarations: [],
  imports: [
    NgxSpinnerModule,
    MessagesModule,
    ButtonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    CardComponent
  ],
  exports: [
    NgxSpinnerModule,
    MessagesModule,
    ButtonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,

  ],
})
export class SharedModule {}
