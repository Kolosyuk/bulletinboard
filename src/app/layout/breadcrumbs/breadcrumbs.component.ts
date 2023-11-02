import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnDestroy {
  public home: MenuItem = {
    label: '',
    routerLink: '/main'
  }
  public breadcrumbs: MenuItem[];
  private destroy$ = new Subject();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._router.events.pipe(
      takeUntil(this.destroy$),
      filter((e) => e instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.breadcrumbs = [];
        this.formBreadCrumbs(this._activatedRoute.children);
      }
    })
  };

  ngOnDestroy(): void {
    this.destroy$.next('stop');
    this.destroy$.complete();
  };
  
  private formBreadCrumbs(children: ActivatedRoute[], path: string = '') {
    children.forEach((routes: ActivatedRoute) => {
      if(routes.routeConfig && routes.routeConfig.title) {
        const id: string = routes.snapshot.params['id'];        
        path += `/${routes.parent?.routeConfig?.path}`;
        if(id) {
          path += `/${id}`;
        };
        this.breadcrumbs.push({
          label: routes.routeConfig.title as string,
          routerLink: path
        });
      };

      if(routes.children.length) {
        this.formBreadCrumbs(routes.children, path)
      } else {
        if(this.breadcrumbs.length >= 1) {
          this.breadcrumbs.at(-1)!.routerLink = null;
        }
      };
    });
  };
};
