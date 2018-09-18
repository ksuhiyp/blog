import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { article } from '../articles.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articles: article[]
  constructor(private article: ArticlesService) { }

  ngOnInit() {
    this.article.getAllArticles()
      .subscribe((articles) => this.articles = articles);
  }

}
