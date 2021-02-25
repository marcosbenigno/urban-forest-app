import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullPostPage } from './full-post.page';

const routes: Routes = [
  {
    path: '',
    component: FullPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPostPageRoutingModule {}
