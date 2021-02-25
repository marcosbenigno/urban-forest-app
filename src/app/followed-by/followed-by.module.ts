import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowedByPageRoutingModule } from './followed-by-routing.module';

import { FollowedByPage } from './followed-by.page';
import { PageHeadingComponent } from '../components/page-heading/page-heading.component';
import { UsersListItemComponent } from '../components/users-list-item/users-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowedByPageRoutingModule
  ],
  declarations: [FollowedByPage, PageHeadingComponent, UsersListItemComponent]
})
export class FollowedByPageModule {}
