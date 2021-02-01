import { Component, OnInit } from '@angular/core';
import { LoginEmitService } from '@services/login-emit.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.scss']
})
export class AdminAreaComponent implements OnInit {

  constructor(
    private loginEmitService: LoginEmitService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (!this.loginEmitService.checkCurrentStatusAdmin()) {
      this.router.navigate(['']);
    }

  }
}
