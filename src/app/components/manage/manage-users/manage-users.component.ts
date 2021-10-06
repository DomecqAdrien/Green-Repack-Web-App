import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  @Input() users: Utilisateur[];
  dataSource = new MatTableDataSource<Utilisateur>([]);
  displayedColumns = ['email', 'accept', 'refuse'];

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
  }

  async acceptUser(user: Utilisateur): Promise<void> {
    const role = 'Marchand';
    const updatedUser = new Utilisateur();
    updatedUser.role = role;
    const response = this.userService.updateUser(user.email, updatedUser);
  }

  async refuseUser(user: Utilisateur): Promise<void> {
    const role = 'Utilisateur';
    const updatedUser = new Utilisateur();
    updatedUser.role = role;
    const response = this.userService.updateUser(user.email, updatedUser);
  }
}
