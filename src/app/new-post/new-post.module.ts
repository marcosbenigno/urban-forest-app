import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPostPageRoutingModule } from './new-post-routing.module';

import { NewPostPage } from './new-post.page';
import { PageHeadingComponent } from '../components/page-heading/page-heading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPostPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewPostPage, PageHeadingComponent]
})
export class NewPostPageModule {}
