import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  forbiddenUserName=['chris','anna'];
  signupForm: FormGroup;
  submitted=false;

  user={
    username:'',
    email:'',
    gender:'',
    hobbies:[]
  }

  ngOnInit(){
    this.signupForm= new FormGroup({
      'userData': new FormGroup({
      'username':new FormControl(null,[Validators.required, this.forbiddenNames.bind(this)]),
      'email':new FormControl(null,[Validators.required,Validators.email])}),
      'gender':new FormControl('female'),
      'hobbies':new FormArray([])
    });
  }

  onSubmit(){
    this.submitted=true;
    this.user.username=this.signupForm.value.userData.username;
    this.user.email=this.signupForm.value.userData.email;
    this.user.gender=this.signupForm.value.gender;
    this.user.hobbies=this.signupForm.value.hobbies;
    
  }
  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  onAddHobby(){
    const control=new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control:FormControl):{[s:string]:boolean}{
    if(this.forbiddenUserName.indexOf(control.value) !==-1){
      return{'nameIsForbidden':true}
    }
    return null
  }

  onReset(){
    this.signupForm.reset();
  }
  
}
