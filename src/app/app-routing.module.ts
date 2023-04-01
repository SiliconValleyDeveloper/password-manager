import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { SideListComponent } from './side-list/side-list.component';




const routes: Routes = [

  {path: '', component:LoginComponent},
  {path: 'site-list', component: SideListComponent},
  {path: 'password-list', component: PasswordListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
