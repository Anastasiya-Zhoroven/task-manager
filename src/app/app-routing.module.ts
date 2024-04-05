import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './forms/registration-form/registration-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'projects/:id/tasks', component: TasksListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UsersListComponent },
  { path: '', component: ProjectsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
