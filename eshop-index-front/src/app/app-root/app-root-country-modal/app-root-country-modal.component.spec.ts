import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRootCountryModalComponent } from './app-root-country-modal.component';

describe('AppRootCountryModalComponent', () => {
  let component: AppRootCountryModalComponent;
  let fixture: ComponentFixture<AppRootCountryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRootCountryModalComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRootCountryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
