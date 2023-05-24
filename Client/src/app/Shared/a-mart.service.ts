import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Order } from './order.model';
import { ToastrService } from 'ngx-toastr';
import { PayOrder } from './pay-order.model';

@Injectable({
  providedIn: 'root'
})
export class AMartService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  readonly baseUrl = 'https://localhost:5000/api';
  products: Product[] = [];
  loggedIn: boolean = false;
  cartList: Array<number>[] = [];
  cartItems: Product[] = [];
  orders: Order[] = [];
  mode: string = "dark";
  modeSideEffect: string = "light";

  //Methods
  postRegisterUser(data: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + "/Authenticate/register", data);
  }

  postLoginUser(data: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + "/Authenticate/login", data);
  }


  getHome() {
    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get(this.baseUrl + "/Home", { headers: header }).subscribe(
      res => {
        // console.log(res);
        this.products = res['allProducts'] as Product[];
        this.cartList = res['allItemId'];
        
        this.loggedIn = true;
      },
      err => {
        console.log(err);
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    );
  }


  addToCart(itemId: number) {
    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post(this.baseUrl + "/Home", itemId, { headers: header }).subscribe(
      res => {
        // console.log("Successfully added " + res);
        this.toastr.success('Item added to cart successfully!', 'Added');
        this.getHome();
      },
      err => {
        console.log(err);
      }
    );
  }


  removeFromCart(itemId: number) {
    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post(this.baseUrl + "/Cart", itemId, { headers: header }).subscribe(
      res => {
        // console.log("Successfully removed " + res);
        this.toastr.warning('Item removed from cart successfully!', 'Removed');
        this.getHome();
      },
      err => {
        console.log(err);
      }
    );
  }


  getCart(): Observable<Product[]> {
    let ls = localStorage.getItem('_token');
    try { JSON.parse(ls).token; } catch (error) { this.router.navigateByUrl("/login"); }
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get<Product[]>(this.baseUrl + "/Cart", { headers: header });
  }



  confirmOrder(orders: string, totalPrice: number) {
    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post(this.baseUrl + "/Order/" + totalPrice, orders, { headers: header }).subscribe(
      res => {
        // console.log(res);
        this.toastr.success('Order confirmed successfully!', 'Ordered');
      },
      err => {
        console.log(err);
      }
    );
  }



  getOrders(): Observable<Order[]> {
    let ls = localStorage.getItem('_token');
    try { JSON.parse(ls).token; } catch (error) { this.router.navigateByUrl("/login"); }
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get<Order[]>(this.baseUrl + "/Order", { headers: header });
  }


  getCategory(category: string): Observable<Product[]> {
    let ls = localStorage.getItem('_token');
    try { JSON.parse(ls).token; } catch (error) { this.router.navigateByUrl("/login"); }
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get<Product[]>(this.baseUrl + "/Home/" + category, { headers: header });
  }




  //payment--------------------------
  payOrder: PayOrder;
  totalPrice: number;

  getPaymentProcess(data: PayOrder): Observable<PayOrder> {
    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post<PayOrder>(this.baseUrl + "/Payment/Process", data, { headers: header });
  }


  getPaymentComplete(data) {
    const send = {
      orderId: data.razorpay_order_id,
      paymentId: data.razorpay_payment_id,
      signature: data.razorpay_signature,
    }

    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post(this.baseUrl + "/Payment/Complete", JSON.stringify(send), { headers: header }).subscribe(
      res => {
        console.log(res);

        let orders = JSON.stringify(this.cartList);
        this.confirmOrder(orders, this.totalPrice);
        this.cartItems = [];

        this.toastr.success('Payment done successfully.', 'Payment Successful!');
        this.router.navigateByUrl('/orders');
      },
      err => {
        // console.log(err);
        this.toastr.error('Something went wrong.', 'Payment Failed!');
      }
    );
  }

}
