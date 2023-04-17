import { AuthService } from './../../_core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  isSubmitForm = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      fname: ['', [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(3),
      ]],
      lname: ['', [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(3),
      ]],
    });
  }

  submitForm(): void {
    this.isSubmitForm = true;

    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.authService.register(this.validateForm.value).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  confirmationValidator = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (!control.parent || !control) {
      return null;
    }

    const password = control.parent.get('password');
    const confirmPassword = control.parent.get('checkPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.value === '') {
      return null;
    }

    if (password.value === confirmPassword.value) {
      return null;
    }

    return { notSame: true };
  }

  getFormControl(controlName: string): AbstractControl | null {
    if (!this.validateForm) {
      return null;
    }
    return this.validateForm.get(controlName);
  }

  getErrorMessage(controlName: string): string {
    const control = this.getFormControl(controlName);

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('minlength')) {
      return `This field must be at least ${control.errors?.['minlength'].requiredLength} characters long`;
    }

    if (control.hasError('maxlength')) {
      return `This field must be less than or equal to ${control.errors?.['maxlength'].requiredLength} characters long`;
    }

    if (control.hasError('email')) {
      return 'Invalid email address';
    }

    if (control.hasError('notSame')) {
      return 'Passwords do not match';
    }

    return '';
  }

  isFieldValid(controlName: string): boolean {
    const control = this.getFormControl(controlName);
    return control ? control.invalid && (control.dirty || control.touched || this.isSubmitForm) : false;
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

}
