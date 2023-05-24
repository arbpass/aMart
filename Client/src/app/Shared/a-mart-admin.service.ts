import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class AMartAdminService {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  readonly baseUrl = 'https://localhost:5000/api';
  adminProducts: Product[] = [];
  adminLoggedIn: boolean = false;

  //Methods
  postAddProduct(data: Product): Observable<Product> {
    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
    
    return this.http.post<Product>(this.baseUrl + "/Admin", data, { headers: header });
  }


  postDeleteProduct(data: Number): Observable<Product> {
    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
    
    return this.http.post<Product>(this.baseUrl + "/Admin/Delete", data, { headers: header });
  }


  postUpdateProduct(data: Product): Observable<Product> {
    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
    
    return this.http.post<Product>(this.baseUrl + "/Admin/Update", data, { headers: header });
  }


  getAdmin() {
    let ls = localStorage.getItem('_token');
    let token = JSON.parse(ls).token;

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get(this.baseUrl + "/Admin", { headers: header }).subscribe(
      res => {
        // console.log(res);
        this.adminProducts = res as Product[];
        this.adminLoggedIn = true;
      },
      err => {
        // console.log(err);
        this.router.navigateByUrl('/login');
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

    return this.http.get<Order[]>(this.baseUrl + "/Admin/Orders", { headers: header });
  }
}
