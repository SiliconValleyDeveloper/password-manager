import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, doc, deleteDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore : Firestore) {
    
   }

   addSite(data: object){
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
   }

   loadSite(){
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance,{idField:'id'});
   }

   updateSite(id:string,data:object){
    const dbInstance = doc(this.firestore, 'sites',id);
    return updateDoc(dbInstance,data);

   }
   deleteSite(id:string){
    const dbInstance = doc(this.firestore, 'sites',id);
    return deleteDoc(dbInstance);

   }


   // Password Queries

   addPassword(data:object, siteId:string){
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
   }


   loadPasswords(sideId:string){
    const dbInstance = collection(this.firestore, `sites/${sideId}/passwords`);
    return collectionData(dbInstance,{idField:'id'});
   }

   updatePasswords(siteId:string, passwordId:string, data:object){
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId);
    return updateDoc(docInstance,data);
 

   }

   deletePasswords(siteId:string, passwordId:string){
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId);
    return deleteDoc(docInstance);


   }

}
