import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadCrumb} from './breadcrumb';
import { distinctUntilChanged, filter } from 'rxjs/operators';
// import { isNullOrUndefined } from 'util';

// https://medium.com/applantic/https-medium-com-applantic-how-to-implement-breadcrumb-navigation-in-angular-and-primeng-52573e49b97a

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  breadcrumbs: any;

  // Build your breadcrumb starting with the root route of your current activated route

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  )
  {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      ).subscribe(() => {
        // console.log('activatedRoute', this.activatedRoute.root);
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });

  }

  ngOnInit() {

  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      // console.log('bc url', url);

      let label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      // console.log('bc label', label);

      // If the route is dynamic route such as ':id'
      // check are we update of create?
      const id = child.snapshot.params['id'];
      if(id !== null && id !== undefined) {
        if (id === '0') {
          label = 'Create';
        }
        else {
          label = 'Update';
        }
      }
      //
      if (label !== null && label !== undefined) {
       
        if (label !== 'home') {
          breadcrumbs.push({label, url});
        }
      } else if((label === null || label === undefined) && url === '') {
        // Home route
        let label = 'home';
        let url = '/';
        breadcrumbs.push({label, url});
      }

      // console.log('crumbs', breadcrumbs)
      return this.buildBreadCrumb(child, url, breadcrumbs);
    }

  }
}
