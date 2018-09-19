import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../articles.service';
=======
>>>>>>> 091bc3119db40d8953c9659d488fae5ce462cbb5

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
<<<<<<< HEAD
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

=======

  constructor() { }

  ngOnInit() {
  }

}
>>>>>>> 091bc3119db40d8953c9659d488fae5ce462cbb5
