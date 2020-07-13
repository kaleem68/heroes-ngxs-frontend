import { NgModule } from "@angular/core";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from "../material/material.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
     SharedModule,

  ],
  exports: [ToolbarComponent],
  declarations: [ToolbarComponent],

  providers: [],
 
})
export class CoreModule { }
