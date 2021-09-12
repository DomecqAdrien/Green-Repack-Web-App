import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/model/Categorie';
import { Dossier } from 'src/app/model/Dossier';
import { Produit } from 'src/app/model/Produit';

@Component({
  selector: 'app-sell-detail',
  templateUrl: './sell-detail.component.html',
  styleUrls: ['./sell-detail.component.scss']
})
export class SellDetailComponent implements OnInit {

  form: FormGroup;
  loading = false;
  categories: Categorie[];
  id: any;
  dossier: Dossier;
  etats = ['Neuf', 'Peu usé'];

  desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet tincidunt ante, et consequat metus. Sed eget pharetra ipsum. Sed maximus facilisis augue at congue. Nunc vitae purus ac urna laoreet tristique vel non justo. In volutpat volutpat dapibus. Sed non est non libero venenatis lacinia. Donec eu elit ipsum. Phasellus in pulvinar mauris. Duis aliquam nec felis ac porttitor. Sed porttitor in metus ac porttitor. Nunc vitae efficitur ante. Duis interdum ex auctor, ultricies nisl a, bibendum elit."+
  "Praesent ullamcorper ipsum odio, eu vehicula tellus fringilla sed. Integer auctor ac nulla ut sagittis. Integer placerat commodo lectus ut vehicula. Nullam volutpat turpis vel rutrum euismod. Sed posuere lacinia elit id blandit. Fusce ultrices velit ac velit convallis consectetur. Mauris ante quam, rhoncus quis gravida non, eleifend eget lacus. Sed dignissim sapien risus, non feugiat felis porta quis."+
  " Nunc et semper nisl, gravida congue magna. Nunc dignissim lacus neque, eget pretium ipsum cursus vitae. Donec vitae ornare ex, lobortis suscipit risus. Fusce magna ante, porta in pulvinar quis, auctor eu dui. In nulla est, aliquam nec fringilla at, fermentum quis tellus. Praesent cursus lorem nec sapien pellentesque cursus. Sed vel nunc facilisis, aliquet nisl mattis, iaculis est. Quisque ante est, tempus in nisi nec, tristique dapibus sapien. Quisque ultricies turpis mollis ex semper convallis venenatis vitae nibh. Fusce luctus tincidunt magna, vitae fringilla metus ornare at. Ut ultricies nisi leo. Suspendisse tincidunt vestibulum odio, vitae faucibus diam."
  

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {

    
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.categories = [new Categorie(1, 'Téléphone'), new Categorie(2, 'Électroménager')];




    // init dossier
    const produit = new Produit(this.desc, 'Neuf', 1, [], []);
    this.dossier = new Dossier('En cours', produit);


    this.form = this.formBuilder.group({
      etat: [this.dossier.produit.etat]
    });
  }

  onSubmit(): any{
    console.log(this.form)
  }

}
