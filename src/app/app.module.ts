import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { metaReducers, reducers } from './app.state';

// import { A11yModule } from '@angular/cdk/a11y';
import { AboutComponent } from './about/about.component';
import { AlertComponent } from './alert/alert.component';
import { AlertsComponent } from './dashboard/alerts.component';
import { AngularSplitModule } from 'angular-split';
import { AnswersComponent } from './answers/answers.component';
// Main app
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
// Security and interceptors
import { AuthGuard } from './security/auth.guard';
import { AuthenticationService } from './security/auth.service';
import { BarChartComponent } from './charts/bar-chart.component';
import { BreadcrumbComponent } from './globals/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BuffetComponent } from './buffet/buffet.component';
//
import { ChartsModule } from 'ng2-charts';
import { CircleProgressModule } from './widgets/circle-progress/circle-progress.module';
// Claims (may not be used)
import { Claims } from './constants/claims';
import { ContactComponent } from './contact/contact.component';
import { ContactsComponent } from './dashboard/contacts.component';
import { CorComponent } from './cors/cor/cor.component';
import { CorsListComponent } from './cors/cors-list.component';
import { CostCodesComponent } from './codes/cost-codes.component';
import { CountUpModule } from 'ngx-countup';
import { CounterComponent } from './widgets/counter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//
import { DatePipe } from '@angular/common';
// https://material.angular.io/cdk/drag-drop/overview
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EffectsModule } from '@ngrx/effects';
import { ElysiumComponent } from './footy/elysium/elysium.component';
// 404
import { FileNotFoundComponent } from './404/fileNotFound.component';
import { FilesComponent } from './file-cabinet/files/files.component';
import { FootyComponent } from './footy/footy/footy.component';
//
import { GlobalService } from './globals/global.service';
import { GridComponent } from './grid/grid.component';
import { HTTPStatus } from './interceptors/loader.interceptor';
import { HasClaimDirective } from './security/has-claim.directive';
import { HeaderComponent } from './globals/header.component';
import { HelpComponent } from './globals/help/help.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { IScrollComponent } from './iscroll/iscroll.component';
import { IScrollService } from './iscroll/iscroll.service';
// https://www.npmjs.com/package/ngx-infinite-scroll
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
//
// import { NgwWowModule } from 'ngx-wow';
import { InspirationComponent } from './inspiration/inspiration.component';
import { JobComponent } from './resume/job.component';
import { LineChartComponent } from './charts/line-chart.component';
import { ListComponent } from './list/list.component';
import { ListService } from './list/list.service';
import { LoginComponent } from './login/login.component';
// All materials in module
import { MaterialModule } from "./material/material.module";
import { MessageService } from './message.service';
import { ModalComponent } from './modal/modal.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesService } from './movies/movies.service';
import { MusicComponent } from './music/music.component';
import { NavComponent } from './globals/nav.component';
// import { NgChartsModule } from 'ng2-charts';
import { NotificationsComponent } from './globals/notifications/notifications.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { P5Component } from './p5/p5.component';
import { ParentComponent } from './practice/parent.component';
import { PermTableComponent } from './perm-table/perm-table.component';
import { PieChartComponent } from './charts/pie-chart.component';
import { PipesModule } from './pipes/pipes.module';
import { PracticeComponent } from './practice/practice.component';
import { ProfileComponent } from './globals/profile/profile.component';
import { QaComponent } from './qa/qa.component';
// Login/Security
import { RegisterComponent } from './login/register.component';
//
import { ResizableModule } from './resizable/resizable.module';
import { ResumeComponent } from './resume/resume.component';
import { RouterModule } from '@angular/router';
import { RxjsComponent } from './rxjs/rxjs.component';
// Scroll for infinity and beyond
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SearchBarComponent } from './globals/search-bar/search-bar.component';
import { SearchComponent } from './globals/search/search.component';
import { SecureComponent } from './layouts/secure.component';
// Setting for App
import { SettingsComponent } from './settings/settings.component';
import { ShowErrorsComponent } from './validation/show-errors.componet';
// ngrx
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TddComponent } from './practice/tdd.component';
import { TestAlertsComponent } from './test-alerts/test-alerts.component';
import { TrailsComponent } from './trails/trails.component';
import { TreeComponent } from './tree/tree.component';
import { TruncatePipe } from './pipes/truncate.pipe'
import { TvComponent } from './tv/tv.component';
import { TypePipe } from './practice/type.pipe';
import { environment } from '../environments/environment';
import { httpInterceptorProviders } from './interceptors/index';

// npm install firebase @angular/fire --save
// Firebase services + enviorment module
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// pipes


//////
// https://www.npmjs.com/package/ngx-scrollbar
// import { NgScrollbarModule } from 'ngx-scrollbar';


// Layouts, alerts, error handling, and home

////////////////////////////////////////////
// Below will be lazyloaded at some point
////////////////////////////////////////////






@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ShowErrorsComponent,
    SecureComponent,
    NavComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HasClaimDirective,
    BuffetComponent,
    CorsListComponent,
    CorComponent,
    AnswersComponent,
    MoviesComponent,
    TestAlertsComponent,
    ListComponent,
    IScrollComponent,
    SettingsComponent,
    FileNotFoundComponent,
    ModalComponent,
    TvComponent,
    BreadcrumbComponent,
    ProfileComponent,
    NotificationsComponent,
    FilesComponent,
    CostCodesComponent,
    TreeComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    AboutComponent,
    TrailsComponent,
    ResumeComponent,
    SearchBarComponent,
    TypePipe,
    MusicComponent,
    QaComponent,
    HelpComponent,
    SearchComponent,
    InspirationComponent,
    ContactComponent,
    P5Component,
    ParentComponent,
    PermTableComponent,
    PracticeComponent,
    TddComponent,
    DashboardComponent,
    ContactsComponent,
    AlertsComponent,
    CounterComponent,
    FootyComponent,
    GridComponent,
    JobComponent,
    ElysiumComponent,
    RxjsComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    OverlayModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes, { enableTracing: false }), // enable tracing only for debugging routes
    RouterModule,
    HttpClientModule,
    ChartsModule,
    // NgChartsModule,
    ScrollingModule,
    InfiniteScrollModule,
    CountUpModule,
    ResizableModule,
    // A11yModule,
    CircleProgressModule,
    AngularSplitModule,
    PipesModule,

    // Firebase
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // NgRx store (root)
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    HttpErrorHandler,
    AuthenticationService,
    DatePipe,
    MessageService,
    GlobalService,
    MoviesService,
    ListService,
    IScrollService,
    AuthGuard,
    HTTPStatus,
    httpInterceptorProviders,
    Claims,
  ],
  bootstrap: [AppComponent],
  entryComponents:[ModalComponent],
  schemas: [NO_ERRORS_SCHEMA] // what is this?
})
export class AppModule { }
