import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { AgbComponent } from './components/agb/agb.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    FooterComponent,
    AboutComponent,
    AgbComponent,
    DataProtectionComponent
    TestComponent,
    ToolbarComponent
    TestComponent,
    MapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
