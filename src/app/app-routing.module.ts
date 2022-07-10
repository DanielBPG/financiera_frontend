import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestamosComponent } from './prestamos/prestamos.component';

const routes: Routes = [{ path: '', component: PrestamosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
