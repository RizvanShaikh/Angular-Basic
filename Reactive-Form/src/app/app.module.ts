import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReactiveFormComponent } from "./reactive-form/reactive-form.component";
import { PhoneMaskDirective } from "./phone-mask.directive";
import { NavComponent } from "./nav/nav.component";

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
    PhoneMaskDirective,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [PhoneMaskDirective],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
