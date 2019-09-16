import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { TemplateHeaderComponent } from './components/template-header/template-header.component';

const routes: Routes = [
  {path: '', component: ScheduleListComponent},
  {path: 'layout', component: TemplateHeaderComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
