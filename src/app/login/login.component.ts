import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import{Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isError:boolean = false;
  constructor(private passwordManagerService: PasswordManagerService, private router: Router) {}

  onSumbit(values:any){
    console.log(values);
    this.passwordManagerService.login(values.email, values.password)
    .then(() => {
      this.router.navigate(['/site-list']);

    })
    .catch((err)=>{
      this.isError = true;
    });


  }
}
