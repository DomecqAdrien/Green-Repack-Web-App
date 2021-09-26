import { Component, Input, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/Categorie';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {

  @Input() categories: Categorie[];
  constructor() { }

  ngOnInit(): void {
  }

}
