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
}