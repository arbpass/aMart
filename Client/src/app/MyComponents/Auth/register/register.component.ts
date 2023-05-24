import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AMartService } from 'src/app/Shared/a-mart.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private fb: FormBuilder, public service: AMartService, private toastr: ToastrService, private router: Router) {  }

  ngOnInit(): void {
    this.service.loggedIn = false;
    this.register();

    let token = JSON.parse(localStorage.getItem('_token'));
    if(token)
    {
      var decodedHeader = jwt_decode(token['token']);
      if(decodedHeader['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']=="Admin") this.router.navigateByUrl('/admin');
      else this.router.navigateByUrl('/');
    }
  }
  
  registerForm: FormGroup;

  register()
  {
    this.registerForm = this.fb.group({
      Username : ['', Validators.required],
      Email : ['', Validators.required],
      Phone : ['', Validators.required],
      Password : ['', Validators.required],
    })
  }

  onSubmit()
  {
    this.service.postRegisterUser(this.registerForm.value).subscribe(
      res=> {
        console.log(res);
        this.toastr.show('Now login with you credentials', 'Registered Succesfully!');
      },
      err=> {
        console.log(err);
        this.toastr.error('Details are not appropriate or already exists!', 'Something went wrong!');
      }
    )
  }
}
