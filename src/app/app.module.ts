import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminContentComponent } from './components/admin-content/admin-content.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxAccordionModule, DxButtonModule, DxListModule, DxMenuModule, DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    AdminContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DxButtonModule,
    DxListModule,
    DxTextBoxModule,
    ReactiveFormsModule,
    DxMenuModule,
    DxAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
