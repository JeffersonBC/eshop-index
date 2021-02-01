import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, Data, ActivatedRoute } from '@angular/router';

import { filter, map, switchMap } from 'rxjs/operators';


const default_title = 'eShop Index';


@Injectable()
export class SEOService {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly titleService: Title,
    private readonly router: Router,
  ) { }

  public init() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      switchMap(route => route.data),
    )
    .subscribe((data: Data) => {
      this.setTitle(data);
    });
  }

  public setTitle(data: Data) {
    let title = data.windowTitle || '';

    if (title) { title += ' | '; }
    title += default_title;
    this.titleService.setTitle(title);
  }

}
