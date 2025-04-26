import { Component } from '@angular/core';
import { IUser } from './interfaces/users/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userSelected: IUser = {} as IUser;
  showUserDetails: boolean = false;

  onUserSelected(user: IUser){
    this.userSelected = user;
    this.showUserDetails = true;
  }
}
