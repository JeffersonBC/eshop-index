import { Component, Input, ViewChild } from '@angular/core';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { DomSanitizer } from '@angular/platform-browser';
import { GameMedia } from '@models';

@Component({
  selector: 'app-media-carousel',
  templateUrl: './media-carousel.component.html',
  styleUrls: ['./media-carousel.component.scss']
})
export class MediaCarouselComponent {

  @Input() emptyMessage = 'There are no images or videos for this game yet.';
  @ViewChild('swiperContainer', { read: SwiperDirective }) directiveRef: SwiperDirective;

  index = 0;

  private _media: GameMedia[];
  get media(): GameMedia[] { return this._media; }
  @Input() set media(media: GameMedia[]) {
    this._media = media;

    if (this.media) {
      for (const m of this.media) {
        if (m.media_type === 'YTB') {
          m.url = this.sanitizer
            .bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + m.url);
        }
      }
    }

    if (this.directiveRef) {
      this.index = 0;
      this.directiveRef.update();
    }
  }

  public readonly config: SwiperConfigInterface = {
    autoplay: false,
    loop: false,
    centeredSlides: true,
    speed: 900,
    threshold: 10,
    navigation: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      hideOnClick: false,
      bulletActiveClass: 'swiper-pagination-bullet-light',
    },
  };


  constructor(
    public sanitizer: DomSanitizer,
  ) { }

}
