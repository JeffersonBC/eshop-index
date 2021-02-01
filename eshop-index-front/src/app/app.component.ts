import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { SEOService } from '@services/seo.service';
import { AdsenseService } from '@services/adsense.service';


@Component({
  // tslint:disable-next-line
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = 'eshop-index-frontend';

  constructor(
    private readonly adService: AdsenseService,
    private readonly angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private readonly seoService: SEOService,
  ) { }

  ngOnInit() {
    this.angulartics2GoogleAnalytics.startTracking();
    this.seoService.init();
  }
}
