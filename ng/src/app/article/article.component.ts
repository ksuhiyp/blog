import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article;
  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit() {
    this.getArticle();

  }

  getArticle(): void {
    this.activatedRoute.params
      .subscribe(params => this.articleService.getArticleById(params['id'])
        .subscribe(data => this.article = data))
  }
}

