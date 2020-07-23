import { Component, OnInit } from '@angular/core';
import {ErrorService} from "../../core/services/error.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorService.handleError('auth/invalid-verification-code');
  }

}
