import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routes';
//
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
//All materials in module
import { MaterialModule } from "./material/material.module";
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

//https://material.angular.io/cdk/drag-drop/overview
import { DragDropModule } from '@angular/cdk/drag-drop';
//Scroll for infinity and beyond
import { ScrollingModule } from '@angular/cdk/scrolling';
//////
//https://www.npmjs.com/package/ngx-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';
//https://www.npmjs.com/package/ngx-infinite-scroll
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//Main app
import { AppComponent } from './app.component';
//Security and interceptors
import { AuthGuard } from './security/auth.guard';
import { httpInterceptorProviders } from './interceptors/index';
import { HTTPStatus } from './interceptors/loader.interceptor';
//Claims (may not be used)
import { Claims } from './constants/claims';
//
import { GlobalService } from './globals/global.service';
import { NavComponent } from './globals/nav.component';
import { HeaderComponent } from './globals/header.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
// Login/Security
import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './security/auth.service';
import { HasClaimDirective } from './security/has-claim.directive';
// Layouts, alerts, error handling, and home

import { SecureComponent } from './layouts/secure.component';
import { AlertComponent } from './alert/alert.component';
import { ShowErrorsComponent } from './validation/show-errors.componet';
import { BuffetComponent } from './buffet/buffet.component';
// 404
import { FileNotFoundComponent } from './404/fileNotFound.component';
// Setting for App
import { SettingsComponent } from './settings/settings.component';
// npm install firebase @angular/fire --save
// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

////////////////////////////////////////////
// Below will be lazyloaded at some point
////////////////////////////////////////////

import { RfiComponent } from './rfi/rfi.component';
import { CorsListComponent } from './cors/cors-list.component';
import { CorComponent } from './cors/cor/cor.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AnswersComponent } from './answers/answers.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesService } from './movies/movies.service';
import { TestAlertsComponent } from './test-alerts/test-alerts.component';
import { ListComponent } from './list/list.component';
import { ListService } from './list/list.service';
import { IScrollComponent } from './iscroll/iscroll.component';
import { IScrollService} from './iscroll/iscroll.service';

import { FlexComponent } from './flex/flex.component';
import { environment } from '../environments/environment';
import { BreadcrumbComponent } from './globals/breadcrumb/breadcrumb.component';
import { ProfileComponent } from './globals/profile/profile.component';
import { NotificationsComponent } from './globals/notifications/notifications.component';

import { FilesComponent } from './file-cabinet/files/files.component';
import { CostCodesComponent } from './codes/cost-codes.component';
import { TreeComponent } from './tree/tree.component';
//
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './charts/line-chart.component';
import { BarChartComponent } from './charts/bar-chart.component';
import { PieChartComponent } from './charts/pie-chart.component';
import { AboutComponent } from './about/about.component';
import { TrailsComponent } from './trails/trails.component';
import { ResumeComponent } from './resume/resume.component';


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
    RfiComponent,
    CalendarComponent,
    AnswersComponent,
    MoviesComponent,
    TestAlertsComponent,
    ListComponent,
    IScrollComponent,
    SettingsComponent,
    FileNotFoundComponent,
    MatConfirmDialogComponent,
    FlexComponent,
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
    HttpClientModule,
    ChartsModule,
    ScrollingModule,
    NgScrollbarModule,
    InfiniteScrollModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
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
  entryComponents:[MatConfirmDialogComponent]
})
export class AppModule { }
