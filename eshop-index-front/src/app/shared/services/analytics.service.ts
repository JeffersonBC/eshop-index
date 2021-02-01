import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

import { environment } from '@env/environment';


// @ts-ignore
declare var analyticsTrackingId: any;
declare var createAnalytics: () => void;

@Injectable()
export class AnalyticsService {

  constructor(
    private readonly angulartics2: Angulartics2,
  ) {
    analyticsTrackingId = environment.googleAnalytics.trackingID;
    createAnalytics();
  }

  trackEvent(_action: string, _category: string, _label?: string) {
    const event = {
      action: _action,
      properties: {
        category: _category,
      },
    };

    if (_label) {
      event['properties']['label'] = _label;
    }

    this.angulartics2.eventTrack.next(event);
  }

}
