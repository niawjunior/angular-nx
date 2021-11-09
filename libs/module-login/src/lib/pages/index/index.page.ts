import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'recruit-supplier-module-login-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleLoginIndexPageComponent {
  jobPositionForm!: FormGroup;

  submitForm(): void {
    for (const i in this.jobPositionForm.controls) {
      this.jobPositionForm.controls[i].markAsDirty();
      this.jobPositionForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.jobPositionForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}
