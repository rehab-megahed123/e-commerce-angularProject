import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../../Pages/register/register.component';

export const registerGuard: CanDeactivateFn<RegisterComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (!component.isRegisterd&&component.registrationForm.valid) {
    //form has been filled out and he want to come out of that form i will not allow him to do that
    const alert = window.confirm('your data will lost');
    return alert;
  }
  return true;
};

//return false if you want to prevent navigation
//return true if you want to allow navigation
