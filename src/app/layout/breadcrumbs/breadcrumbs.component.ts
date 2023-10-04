import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  public home: MenuItem = {
    label: '',
    routerLink: '/main'
  }
  public breadcrumbs: MenuItem[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._router.events.pipe(
      filter((e) => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = [];
      this.formBreadCrumbs(this._activatedRoute.children)
    })
  };

  private formBreadCrumbs(children: ActivatedRoute[], path: string = '') {
    children.forEach((routes: ActivatedRoute) => {
      if(routes.routeConfig && routes.routeConfig.title) {
        path += `/${routes.parent?.routeConfig?.path}`;
        this.breadcrumbs.push({
          label: routes.routeConfig.title as string,
          routerLink: path
        })
      }

      if(routes.children.length) {
        this.formBreadCrumbs(routes.children, path)
      } else {
        if(this.breadcrumbs.length >= 1) {
          this.breadcrumbs.at(-1)!.routerLink = null;
        }
      }
    })
  }
}
