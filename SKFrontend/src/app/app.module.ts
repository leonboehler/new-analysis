import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { AgbComponent } from './components/agb/agb.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MapComponent } from './components/map/map.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutComponent,
    AgbComponent,
    DataProtectionComponent,
    ToolbarComponent,
    MapComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
