import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './component/App/app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BookComponent } from './component/book/book.component';
import { SearchEngineBooksComponent } from './component/search-engine-books/search-engine-books.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import {BookService} from "./book.service";
import {RouterModule} from "@angular/router";
import { HomeComponent } from './component/home/home.component';
import {CategoryService} from "./category.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FooterComponent } from './component/footer/footer.component';
import {PageCounterPipe, PageElementsPipe} from "./entity/Page";

const appRoutes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchEngineBooksComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    SearchEngineBooksComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    PageCounterPipe,
    PageElementsPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BookService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
