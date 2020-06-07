import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PublicComponent } from './layouts/public.component';
import { SecureComponent } from './layouts/secure.component';
//
import { CorsListComponent } from './cors/cors-list.component';
import { CorComponent } from './cors/cor/cor.component';
//
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './login/register.component';
import { BuffetComponent } from './buffet/buffet.component';
import { AnswersComponent } from './answers/answers.component';
import { MoviesComponent } from './movies/movies.component';
import { TestAlertsComponent } from './test-alerts/test-alerts.component';
import { ListComponent } from './list/list.component';
import { IScrollComponent } from './iscroll/iscroll.component';
import { SettingsComponent } from './settings/settings.component';
import { FileNotFoundComponent } from './404/fileNotFound.component';
import { FilesComponent } from './file-cabinet/files/files.component';
// import { CostCodesComponent } from './codes/cost-codes.component';
import { TreeComponent } from './tree/tree.component';
import { LineChartComponent } from './charts/line-chart.component';
import { PieChartComponent } from './charts/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart.component';
//
import { ResolverService } from './resolver.service';
import { AboutComponent } from './about/about.component';
import { TrailsComponent } from './trails/trails.component';
import { ResumeComponent } from './resume/resume.component';
import { MusicComponent } from './music/music.component';
import { QaComponent } from './qa/qa.component';
import { ContactComponent } from './contact/contact.component';
import { P5Component } from './p5/p5.component';
import { PracticeComponent } from './practice/practice.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// export const PUBLIC_ROUTES: Routes = [

// ];

//SECURE
export const SECURE_ROUTES: Routes = [
  { path: '',
    pathMatch: 'full',
    component: AboutComponent,
    data: { breadcrumb: 'About' },
    resolve: { comp: ResolverService },
  },
  { path: 'about', redirectTo: '', pathMatch: 'full' },
  // {
  //   path: 'about',
  //   component: AboutComponent,
  //   //canActivate: [AuthGuard],
  //   data: { breadcrumb: 'About' },
  // },
  {
    path: 'buffet',
    component: BuffetComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Buffet' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'resume',
    component: ResumeComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Resume' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'contact',
    component: ContactComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Contact' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'trails',
    component: TrailsComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Happy Trails' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'qa',
    component: QaComponent,
    data: { breadcrumb: 'Q & A' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'music',
    component: MusicComponent,
    data: { breadcrumb: 'Music' },
    resolve: { comp: ResolverService },
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
    resolve: { comp: ResolverService },
  },
  {
    path: 'movies',
    component: MoviesComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Movies',},
    resolve: { comp: ResolverService },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Dashboard',},
    resolve: { comp: ResolverService },
  },
  {
    path: 'list',
    component: ListComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'List' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'cards',
    component: IScrollComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Cards' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'p5',
    component: P5Component,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'p5*js' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'practice',
    component: PracticeComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Practice' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'line-chart',
    component: LineChartComponent,
    data: { breadcrumb: 'Line Chart' },
    resolve: { comp: ResolverService },
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
    resolve: { comp: ResolverService },
  },
  {
    path: 'test-alerts',
    component: TestAlertsComponent,
    data: { breadcrumb: 'Alert Test' },
    resolve: { comp: ResolverService },
  },
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
    resolve: { comp: ResolverService },
  },
  {
    path: '**',
    redirectTo: 'error',
  },

];

//
const routes: Routes = [
  //no layout routes
  // { path: 'login', component: LoginComponent, data: { search: 'login' } },
  // { path: 'register', component: RegisterComponent },

  { path: '', component: SecureComponent, data: { title: 'Secure Views' }, children: SECURE_ROUTES },
  //{ path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
