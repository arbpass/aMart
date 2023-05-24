import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AMartAdminService } from 'src/app/Shared/a-mart-admin.service';
import { AMartService } from 'src/app/Shared/a-mart.service';
import { Order } from 'src/app/Shared/order.model';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit{
  constructor(public serviceAdmin: AMartAdminService, private router: Router, public serviceUser: AMartService) {  }
  allOrders: any;

  ngOnInit(): void {
    this.serviceAdmin.getOrders().subscribe(
      res=> {
        this.serviceAdmin.adminLoggedIn = true;
        this.allOrders = res as Order[];
        // console.log(this.allOrders)
      },
      err=> {
        console.log(err);
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    )

  }
}
