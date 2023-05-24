import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AMartService } from 'src/app/Shared/a-mart.service';
import { Order } from 'src/app/Shared/order.model';
import { Product } from 'src/app/Shared/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  constructor(public service: AMartService, private router: Router, private toastr: ToastrService) { }

  temp: any = [];

  ngOnInit(): void {
    this.service.getOrders().subscribe(
      res=> {
        this.service.orders = res as Order[];
        this.service.loggedIn = true;
        this.service.getHome();
        this.service.orders.forEach(element => {
          this.temp.push(JSON.parse(element.orders));
        });
      },
      err=> {
        console.log(err);
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    )
    
    
  }


}
