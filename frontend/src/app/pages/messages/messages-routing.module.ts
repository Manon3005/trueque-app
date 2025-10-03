import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesPage } from './messages.page';
import { MessageThreadPage } from './message-thread/message-thread.page';

const routes: Routes = [
  {
    path: '',
    component: MessagesPage
  },
  {
    path: ':id',
    component: MessageThreadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesPageRoutingModule {}
