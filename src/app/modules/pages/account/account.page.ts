import { Component, OnInit } from '@angular/core';
import * as localizedStrings from '../../core/consts/localized-strings.const';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  localizedStrings = localizedStrings;
  constructor() { }

  ngOnInit() {
  }

}
