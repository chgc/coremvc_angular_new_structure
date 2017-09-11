import { EmptyComponent } from './empty.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashModule } from './dash/dash.module';

export const routes: Routes = [{ path: '**', component: EmptyComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
