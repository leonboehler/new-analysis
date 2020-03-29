import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {AgbComponent} from './components/agb/agb.component';
import {DataProtectionComponent} from './components/data-protection/data-protection.component';
import {SettingsComponent} from './components/settings/settings.component';
import {MapComponent} from './components/map/map.component';
import {AdminMapComponent} from './components/admin-map/admin-map.component';
import {UpdatePasswordComponent} from './components/update-password/update-password.component';
import { LoginComponent } from './components/login/login.component';
import {LocSelectionComponent} from './components/loc-selection/loc-selection.component';
import {LeftPanelComponent} from './components/side-panels/left-panel/left-panel.component';
import { RegisterComponent} from "./components/register/register.component";
import { HomeComponent } from './components/home/home.component';
import {TimeSelectionComponent} from './components/time-selection/time-selection.component';
import {CreateLocationComponent} from './components/create-location/create-location.component';
import {CreateStationComponent} from './components/create-station/create-station.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'agb', component: AgbComponent},
  {path: 'privacy', component: DataProtectionComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'map', component: AdminMapComponent},
  {path: 'login', component: LoginComponent},
  {path: 'leftpanel', component: LeftPanelComponent},
  {path: 'updatePassword', component: UpdatePasswordComponent},
  {path: 'locSelection', component: TimeSelectionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'locCreate', component: CreateLocationComponent},
  {path: 'stationCreate', component: CreateStationComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
