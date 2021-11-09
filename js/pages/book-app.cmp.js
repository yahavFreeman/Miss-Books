import { bookService } from "../service/book-service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import googleSearch from "../cmps/google-search.cmp.js";

export default {
  template: `
<section class="book-app">
<book-filter @filtered="setFilter"/>
<google-search @added="loadBooks"/>
<book-list :books="booksToShow"/>
</section>
`,
  data() {
    return {
      books: null,
      filterBy: null,
      selectedBook: null,
    };
  },
  created() {
    this.loadBooks();
  },
  methods: {
    loadBooks() {
      bookService.query().then((books) => {
        this.books = books;
      });
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books;
      const nameStr = this.filterBy.name.toLowerCase();
      var priceStr = Number(this.filterBy.price);
      return this.books.filter((book) => {
        if (book.listPrice.amount >= priceStr) {
          return book.title.toLowerCase().includes(nameStr);
        }
      });
    },
  },
  components: {
    bookList,
    bookFilter,
    googleSearch,
  },
};
