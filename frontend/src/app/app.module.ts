import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './ui/home/home.component';
import { GatewayComponent } from './ui/gateway/gateway.component';
import { SearchComponent } from './ui/search/search.component';
import { DevicesAddComponent } from './ui/devices-add/devices-add.component';
import { DevicesDelComponent } from './ui/devices-del/devices-del.component';
import { GatewaysComponent } from './ui/gateways/gateways.component';
import { ErrorComponent } from './ui/error/error.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    GatewayComponent,
    SearchComponent,
    DevicesAddComponent,
    DevicesDelComponent,
    GatewaysComponent,
    ErrorComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
