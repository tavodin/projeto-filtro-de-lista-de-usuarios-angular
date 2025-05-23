import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/users/user.interface';
import { UsersList } from './data/users-list';
import { IFilterOptions } from './interfaces/filter-options.interface';
import { isWithinInterval } from 'date-fns';
import { filterUsersList } from './utils/filter-users-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  usersList: IUser[] = [];
  usersListFiltered: IUser[] = [];
  userSelected: IUser = {} as IUser;
  showUserDetails: boolean = false;

  onUserSelected(user: IUser){
    this.userSelected = user;
    this.showUserDetails = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.usersList = UsersList;
      this.usersListFiltered = this.usersList;
    }, 1500); 
  }

  onFilter(filterOptions : IFilterOptions) {
    console.log(filterOptions);
    this.usersListFiltered = filterUsersList(filterOptions, this.usersList);
  }
}
