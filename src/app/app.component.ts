import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/users/user.interface';
import { UsersList } from './data/users-list';
import { IFilterOptions } from './interfaces/filter-options.interface';
import { isWithinInterval } from 'date-fns';

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
    this.usersListFiltered = this.filtersUserList(filterOptions, this.usersList);
  }

  filtersUserList(filterOptions: IFilterOptions, usersList: IUser[]): IUser[] {
    let filteredList: IUser[] = [];

    filteredList = this.filterUsersListByName(filterOptions.name, usersList);
    filteredList = this.filterUsersListByStatus(filterOptions.status, filteredList);
    filteredList = this.filterUsersListByDate(filterOptions.startDate, filterOptions.endDate, filteredList);

    return filteredList;
  }

  filterUsersListByDate(startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] {
    const DATES_NOT_SELECTED = startDate === undefined || endDate === undefined;

    if(DATES_NOT_SELECTED) {
      return usersList;
    }

    const checkDateInterval = (user: IUser) => isWithinInterval(new Date(user.dataCadastro), {
      start: startDate,
      end: endDate
    });

    const listFiltered = usersList.filter(checkDateInterval);

    return listFiltered;
  }

  filterUsersListByStatus(status: boolean | undefined, usersList: IUser[]): IUser[] {
    const STATUS_IS_UNDEFINED = status === undefined;

    if(STATUS_IS_UNDEFINED) {
      return usersList;
    }

    const filteredList = usersList.filter((user) => user.ativo === status);

    return filteredList;
  }  

  filterUsersListByName(name: string, usersList: IUser[]): IUser[] {
    const NAME_NOT_TYPED = name === undefined;

    if(NAME_NOT_TYPED) {
      return usersList;
    }

    const filteredList = usersList.filter((user) => 
      user.nome.toLowerCase().includes(name.toLocaleLowerCase())
    );

    return filteredList;
  }

}
