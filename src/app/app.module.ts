import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/main/header/header.component';
import { PostComponent } from './components/main/post/post.component';
import { FollowerComponent } from './components/main/follower/follower.component';




const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "main", component: MainComponent },
  { path: "profile", component: ProfileComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegistrationComponent,
    ProfileComponent,
    LoginComponent,
    HeaderComponent,
    PostComponent,
    FollowerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
