import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { delay, catchError } from 'rxjs/operators';
import { httpOptions } from '../../http-options';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
// import { EnvironmentService } from '../../layout/services/environment.service';
// import { AuthService } from '../../security/services/auth/auth.service';
import { Subject, Observable, forkJoin, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private handleError: HandleError;
  private apiUrl: string;
  private postmanUrl: string;
  private localUrl: string;
  private apiRootEstimate = '/estimating/estimations';
  private apiRootProject = '/estimating/projects';
  private apiRootCostCode = '/estimating/costcodes';

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
      // this.handleError = httpErrorHandler.createHandleError( 'UploadService' );
  }
  //
  /*
  public uploadStream(files: any): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    const status = {};
    const url = 'documents/documentset';
    // console.log("-- at service");

    files.forEach(file => {
      // create a new multipart-form for every file
      // const formData: FormData = new FormData();
      // formData.append('file', file, file.name);
      const getMultipleUrl = `${this.apiUrl}${this.apiRootProject}`;

      // If we want to get notified about the download/upload progress
      // we need to pass { reportProgress: true } to the HttpRequest object.
      const req = new HttpRequest('POST', getMultipleUrl, file, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      const startTime = new Date().getTime();

      this.http.request(req).subscribe(event => {

        // Check upload progess
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage
          const percentDone = Math.round((100 * event.loaded) / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.FileName] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
  */

  // Fake request for testing
  makeFakeRequest(value: string, delayDuration: number) {
    // simulate http request
    return of(`Complete: ${value}`).pipe(
      delay(delayDuration)
    );
  }


}
