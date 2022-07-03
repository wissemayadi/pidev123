import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-admin-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
{path:'dashboard',component:UserDashboardComponent},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'profile',component:DashboardUserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
