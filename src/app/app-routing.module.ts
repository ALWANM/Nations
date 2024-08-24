import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) }, 
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'addEditUser', loadChildren: () => import('./users/add-edit-user/add-edit-user.module').then(m => m.AddEditUserModule) },
  { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) },
  { path: 'groupAddEdit', loadChildren: () => import('./groups/group-add-edit/group-add-edit.module').then(m => m.GroupAddEditModule) },
  { path: '**', redirectTo: '/users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
