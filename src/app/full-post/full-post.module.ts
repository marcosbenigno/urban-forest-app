import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullPostPageRoutingModule } from './full-post-routing.module';

import { FullPostPage } from './full-post.page';
import { PageHeadingComponent } from '../components/page-heading/page-heading.component';
import { PostComponent } from '../components/post/post.component';
import { CommentItemComponent } from '../components/comment-item/comment-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullPostPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FullPostPage, PageHeadingComponent, PostComponent, CommentItemComponent]
})
export class FullPostPageModule {}
