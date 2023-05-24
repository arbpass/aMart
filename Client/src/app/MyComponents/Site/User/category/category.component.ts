import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AMartService } from 'src/app/Shared/a-mart.service';
import { Product } from 'src/app/Shared/product.model';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  constructor(private route: ActivatedRoute, public service: AMartService, private router: Router) {  }
  category: string = '';
  localProducts: Product[] = [];
  faCartPlus=faCartPlus;

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.service.getCategory(this.category).subscribe(
      res=> {
        // console.log(res);
        this.localProducts = res as Product[];
        this.service.loggedIn = true;
        this.service.getHome();
      },
      err=> {
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    ) 
  }


  addToCart(item: any) {
    item.amount = 1;

    this.service.cartList.push(item.id);
    this.service.addToCart(item.id);
  }


  onClickCategory()
  {
    this.category = this.route.snapshot.paramMap.get('category');
    this.service.getCategory(this.category).subscribe(
      res=> {
        // console.log(res);
        this.localProducts = res as Product[];
        this.service.loggedIn = true;
        this.service.getHome();
      },
      err=> {
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    ) 
  }


  categories = {
    "Electronics": "/category/Electronics",
    "Phone & Tablet": "/category/Phone & Tablet",
    "Home & Furniture": "/category/Home & Furniture",
    "Kitchen Appliances": "/category/Kitchen Appliances",
    "Bags & Luggage": "/category/Bags & Luggage",
  }

}
