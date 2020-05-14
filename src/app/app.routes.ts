import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//
//import { PublicComponent } from './layouts/public.component';
import { SecureComponent } from './layouts/secure.component';
//
import { CorsListComponent } from './cors/cors-list.component';
import { CorComponent } from './cors/cor/cor.component';
//
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { BuffetComponent } from './buffet/buffet.component';
//
import { AnswersComponent } from './answers/answers.component';
import { MoviesComponent } from './movies/movies.component';
import { TestAlertsComponent } from './test-alerts/test-alerts.component';
import { ListComponent } from './list/list.component';
import { IScrollComponent } from './iscroll/iscroll.component';
//
import { CompanyComponent } from './company/company.component';
import { SettingsComponent } from './settings/settings.component';
import { FileNotFoundComponent } from './404/fileNotFound.component';

import { FlexComponent } from './flex/flex.component';
import { FilesComponent } from './file-cabinet/files/files.component';
import { CostCodesComponent } from './codes/cost-codes.component';
import { TreeComponent } from './tree/tree.component';
import { LineChartComponent } from './charts/line-chart.component';
import { PieChartComponent } from './charts/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart.component';
//
import { ResolverService } from './resolver.service';
import { AboutComponent } from './about/about.component';

// export const PUBLIC_ROUTES: Routes = [

// ];

//SECURE
export const SECURE_ROUTES: Routes = [
  { path: '',
    pathMatch: 'full',
    component: AboutComponent,
    data: { breadcrumb: 'About' },
  },
  {
    path: 'buffet',
    component: BuffetComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Buffet' },
  },
  {
    path: 'cors',
    data: { breadcrumb: 'Change Order Request' },
    children: [
      {
        path: '',
        component: CorsListComponent,
        // canActivate: [AuthGuard],
        data: { breadcrumb: null },
      },
      {
        path: ':id',
        component: CorComponent,
        // canActivate: [AuthGuard],
        data: { breadcrumb: 'create/update' },
      },
    ]
  },
  {
    path: 'answers',
    component: AnswersComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Answers' },
  },
  {
    path: 'movies',
    component: MoviesComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Movies',},
  },
  {
    path: 'list',
    component: ListComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'List' },
  },
  {
    path: 'infinite-scroll',
    component: IScrollComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Infinite Scroll' },
  },
  {
    path: 'sub',
    redirectTo: '/login',
    data: { breadcrumb: 'Sub' },
  },
  {
    path: 'line-chart',
    component: LineChartComponent,
    data: { breadcrumb: 'Line Chart' },
  },
  {
    path: 'bar-chart',
    component: BarChartComponent,
    data: { breadcrumb: 'Bar Chart' },
  },
  {
    path: 'pie-chart',
    component: PieChartComponent,
    data: { breadcrumb: 'Pie Chart' },
  },
  {
    path: 'test-alerts',
    component: TestAlertsComponent,
    data: { breadcrumb: 'Alert Test' },
  },
  // {
  //   path: 'about',
  //   component: AboutComponent,
  //   data: { breadcrumb: 'About' },
  // },
  {
    path: 'app',
    component: SettingsComponent,
    data: { breadcrumb: 'App Settings' },
  },
  {
    path: 'files',
    component: FilesComponent,
    data: { breadcrumb: 'Files' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'codes',
    component: CostCodesComponent,
    data: { breadcrumb: 'Codes' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'tree',
    component: TreeComponent,
    data: { breadcrumb: 'tree' },
    resolve: { comp: ResolverService },
  },

  //Lazyloading
  { path: 'superheroes',
    data: { breadcrumb: null },
    loadChildren: () => import('./superheroes/superheroes.module').then(mod => mod.SuperheroesModule)
  },
  { path: 'users',
    data: { breadcrumb: null },
    loadChildren: () => import('./users/user.module').then(mod => mod.UserModule)
  },
  { path: 'budgets',
    data: { breadcrumb: null },
    loadChildren: () => import('./budgets/budget.module').then(mod => mod.BudgetModule)
  },
  { path: 'estimates',
    data: { breadcrumb: null },
    loadChildren: () => import('./estimates/estimate.module').then(mod => mod.EstimateModule)
  },
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  // 404
  {
    path: 'error',
    component: FileNotFoundComponent,
    data: { breadcrumb: 'WTF?' },
  },
  {
    path: '**',
    redirectTo: 'error',
  },

];

//
const routes: Routes = [
  //no layout routes
  { path: 'login', component: LoginComponent, data: { search: 'login' } },
  { path: 'register', component: RegisterComponent },

  { path: '', component: SecureComponent, data: { title: 'Secure Views' }, children: SECURE_ROUTES },
  //{ path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
