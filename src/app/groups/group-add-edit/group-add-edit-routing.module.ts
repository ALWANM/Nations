import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupAddEditComponent } from './group-add-edit.component';

const routes: Routes = [{ path: '', component: GroupAddEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupAddEditRoutingModule { }
