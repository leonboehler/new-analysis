import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { AgbComponent } from './components/agb/agb.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MapComponent } from './components/map/map.component';
import { AdminMapComponent } from './components/admin-map/admin-map.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './components/register/register.component';
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { LocSelectionComponent } from './components/loc-selection/loc-selection.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LeftPanelComponent } from './components/side-panels/left-panel/left-panel.component';
import {MatListModule} from "@angular/material/list";
import { HomeComponent } from './components/home/home.component';
import { RightPanelComponent } from './components/side-panels/right-panel/right-panel.component';
import {MatSelectModule} from '@angular/material/select';
import {TimeSelectionComponent} from './components/time-selection/time-selection.component';
import {HttpClientModule} from '@angular/common/http';
import { CreateLocationComponent } from './components/create-location/create-location.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutComponent,
    AgbComponent,
    DataProtectionComponent,
    ToolbarComponent,
    MapComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    LoginComponent,
    LocSelectionComponent,
    UpdatePasswordComponent,
    LeftPanelComponent,
    HomeComponent,
    RightPanelComponent,
    TimeSelectionComponent,
    CreateLocationComponent,
    AdminMapComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule,
        MatIconModule,
        FlexLayoutModule,
        MatListModule,
        MatSelectModule,
        HttpClientModule,
        MatExpansionModule,
        MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
