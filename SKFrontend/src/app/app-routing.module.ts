import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {AgbComponent} from './components/agb/agb.component';
import {DataProtectionComponent} from './components/data-protection/data-protection.component';
import {SettingsComponent} from './components/settings/settings.component';
import {MapComponent} from './components/map/map.component';

const routes: Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'agb', component: AgbComponent},
  {path: 'privacy', component: DataProtectionComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'map', component: MapComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
