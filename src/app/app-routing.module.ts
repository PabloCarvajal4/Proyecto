import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { MenuComponent } from './pages/menu/menu.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProduccionComponent } from './pages/produccion/produccion.component';
import { DistribucionComponent
 } from './pages/distribucion/distribucion.component';
const routes: Routes = [
  /* { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }*/

  { path: '', component:MenuComponent,
    children:[
      {path:'welcome',component:WelcomeComponent},
      {path:'empleados',component:EmpleadosComponent},
      {path:'produccion',component:ProduccionComponent},
      {path:'distribucion',component:DistribucionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
