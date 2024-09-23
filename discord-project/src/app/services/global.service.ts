import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  getError(form: FormGroup, controlName: string, errorType: string) {
    return (
      form.get(controlName)?.hasError(errorType) &&
      form.get(controlName)?.touched
    );
  }
}
