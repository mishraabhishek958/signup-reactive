import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordChecker } from './custom-validators/password-checker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'signup-reactive';

  registerForm: FormGroup;
  submitted: boolean = false;

  //constructor should be aware of theses properties
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    //you need to mention all of your form fields and group them using formBuilder
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTandC: [false, Validators.requiredTrue],
      },
      {
        validators: PasswordChecker("password", "confirmPassword"),
      }
    );
  }

  get h() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.table(this.registerForm.value);
    console.table(this.registerForm);

    alert('Success Signup ' + JSON.stringify(this.registerForm.value));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  ngOnDestroy() {}
}
