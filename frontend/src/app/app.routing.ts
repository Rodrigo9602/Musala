import { ModuleWithProviders } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import { HomeComponent } from "./ui/home/home.component";
import { GatewayComponent } from "./ui/gateway/gateway.component";
import { GatewaysComponent } from "./ui/gateways/gateways.component";
import { DevicesAddComponent } from "./ui/devices-add/devices-add.component";
import { DevicesDelComponent } from "./ui/devices-del/devices-del.component";
import { SearchComponent } from "./ui/search/search.component";
import { ErrorComponent } from "./ui/error/error.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'add-gateway', component: GatewayComponent},
    {path:'get-gateways', component: GatewaysComponent},
    {path: 'search', component: SearchComponent},
    {path: 'add-device/:serial', component: DevicesAddComponent},
    {path: 'del-device/:serial', component: DevicesDelComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);