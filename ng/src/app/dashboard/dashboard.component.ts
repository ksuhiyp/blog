import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { article } from '../articles.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articles: article[]
  constructor(private article: ArticlesService,public dialog:MatDialog) { }

  ngOnInit() {
    this.article.getAllArticles()
      .subscribe((articles) => this.articles = articles);
  }
  deleteArticle(id: string) {

    this.article.deleteArticleById(id).subscribe()
  }
  @ViewChild("deleteArticleRef") deleteArticleRef: TemplateRef<any>

  openDialog(): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      const dialogRef = this.dialog.open(this.deleteArticleRef, {
        width: '250px',
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }

}
