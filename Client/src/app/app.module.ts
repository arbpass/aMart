import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './MyComponents/Auth/login/login.component';
import { RegisterComponent } from './MyComponents/Auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AMartService } from './Shared/a-mart.service';
import { HomeComponent } from './MyComponents/Site/User/home/home.component';
import { CartComponent } from './MyComponents/Site/User/cart/cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderComponent } from './MyComponents/Site/User/order/order.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminHomeComponent } from './MyComponents/Site/Admin/admin-home/admin-home.component';
import { OrderAdminComponent } from './MyComponents/Site/Admin/order-admin/order-admin.component';
import { CategoryComponent } from './MyComponents/Site/User/category/category.component';
import { PaymentComponent } from './MyComponents/Site/User/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    OrderComponent,
    AdminHomeComponent,
    OrderAdminComponent,
    CategoryComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  ],
  providers: [AMartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
