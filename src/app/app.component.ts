import {Component, Inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppConfig} from "./config/app-config.interface";
import * as config from '../assets/app.config.json';
import {APP_CONFIG_TOKEN} from "./config/app-config.token";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'env-conf2';

  constructor(
    @Inject(APP_CONFIG_TOKEN) private appConfig: AppConfig
  ) {
    console.log(this.appConfig);
  }

  ngOnInit(): void {
    let configJson = config as AppConfig;
    console.log(configJson.k1);
  }

}
