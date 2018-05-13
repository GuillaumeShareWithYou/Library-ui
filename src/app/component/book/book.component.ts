import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../entity/Book";
import {BookService} from "../../book.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  animations: [
    trigger('bookChange', [
      state('*', style({transform: 'translateX(0)'})),
      transition('* => *', [
        style({transform: 'translateY(50px)', opacity: 0}),
        animate('.5s .5s ease-in')
      ])
    ]),
  ]
})
export class BookComponent implements OnInit {


  @Input()
  book : Book;
  constructor(private bookService: BookService ) {


  }

  ngOnInit() {
  }

  changeResume(resume: string) {
    this.book.resume = resume;
    this.bookService.changeResume(this.book, resume);
  }
  cancelChangeResume(){
    $('#resumeTextArea').val(this.book.resume);
  }


}
