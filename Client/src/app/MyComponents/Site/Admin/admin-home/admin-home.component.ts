import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AMartAdminService } from 'src/app/Shared/a-mart-admin.service';
import { AMartService } from 'src/app/Shared/a-mart.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor(public service: AMartAdminService, public serviceUser: AMartService, private router: Router, private toastr: ToastrService, private fb: FormBuilder) { }
  productForm: FormGroup;
  editForm: FormGroup;

  ngOnInit(): void {
    try {
      this.service.getAdmin();
      this.addProductForm();
      this.editProductForm();
    } catch (error) {
      // console.log(error);
      this.router.navigateByUrl('/login');
    }
  }

  addProductForm() {
    this.productForm = this.fb.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Image: ['', Validators.required],
      Details: ['', Validators.required],
      Category: ['', Validators.required],
      Stock: ['', Validators.required],
    })
  }

  editProductForm() {
    this.editForm = this.fb.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Image: ['', Validators.required],
      Details: ['', Validators.required],
      Category: ['', Validators.required],
      Stock: ['', Validators.required],
    })
  }


  onSubmit() {
    this.service.postAddProduct(this.productForm.value).subscribe(
      res => {
        // console.log(res);
        this.productForm.reset();
        this.service.getAdmin();
        this.toastr.success('Product will be now shown to the customers.', 'Added Succesfully!');
      },
      err => {
        console.log(err);
        this.toastr.error('There is an issue while adding the product.', 'Something went wrong!');
      }
    )
  }


  onDelete(productId: Number) {
    if (confirm("Are you sure to delete this product?") == true) {
      this.service.postDeleteProduct(productId).subscribe(
        res => {
          console.log(res);
          this.service.getAdmin();
          this.toastr.warning('Product is now vanished from the A-Mart.', 'Deleted Succesfully!');
        },
        err => {
          console.log(err);
          this.toastr.error('There is an issue while deleting the product.', 'Something went wrong!');
        }
      )
    }
  }


  onUpdate() {
    this.service.postUpdateProduct(this.editForm.value).subscribe(
      res => {
        console.log(res);
        this.service.getAdmin();
        this.toastr.success('Product will be now updated for the customers.', 'Updated Succesfully!');
      },
      err => {
        console.log(err);
        this.toastr.error('There is an issue while adding the product.', 'Something went wrong!');
      }
    )
  }

  showDataOnUpdate(productId: Number) {
    var product;
    this.service.adminProducts.forEach(element => {
      if (element.id == productId) product = element;
    });

    this.editForm = this.fb.group({
      Id: product.id,
      Name: product.name,
      Price: product.price,
      Image: product.image,
      Details: product.details,
      Category: product.category,
      Stock: product.stock
    })
  }


}
