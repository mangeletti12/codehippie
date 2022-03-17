import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AnswersComponent } from './answers/answers.component';
import { BarChartComponent } from './charts/bar-chart.component';
//
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './login/register.component';
import { BuffetComponent } from './buffet/buffet.component';
import { ContactComponent } from './contact/contact.component';
import { CorComponent } from './cors/cor/cor.component';
//
import { CorsListComponent } from './cors/cors-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ElysiumComponent } from './footy/elysium/elysium.component';
import { FileNotFoundComponent } from './404/fileNotFound.component';
import { FilesComponent } from './file-cabinet/files/files.component';
import { FootyComponent } from './footy/footy/footy.component';
import { GridComponent } from './grid/grid.component';
import { IScrollComponent } from './iscroll/iscroll.component';
import { LineChartComponent } from './charts/line-chart.component';
import { ListComponent } from './list/list.component';
import { MoviesComponent } from './movies/movies.component';
import { MusicComponent } from './music/music.component';
import { NgModule } from '@angular/core';
import { P5Component } from './p5/p5.component';
import { ParentComponent } from './practice/parent.component';
import { PermTableComponent } from './perm-table/perm-table.component';
import { PieChartComponent } from './charts/pie-chart.component';
import { QaComponent } from './qa/qa.component';
//
import { ResolverService } from './resolver.service';
import { ResumeComponent } from './resume/resume.component';
import { RxjsComponent } from './rxjs/rxjs.component';
// import { PublicComponent } from './layouts/public.component';
import { SecureComponent } from './layouts/secure.component';
import { SettingsComponent } from './settings/settings.component';
// import { PracticeComponent } from './practice/practice.component';
import { TddComponent } from './practice/tdd.component';
import { TestAlertsComponent } from './test-alerts/test-alerts.component';
import { TrailsComponent } from './trails/trails.component';
// import { CostCodesComponent } from './codes/cost-codes.component';
import { TreeComponent } from './tree/tree.component';
import { TvComponent } from './tv/tv.component';

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
    path: 'tv',
    component: TvComponent,
    data: { breadcrumb: 'TV' },
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
    data: { breadcrumb: null },
    children: [
      {
        path: '',
        component: CorsListComponent,
        // canActivate: [AuthGuard],
        data: { breadcrumb: 'Change Order Request' },
      },
      {
        path: ':id',
        component: CorComponent,
        // canActivate: [AuthGuard],
        data: { breadcrumb: 'Create/Update' },
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
    path: 'footy',
    component: FootyComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Footy',},
    resolve: { comp: ResolverService },
  },
  {
    path: 'elysium',
    component: ElysiumComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Elysium',},
    resolve: { comp: ResolverService },
  },
  {
    path: 'grid',
    component: GridComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Bots',},
    resolve: { comp: ResolverService },
  },
  {
    path: 'rocket',
    component: DashboardComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Rocket',},
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
    component: ParentComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Practice' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'permissions',
    component: PermTableComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'Jedi Powers' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'RxJS Practice' },
    resolve: { comp: ResolverService },
  },
  {
    path: 'tdd',
    component: TddComponent,
    //canActivate: [AuthGuard],
    data: { breadcrumb: 'TDD' },
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

  // Lazy loading
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
  { path: 'library',
    data: { breadcrumb: null },
    loadChildren: () => import('./library/library.module').then(mod => mod.LibraryModule)
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
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
