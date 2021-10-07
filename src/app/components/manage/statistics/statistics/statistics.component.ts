import { Component, OnInit } from '@angular/core';
import { Statistiques } from 'src/app/model/Statistiques';
import { StatistiquesService } from 'src/app/services/statistiques.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statistique: Statistiques;
  isLoaded = false;
  constructor(
    private statistiquesService: StatistiquesService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData(): Promise<any>{
    this.statistique = await this.statistiquesService.getStatistiques();
    this.isLoaded = true;
  }

}
