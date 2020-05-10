import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../../http-options';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

// import { EnvironmentService } from '../../layout/services/environment.service';
// import { AuthService } from '../../security/services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class FilesService {
  private handleError: HandleError;
  private apiUrl: string;
  private postmanUrl: string;
  private localUrl: string;
  // private apiRootEstimate = '/estimating/estimations';
  // private apiRootProject = '/estimating/projects';

  constructor(
    // private env: EnvironmentService,
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    // private authService: AuthService,
    ) {
      // const settings = this.env.getSettings();

      // this.apiUrl = settings.estimating.api.base;
      // this.postmanUrl = settings.estimating.api.pstmn;
      // this.localUrl = settings.estimating.api.local;

      this.handleError = httpErrorHandler.createHandleError( 'FilesService' );
  }



  /** LOCAL GET :: All Files from local mock data */
  getFiles( criteria ) {
    //const getMultipleUrl = `${this.localUrl}files-mock.json`;
    const url = 'assets/files-mock.json';

    return this.http.get<any>( url, httpOptions )
    .pipe(
      catchError( this.handleError( 'getFiles', [] ) )
    );
  }



















}
