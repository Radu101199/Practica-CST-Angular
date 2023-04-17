import { Router } from '@angular/router';
import { AuthService } from './../../_core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  routeParam: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
    });

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
      this.validateForm.patchValue({
        userName: storedUsername,
        password: storedPassword,
        remember: true,
      });
    }

    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const account = {
        email: this.validateForm.get('userName')?.value,
        password: this.validateForm.get('password')?.value,
      };

      const remember = this.validateForm.get('remember')?.value;
      const storage = remember ? localStorage : sessionStorage;

      this.auth.login(account).subscribe({
        next: (res) => {
          storage.setItem('token', res.token);
          console.log(res.token);
          this.router.navigate(['dashboard']);
        },
        error: () => {
          alert('Email or password are invalid');
        },
      });

      storage.setItem('username', account.email);
      storage.setItem('password', account.password);

      console.log('submit', this.validateForm.value);
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  get user() {
    return this.validateForm.get('userName');
  }

  get password() {
    return this.validateForm.get('password');
  }

  get remember() {
    return this.validateForm.get('remember');
  }

  get isLoggedIn() {
    return this.validateForm.get('isLoggedIn');
  }
}
