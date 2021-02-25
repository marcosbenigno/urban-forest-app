import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrendingPageRoutingModule } from './trending-routing.module';

import { TrendingPage } from './trending.page';
import { PageHeadingComponent } from '../components/page-heading/page-heading.component';
import { TrendingPostComponent } from '../components/trending-post/trending-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrendingPageRoutingModule
  ],
  declarations: [TrendingPage, PageHeadingComponent, TrendingPostComponent]
})
export class TrendingPageModule {}

