import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagPageRoutingModule } from './tag-routing.module';

import { TagPage } from './tag.page';
import { PageHeadingComponent } from '../components/page-heading/page-heading.component';
import { PostComponent } from '../components/post/post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagPageRoutingModule
  ],
  declarations: [TagPage, PageHeadingComponent, PostComponent]
})
export class TagPageModule {}
