import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AMartService } from 'src/app/Shared/a-mart.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public service: AMartService, private router: Router, private toastr: ToastrService) { }
  faCartPlus=faCartPlus;
  
  ngOnInit(): void {
    try {
      this.service.getHome();
    } catch (error) {
      // console.log(error);
      this.router.navigateByUrl('/login');
    }
  }


  addToCart(item: any) {
    item.amount = 1;

    this.service.cartList.push(item.id);
    this.service.addToCart(item.id);
  }


  categories = {
    "Electronics": "/category/Electronics",
    "Phone & Tablet": "/category/Phone & Tablet",
    "Home & Furniture": "/category/Home & Furniture",
    "Kitchen Appliances": "/category/Kitchen Appliances",
    "Bags & Luggage": "/category/Bags & Luggage",
  }

}
