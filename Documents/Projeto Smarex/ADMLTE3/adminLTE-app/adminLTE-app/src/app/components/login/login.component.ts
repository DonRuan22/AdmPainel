import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SocialAuthService,SocialUser} from 'angularx-social-login';
import {UserService,ResponseModel} from '../../services/user/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginMessage: string;
  userRole: number;

  constructor(private authService: SocialAuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'dashboard/home');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
    
  }


  signInWithGoogle() {
    this.userService.googleLogin();
  }

  login(form: NgForm) {
    const email = this.email;
    const password = this.password;

    if (form.invalid) {
      return;
    }

    form.reset();
    this.userService.loginUser(email, password);

    this.userService.loginMessage$.subscribe(msg => {
      if (msg != null){
        this.loginMessage = msg;
      }
      setTimeout(() => {
        this.loginMessage = '';
      }, 2000);
    });


  }
}
