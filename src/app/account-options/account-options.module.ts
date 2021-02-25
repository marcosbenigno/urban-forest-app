import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountOptionsPageRoutingModule } from './account-options-routing.module';

import { AccountOptionsPage } from './account-options.page';
import { PageHeadingComponent } from '../components/page-heading/page-heading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountOptionsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AccountOptionsPage, PageHeadingComponent]
})
export class AccountOptionsPageModule {}
