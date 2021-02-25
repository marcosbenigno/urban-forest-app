import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowingPageRoutingModule } from './following-routing.module';

import { FollowingPage } from './following.page';
import { UsersListItemComponent } from '../components/users-list-item/users-list-item.component';
import { PageHeadingComponent } from '../components/page-heading/page-heading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowingPageRoutingModule
  ],
  declarations: [FollowingPage, UsersListItemComponent, PageHeadingComponent]
})
export class FollowingPageModule {}
