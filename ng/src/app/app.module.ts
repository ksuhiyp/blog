import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatInputModule, MatMenuModule, MatButtonModule, MatSidenavModule, MatFormFieldModule, MatIconModule, MatListModule, MatCardModule, MatDialogModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { RouterModule, Routes } from '@angular/router'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AboutComponent } from './about/about.component';
const appRoutes: Routes = [
    { path: "articles", component: DashboardComponent },
    { path: "article/:id", component: ArticleComponent },
    { path: "article/create", component: CreateArticleComponent },
    { path: "users", component: UsersComponent },
    { path: "user/:id", component: UsersComponent },
    { path: "about", component: AboutComponent },
    { path: "", redirectTo: '/articles',pathMatch:'full'},
    { path: "**", component: PageNotFoundComponent },


]
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        LoginComponent,
        ArticleComponent,
        CreateArticleComponent,
        DashboardComponent,
        UsersComponent,
        UsersComponent,
        AboutComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule, HttpClientModule, MatMenuModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RouterModule.forRoot(appRoutes, { enableTracing: true })
    ],
    entryComponents: [
        LoginComponent
    ],

    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
