import { Injectable } from '@angular/core';
import {Book} from "./entity/Book";
import * as $ from "jquery";

@Injectable()
export class BookService {

  books: Book[];
  baseUrl : string;
  size = 5;
  constructor() {
    this.books = [];
    this.baseUrl = 'http://localhost:8080/api/books';
  }

  /**
   * Fetch the books corresponding to the search
   * @param {string} author
   * @param {string} title
   * @param {number} categoryId
   * @param pageNumber
   * @returns {Promise<any>}
   */
  fetch(author: string, title: string, categoryId: number = 0, pageNumber: number = 0) {

    let params = [
      {key: "author", value: author},
      {key: "title", value: title},
      {key: "size", value: this.size.toString()},
      {key: "page", value: pageNumber.toString()}
      ];
    if(categoryId != 0)
      params.push({key: "categoryId", value: categoryId.toString()})

    let url = this.buildUrl(this.baseUrl, params);

    console.log("size : " , this.size);
    console.log("page demandée : " , pageNumber);
    console.log("l'url demandée est : ", url);
    return fetch(url).then(r=>r.json())
      .then(j=> {
        return this.books = j;
      })
  }

  changeResume(book: Book, resume) {
    return $.post(this.baseUrl + '/' + book.id,
      {resume: resume}
    );
  }

  /**
   * Get book by id
   * @param {number} id
   * @returns {Book | undefined}
   */
  getById(id: number){

    return fetch(this.baseUrl+"/"+id).then(r=> r.json())
  }

  getBooks(){
    return this.books;

  }

  buildUrl(baseUrl: string, params : {key, value}[]) : string{

    if(!baseUrl) return "";
    params.forEach(e => {
      if(e.value.length > 0){
        baseUrl += (baseUrl.indexOf('?') === -1 ? '?' : '&') + e.key + "="+ e.value;
      }
    })
    return baseUrl;
  }
}
