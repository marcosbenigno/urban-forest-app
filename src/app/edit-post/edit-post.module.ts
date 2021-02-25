import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPostPageRoutingModule } from './edit-post-routing.module';

import { EditPostPage } from './edit-post.page';
import { PageHeadingComponent } from '../components/page-heading/page-heading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPostPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditPostPage, PageHeadingComponent]
})
export class EditPostPageModule {}
