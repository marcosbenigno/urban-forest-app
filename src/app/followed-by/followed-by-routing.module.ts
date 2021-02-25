import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowedByPage } from './followed-by.page';

const routes: Routes = [
  {
    path: '',
    component: FollowedByPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowedByPageRoutingModule {}
