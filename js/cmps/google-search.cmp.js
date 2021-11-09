import { bookService } from "../service/book-service.js";
import googlePreview from "./google-preview.cmp.js";
import { eventBus } from "../service/event-buss.service.js";

export default {
  template: `
    <div class="book-searcher">
    <label>Search
    <input type="text" v-model="searchBy" placeholder="Search books">
    <button @click="search">Search</button>
    <template v-show="isSearche">
        <ul>
            <li v-for="search in searches">
            <google-preview :search="search" @add="addBook"/>
            </li>
        </ul>
    </template>
    </label>
    </div>
    `,
  data() {
    return {
      searchBy: "",
      searches: {},
      isSearch:false
    };
  },
  methods: {
    search() {
      console.log(this.searchBy);
      bookService.getBooks(this.searchBy).then((res) => {
          this.searches=res
          this.isSearch[true]
        
        });
    },
    addBook(book){
        console.log(book)
        const bookToAdd={
            title: book.volumeInfo.title,
            id:book.id,
            subtitles:book.volumeInfo.subtitle,
            authors:book.volumeInfo.authors[0],
            Categories:book.volumeInfo.categories[0] ||"",
            language:book.volumeInfo.language,
            pageCount:book.volumeInfo.pageCount,
            date:Number(book.volumeInfo.publishedDate),
            thumbnail:book.volumeInfo.imageLinks.thumbnail,
            listPrice:{
                amount:Math.random()*300,
                currencyCode:"ILS"
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora fugiat voluptas illum cum soluta deleniti! Reprehenderit accusamus atque ratione incidunt recusandae illo, perspiciatis nemo corrupti, animi architecto ipsum! Voluptatibus, ad.',
            }
            bookService.addBook(bookToAdd)
            const msg = {
                txt: 'book added. find it at:',
                type: 'success',
                page:"/book"
            };
            eventBus.$emit('showMsg', msg)
            this.$emit('added')
        }
        // <p v-bind:class="color">Price: {{currency}}</p>
        // <p v-if="book.listPrice.isOnSale" >SALE!</p>
        // <p>{{description}} <button v-if="showMore" @click="toggleTxt">{{buttonTxt}}</button></p>
    },
  components: {
    bookService,
    googlePreview,
    eventBus
  },
};
