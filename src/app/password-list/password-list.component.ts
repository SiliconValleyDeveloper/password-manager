import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import {AES, enc} from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {
  isSucceeded :boolean = false;
  successMessgae !: string;


  siteId!: string;
  siteName!: string;
  siteURL!: string;
  siteImgUrl!: string;

  passwordList!:Array<any>;

  email!:string;
  username!:string;
  password!:string;
  passwordId!:string;

  formState : string = 'Add new';

  constructor(private router: ActivatedRoute, private passwordManagerService : PasswordManagerService){
    this.router.queryParams.subscribe((val:any) => {
     
      this.siteId = val.id;
      this.siteName = val.name;
      this.siteURL = val.siteUrl;
      this.siteImgUrl = val.siteImgUrl

    });

    this.loadPasswords();
  }
  showAlert(message:string){
    this.isSucceeded = true;
    this.successMessgae = message;

  }


  resetForm() {
    this.formState = 'Add New';
    this.email=''; 
    this.username=''; 
    this.password=''; 


  }


  onSubmit(values:any){
    const encryptedPassword =  this.encryptPassword(values.password)
    values.password = encryptedPassword;

    if(this.formState == 'Add new'){
     
  
    this.passwordManagerService.addPassword(values, this.siteId).then(() => {
      this.showAlert('Successfully');      
    }).catch((err)=>{
      console.log("Error");
    });

  }else if(this.formState == 'Edit'){
    this.passwordManagerService.updatePasswords( this.siteId, this.passwordId, values).then(() => {
      this.resetForm();
      console.log('Date Updated successfully')

    }).catch((err)=>{
      console.log(err);

    });  
  }else{
  }
  }


 loadPasswords(){
  this.passwordManagerService.loadPasswords(this.siteId)
  .subscribe((value)=>{
    this.passwordList = value;
  });
 }


 editPassword(email:string, username:string, password:string, passwordId:string ){
  this.email = email;
  this.username = username;
  this.password = password;
  this.passwordId = passwordId;

  this.formState='Edit';

 }
 deletePassword(passwordId:string){
  this.passwordManagerService.deletePasswords(this.siteId, passwordId).then(() =>{

  })
  .catch((err) =>{


  });

 }
 encryptPassword(password:string){
  const secertKey = 'H+MbQeThWmYq3t6w9z$C&F)J@NcRfUjX';
  ;
   const encryptedPassword = AES.encrypt(password, secertKey).toString();
   return encryptedPassword;
 }

 decryptPassword(password:string){
  const secertKey = 'H+MbQeThWmYq3t6w9z$C&F)J@NcRfUjX';
  const decPassword = AES.decrypt(password, secertKey).toString(enc.Utf8);
  console.log("covert"+decPassword+" "+password);
  return decPassword;

 }
 onDecrypt(password:string, index:number){
 const decPassword =  this.decryptPassword(password);
 console.log("DEC"+password);
 this.passwordList[index].password = decPassword;
 }

 
  
}
