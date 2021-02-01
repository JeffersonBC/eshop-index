import { Injectable } from '@angular/core';
import { environment } from '@env/environment';


declare var startAdSense: (adSenseTrackingId) => void;

@Injectable()
export class AdsenseService {

  constructor() {
    // startAdSense(environment.googleAdSense.trackingID);
  }
}
