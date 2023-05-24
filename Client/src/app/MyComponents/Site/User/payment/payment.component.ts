import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AMartService } from 'src/app/Shared/a-mart.service';
import { ExternalLibraryService } from './util';
import { Router } from '@angular/router';
import { faFaceSmileWink, faEnvelope, faPhone, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

declare let Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  constructor(public service: AMartService, private razorpayService: ExternalLibraryService, private cd:  ChangeDetectorRef, private route: Router) { }
  showModal=false;
  faFaceSmileWink=faFaceSmileWink;faEnvelope=faEnvelope;faPhone=faPhone;faIndianRupeeSign=faIndianRupeeSign;

  ngOnInit() {
    this.razorpayService.lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js').subscribe();
  }

  RAZORPAY_OPTIONS = {
    "key": this.service.payOrder.razorpayKey,
    "amount": this.service.payOrder.amount,
    "name": this.service.payOrder.name,
    "order_id": this.service.payOrder.orderId,
    "description": this.service.payOrder.description,
    "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    "prefill": {
      "name": this.service.payOrder.name,
      "email": this.service.payOrder.email,
      "contact": this.service.payOrder.phoneNumber,
    },
    "modal": {},
    "theme": {
      "color": "#0096C5"
    }
  };

  public proceed() {
    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();
  }

  public razorPaySuccessHandler(response) {
    // console.log(response);
    this.service.getPaymentComplete(response);
    this.showModal = true;
  }  

}
