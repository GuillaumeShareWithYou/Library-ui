import {Author} from "./Author";
import {Category} from "./Category";

export class Book{

  id: number;
  title: string;
  resume: string;
  author: Author;
  category: Category;
  imagePath: string;
}
