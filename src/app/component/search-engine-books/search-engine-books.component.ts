import {Component, HostBinding, OnInit} from '@angular/core';
import {Book} from "../../entity/Book";
import * as $ from "jquery";
import {BookService} from "../../book.service";
import {Category} from "../../entity/Category";
import {CategoryService} from "../../category.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Page} from "../../entity/Page";

@Component({
  selector: 'searchBook',
  templateUrl: './search-engine-books.component.html',
  styleUrls: ['./search-engine-books.component.css'],
  animations: [
    trigger('categoryIn', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateY(-100%)', backgroundColor: 'red'}),
        animate('.2s .1s ease-in')
      ])
    ]),
    trigger('bookInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-5%)'}),
        animate('.5s .2s ease-in')
      ]),
  /*    transition('* => void', [
        animate(0, style({transform: 'translateX(10)'}))
      ])*/
    ]),
    trigger('bookSelectedInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({opacity: 0}),
        animate('.5s .5s ease-in')
      ])
    ]),
  ]
})
export class SearchEngineBooksComponent implements OnInit {
  books: Book[];
  page: Page<Book>;
  bookSelected: Book;
  categorySelectedId: number;

  categories: Category[];

  inputTitle: string;
  inputAuthor: string;

  constructor(private bookService: BookService, private categoryService: CategoryService) {
    this.categories = [];
    this.books = [];
    this.inputTitle = "";
    this.inputAuthor = "";
  }

  ngOnInit(): void {

    this.getCategories();
  }

  getCategories() {
    let buffer: Category[];
    this.categoryService.getAll()
      .then(r => r.json())
      .then(j => {
        buffer = j;

        for(let n = 0; n < buffer.length;++n){
          setTimeout(()=>this.categories.push(buffer[n]), n*200)
        }

      });

  }


  fetch(pageNumber: number = 0) {
    /*  if (author === "" && title === "") {
        this.books = [];
        return;
      }*/

    this.bookService.fetch(this.inputAuthor, this.inputTitle, this.categorySelectedId, pageNumber)
      .then(j => {

        this.page = j;

        //Ajouter les nouveaux livres
        this.page.content.forEach(b=>{
          if(this.books.find(book=>b.id == book.id) === undefined)
            this.books.push(b)
        })

        //Retirer les anciens livres qui ne sont plus dans les résultats de la requête
        this.books = this.books.filter(book=>{
          return this.page.content.find(bookPage=>bookPage.id === book.id) !== undefined
        });


        //TODO Y réfléchir
     /*   for(let n = 0; n < buffer.length;++n){
           setTimeout(()=>this.books.push(buffer[n]), n*1000)
        }*/

        if (this.books.length == 0) {
          $("#errorMsg").text('Aucun livre correspondant.').fadeIn(200);
        } else {
          $("#errorMsg").hide();
        }
      })
      .catch(err => $('#errorMsg').text('Le serveur ne répond pas. Pense à démarrer l\'API tête d\'oeuf').fadeIn(400));

  }


  selectBook(book: Book) {
    this.bookSelected = book;

  }

  categoryChecked(categoryId: number) {

    if (this.categorySelectedId == categoryId) return;
    this.categorySelectedId = categoryId;
    this.fetch();

  }

  getFirstPage() {
    this.fetch()
  }

  getPreviousPage() {

    if (!this.page.first) {
      this.fetch(this.page.number -1)
    }
  }

  getNextPage() {

    if (!this.page.last) {
      this.fetch(this.page.number+1)
    }
  }

  getLastPage() {
    this.fetch(this.page.totalPages-1)
  }
}
