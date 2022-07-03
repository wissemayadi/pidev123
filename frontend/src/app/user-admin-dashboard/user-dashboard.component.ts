import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
userValue!:FormGroup;
userObj:UserModel= new UserModel();
userList:any=[];
btnSaveShow:boolean=true;
btnUpdateShow:boolean=true;
  constructor(private formBuilder:FormBuilder,private api:UserService) { }

  ngOnInit(): void {
    this.userValue=this.formBuilder.group({
      _id:[],
      fullName:[''],
      email:[''],
      password:[''],
      phone:['']
    })
    this.getUser();
  }
  addUser(){
  this.userObj.fullName = this.userValue.value.fullName;
  this.userObj.email = this.userValue.value.email;
  this.userObj.phone = this.userValue.value.phone;
  this.userObj.password= this.userValue.value.password;

  this.api.postUser(this.userObj).subscribe({next: (v)=>{
    console.log(v)
  },
  error:(e)=>{
    alert("error")
  },
  complete:()=>{
    console.log('complete')
    alert("user added with success")
    this.getUser()
    this.userValue.reset()
  }
})
  }

  getUser(){
    this.api.getUser().subscribe(res=>{
      this.userList= res;
    })
  }
  deleteUser(data:any){
   this.api.deleteUser(data._id).subscribe(
    {next: (v)=>{
      console.log(v)
    },
    error:(e)=>{
      alert("error")
    },
    complete:()=>{
      console.log('complete')
      alert("user deleted with success")
      this.getUser()
      
    }
  })
   
  }

  editUser(data:any){
    this.userValue.controls['fullName'].setValue(data.fullName)
    this.userValue.controls['email'].setValue(data.email)
    this.userValue.controls['phone'].setValue(data.phone)
    this.userValue.controls['password'].setValue(data.password)
    this.userObj._id=data._id;

  
  }
  updateUser(){
    this.userObj.fullName = this.userValue.value.fullName;
  this.userObj.email = this.userValue.value.email;
  this.userObj.phone = this.userValue.value.phone;
  this.userObj.password= this.userValue.value.password;

  this.api.putUser(this.userObj,this.userObj._id).subscribe({next: (v)=>{
    console.log(v)
  },
  error:(e)=>{
    alert("error")
  },
  complete:()=>{
    console.log('complete')
    alert("user updated with success")
    this.getUser()
    this.userValue.reset()
    this.showSave()
    this.userObj._id=0
  }
}
)} 

showSave(){
  this.btnSaveShow=true;
  this.btnUpdateShow=false;
}
showUpdate(){
  this.btnSaveShow=false;
  this.btnUpdateShow=true;
}
}
