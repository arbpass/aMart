import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AMartService } from 'src/app/Shared/a-mart.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, public service: AMartService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.loggedIn = false;
    this.login();
    
    let token = JSON.parse(localStorage.getItem('_token'));
    if(token)
    {
      var decodedHeader = jwt_decode(token['token']);
      console.log(decodedHeader)
      if(decodedHeader['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']=="Admin") this.router.navigateByUrl('/admin');
      else this.router.navigateByUrl('/');
    }
  }

  loginForm: FormGroup;

  login() {
    this.loginForm = this.fb.group({
      Username: [''],
      Password: [''],
    })
  }

  onSubmit() {
    this.service.postLoginUser(this.loginForm.value).subscribe(
      res => {
        // console.log(res);
        localStorage.setItem('_token', JSON.stringify(res));
        var decodedHeader = jwt_decode(res['token']);
        if(decodedHeader['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']=="Admin") this.router.navigateByUrl('/admin');
        else this.router.navigateByUrl('/');
        
        this.toastr.show('Lets do some shopping!', 'Welcome to A-Mart!');
      },
      err => {
        console.log(err);
        this.toastr.error('Your Username or Password is wrong!', 'Something went wrong!');
      }
    )
  }
}
