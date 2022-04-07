import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@mfe/auth';
import { ReactContainerComponent } from './react-component-container.component';
import { WebComponentContainerComponent } from './web-component-container.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('login/Module').then((m) => m.AppModule),
  },
  {
    path: 'flights',
    canActivate: [AuthGuard],
    children: [
      {
        path: '**',
        component: ReactContainerComponent,
        data: {
          loadElement: () => import('flights/Module'),
          rootUrl: '/flights',
        },
      },
    ],
  },
  {
    path: '**',
    component: WebComponentContainerComponent,
    data: {
      loadElement: () => import('dashboard/Module'),
      elementName: 'mfe-dashboard',
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
