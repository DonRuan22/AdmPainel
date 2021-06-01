import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService,ResponseModel} from '../../services/user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  myUser:any;
  constructor(public router: Router,
              private userService: UserService) { }
  
  ngOnInit(): void {
    this.myUser = this.userService.userData$.getValue();
    this.myUser = this.myUser['user'];
  }

  redirectToHome() {
    this.router.navigateByUrl('dashboard/home');
  }
  redirectToAbout() {
    this.router.navigateByUrl('dashboard/about');
  }
  redirectToContact() {
    this.router.navigateByUrl('dashboard/contact');
  }
  redirectToAllProducts() {
    this.router.navigateByUrl('dashboard/all-products');
  }
  logMeOut() {
    this.userService.logout();
    this.router.navigateByUrl('login');
  }


}
