  import { Component } from '@angular/core';
  import { PasswordManagerService } from '../password-manager.service';
  import { Observable } from 'rxjs';
  
  
  @Component({
    selector: 'app-side-list',
    templateUrl: './side-list.component.html',
    styleUrls: ['./side-list.component.css']
  })
  export class SideListComponent {
    allSites!: Observable<Array<any>>;
    siteName!:string;
    siteUrl!:string; 
    siteImgUrl!:string;
    siteId!:string;
    isSucceeded :boolean = false;
    successMessgae !: string;
    formState: string = "Add New";
        
      constructor(private PasswordManagerService : PasswordManagerService){
        this.loadSites()
      }
      showAlert(message:string){
        this.isSucceeded = true;
        this.successMessgae = message;

      }
  
  
    onSubmit(values: object){
      if(this.formState ==  "Add New"){
        this.showAlert("Add New");        
      this.PasswordManagerService.addSite(values).then(() =>{
        console.log('Data saved');
      }).catch((err) =>{
        console.log(err);
  
      });
  
      }else if(this.formState == "Edit"){
        this.PasswordManagerService.updateSite(this.siteId, values).then(() =>{
          this.showAlert("Edit Success!");        
          this.isSucceeded = true;

        }).catch((err) =>{
          console.log(err);
        });
  
      }
      
      
    }
  
    loadSites(){
      this.allSites =  this.PasswordManagerService.loadSite();
    }
  
    editSite(siteName:string,siteUrl:string, siteImgUrl:string, id:string){
      this.siteName= siteName;
  
      this.siteUrl= siteUrl;
  
      this.siteImgUrl= siteImgUrl;
  
      this.siteId= id;
  
      this.formState = "Edit"
  
    }
  
    deleteSite(id:string){
      this.PasswordManagerService.deleteSite(id).then(() => {
                this.isSucceeded = true;
                this.showAlert('Delete Site');

  
      }).catch((err) => {
        console.log("Error deleting");
      });
    }
  
  
  }
  