import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm : FormGroup;
  forbiddenUserName= ['Chris', 'Anna'];


  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbbidenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required,  Validators.email, this.forbbidenEmails]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })

    this.signupForm.valueChanges.subscribe(
      value => console.log(value)
    );

    this.signupForm.statusChanges.subscribe(
      value => console.log(value)
    )

    this.signupForm.setValue({
      'userData': {
        'username': 'max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    })

    this.signupForm.patchValue({
      'userData': {
        'username': 'Menna',
      }
    })
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset(this.signupForm.patchValue({
      'gender': 'male'
    }));
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  //custom Validator
  forbbidenNames(control : FormControl): {[s: string]: boolean}{
    if(this.forbiddenUserName.indexOf(control.value) !== -1){
      return {'nameIsForbbiden': true}
    }
    return null;
  }

  //async validators
  forbbidenEmails(control : FormControl): Promise<any> | Observable<any> {
     const promise = new Promise<any>((resolve, reject) =>{
       setTimeout(() => {
          if(control.value === 'test@test.com'){
            resolve({'emailIsForbbiden': true});
          }
          else{
            resolve(null);
          }
       }, 1500);
     });
    return promise; 
  }
}
