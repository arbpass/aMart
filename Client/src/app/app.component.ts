import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AMartService } from './Shared/a-mart.service';
import { faCartShopping, faTruck, faRightFromBracket, faAt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AMartAdminService } from './Shared/a-mart-admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'aMart';
  faCartShopping = faCartShopping; faTruck = faTruck; faRightFromBracket = faRightFromBracket; faAt = faAt; faMoon=faMoon; faSun=faSun;
  constructor(public service: AMartService, public serviceAdmin: AMartAdminService, private router: Router, private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.service.loggedIn = false;
  }

  onLogout()
  {
    localStorage.clear();
    this.service.loggedIn = false;
    this.serviceAdmin.adminLoggedIn = false;
    this.toastr.show('Have a nice day!', 'Logged out successfully!');
    this.router.navigateByUrl('/login');
  }

  changeMode()
  {
    if(this.service.mode == "dark") 
    {
      this.service.mode = "light";
      this.service.modeSideEffect = "dark";
    }
    else
    {
      this.service.mode = "dark";
      this.service.modeSideEffect = "light";
    }
  }
}
