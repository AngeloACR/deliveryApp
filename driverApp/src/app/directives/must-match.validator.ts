import { AbstractControl } from "@angular/forms";
import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[mustMatch]"
})
export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl) {
    let password = control.get("password").value;
    let confirmPassword = control.get("cpassword").value;
    if (password != confirmPassword) {
      control.get("cpassword").setErrors({ ConfirmPassword: true });
    } else {
      return null;
    }
  }
}
