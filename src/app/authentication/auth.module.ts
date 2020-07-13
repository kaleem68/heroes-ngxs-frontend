import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    { path: '', pathMatch: 'full', component: LoginComponent }
  ];
  
  @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
    
      MaterialModule,
      RouterModule.forChild(routes)
    ],
    exports: [LoginComponent], //why export?
    declarations: [LoginComponent],

    // providers: [AuthService] // AuthService should be provided inside app.store.module because auth.state.ts uses the AuthService which is definded inside app.store.module
    providers: []

  })
  export class AuthModule {}
  