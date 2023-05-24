import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AMartService } from 'src/app/Shared/a-mart.service';
import { Product } from 'src/app/Shared/product.model';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PayOrder } from 'src/app/Shared/pay-order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(public service: AMartService, private router: Router, private toastr: ToastrService, private fb: FormBuilder, private route: Router) { }
  faShoppingBag = faShoppingBag;

  localCartList: Product[] = [];
  userData: any;

  ngOnInit(): void {
    this.service.getCart().subscribe(
      res => {
        // console.log(res)
        this.service.cartItems = res['allCartProducts'] as Product[];
        this.userData = res['user'];
        this.service.loggedIn = true;
        this.service.getHome();
        this.arrangeCartList();
        
        this.payRequest();
      },
      err => {
        // console.log(err);
        this.router.navigateByUrl('/login');
      }
    )
  }

  totalPrice() {
    let total = 0;
    for (var item of this.service.cartItems) {
      total = total + item.price;
    }
    return total;
  }


  arrangeCartList() {
    for (let ele1 of this.service.cartItems) {
      let exists = false;
      if (this.localCartList.length == 0) { ele1.amount = 1; this.localCartList.push(ele1); continue; }

      for (let ele2 of this.localCartList) {
        if (ele1.id == ele2.id) {
          if (Number.isNaN(ele2.amount)) ele2.amount = 0;
          ele2.amount++;
          exists = false;
          break;
        }
        else exists = true;
      }
      if (exists) { ele1.amount = 1; this.localCartList.push(ele1); }
    }
  }


  increaseInCart(item: any) {
    item.amount++;
    this.service.cartItems.push(item);
    this.service.addToCart(item.id);
  }

  decreaseInCart(item: any) {
    item.amount--;
    let index = this.service.cartItems.findIndex(ele => ele == item);
    this.service.cartItems.splice(index, 1);
    this.service.removeFromCart(item.id);

    if (item.amount == 0) {
      let indexCart = this.localCartList.findIndex(ele => ele == item);
      this.localCartList.splice(indexCart, 1);
    }

    // console.log(this.localCartList);
  }


  confirmOrder() {
    this.service.getPaymentProcess(this.payRequestForm.value).subscribe(
      res => {
        // console.log(res);
        this.service.payOrder = res as PayOrder;
        this.route.navigateByUrl('/payment');
        this.service.totalPrice = this.totalPrice();
        // let orders = JSON.stringify(this.service.cartList);
        // this.service.confirmOrder(orders, this.totalPrice());

        // this.service.cartItems = this.localCartList = [];
      },
      err => {
        console.log(err);
      }
    )
  }


  //payment---------------------------
  payRequestForm: FormGroup;

  payRequest() {
    this.payRequestForm = this.fb.group({
      Name: [this.userData.userName],
      Email: [this.userData.email],
      PhoneNumber: [this.userData.phoneNumber],
      Address: [''],
      Amount: [this.totalPrice()],
    })
  }


  

}



