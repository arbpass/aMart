import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/Auth/login/login.component';
import { RegisterComponent } from './MyComponents/Auth/register/register.component';
import { HomeComponent } from './MyComponents/Site/User/home/home.component';
import { CartComponent } from './MyComponents/Site/User/cart/cart.component';
import { OrderComponent } from './MyComponents/Site/User/order/order.component';
import { AdminHomeComponent } from './MyComponents/Site/Admin/admin-home/admin-home.component';
import { OrderAdminComponent } from './MyComponents/Site/Admin/order-admin/order-admin.component';
import { CategoryComponent } from './MyComponents/Site/User/category/category.component';
import { PaymentComponent } from './MyComponents/Site/User/payment/payment.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', component: HomeComponent},
  { path: 'category/:category', component: CategoryComponent},
  { path: 'cart', component: CartComponent},
  { path: 'orders', component: OrderComponent},
  { path: 'admin', component: AdminHomeComponent},
  { path: 'adminOrders', component: OrderAdminComponent},
  { path: 'payment', component: PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
