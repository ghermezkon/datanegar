import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import {
  FooterHtmlComponent, HeaderHtmlComponent, BannerHtmlComponent,
  FirstSectionComponent, AppComponent
} from "./main.component";
import { AppRouting } from "./app.routing";
import { MessageService } from "app/shared";
import { HttpClientModule } from "@angular/common/http";
import { GroupArticleService, ArticleService } from "app/admin";

@NgModule({
  declarations: [
    AppComponent, FooterHtmlComponent, HeaderHtmlComponent, BannerHtmlComponent, FirstSectionComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,HttpClientModule, AppRouting
  ],
  providers: [MessageService, GroupArticleService, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
