import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { FollowerComponent } from './components/main/follower/follower.component';
import { HeaderComponent } from './components/main/header/header.component';
import { MainComponent } from './components/main/main.component';
import { PostComponent } from './components/main/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'main', component: MainComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'post', component: PostComponent },
{ path: "register", component: RegistrationComponent },
{ path: 'follower', component: FollowerComponent },
{ path: '**', redirectTo: 'login' }];

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    FollowerComponent,
    MainComponent,
    PostComponent,
    ProfileComponent,
    HeaderComponent
    
        
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload', useHash: true }),
    FormsModule,
    ReactiveFormsModule    
  ],
  exports: [RouterModule],
  providers: [],

})
export class AppRoutingModule { }
