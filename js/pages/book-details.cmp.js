import { bookService } from "../service/book-service.js"
import { eventBus } from "../service/event-buss.service.js"


export default{
    props:['id'],
    template:`
    <div v-if="book" class="details">

        <div class="reviews-and-info">
        <h3>Book details:</h3>
        <p>Authors: {{book.authors}}</p>
        <p>Title:{{book.title}}</p>
        <p>Categories: {{book.Categories}}</p>
        <p>languge: {{book.language}}</p>
        <p>Subtitles: {{book.subtitle}}</p>
        <p>Publish date: {{date}}</p>
        <p>Pages: {{pages}}</p>
        <p v-bind:class="color">Price: {{currency}}</p>
        <p v-if="book.listPrice.isOnSale" >SALE!</p>
        <p>{{description}} <button v-if="showMore" @click="toggleTxt">{{buttonTxt}}</button></p>
        
        <form>
        <h4>Give this book a review</h4>
        Full name:
        <input ref="theName" v-model="bookReview.reviewerName" type="text"><br>
        Rate this book:
        <input v-model="bookReview.rating" list="ratings" class="rating-input" type='number'><br>
        Read at:
        <input v-model="bookReview.reviewDate" type="date" value='Date.now()'><br>
        <textarea v-model="bookReview.review" id="review"
        rows="5" cols="33">
        </textarea><br>
        <input type="submit" @click="saveReview">
        </form>
        <datalist id="ratings">
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        </datalist>
        
        <section v-if="isReviews">
        <ul>
        <li class="reviews" v-for="(review,idx) in book.reviews">
        <p>Reader: {{review.reviewerName}}</p>
        <p>At:{{review.reviewDate}}</p>
        <p>rating: {{review.rating}}</p>
        <p>{{review.review}}</p>
        <button @click='removeReview(idx)'>X</button>
        </li>
        </ul>
        </section>
                <div class="clse-btn-container">
                <button class="clse-btn" @click="backToList">Back to book list</button>
                </div>
                
                </div>
                <div>
            <img class="details-img" v-bind:src=book.thumbnail>
            </div>
        </div>


    
    `,
data(){
    return{
        book:null,
        showMore: false,
        showLess:false,
        bookReview:{
            reviewerName:'Books Reader',
            rating:null,
            reviewDate:'',
            review:'',
        },
        isReviews:false
    }
},
mounted(){
// var elName=this.$refs.theName
// elName.focus()
},
created(){
    const {bookId}=this.$route.params
    console.log(bookId);
    bookService.bookById(bookId).then(book=>{this.book=book
        console.log(this.book);
        if(this.book.reviews){
            this.isReviews=true
        }
        
    })
},
methods:{
    backToList(){
        this.$router.push('/book')
    },
    toggleTxt(){
        this.showLess=!this.showLess
    },
    saveReview(){
        event.preventDefault()
        if(!this.book.reviews){
            this.book.reviews=[]
        }
        this.book.reviews.push(this.bookReview)
        bookService.saveReview(this.book).then(()=>{
            const msg = {
            txt: "Book review added to"+this.book.title+" find it at:" ,
            type: 'success',
            page:"/book/"+this.book.id
        };
        this.isReviews=true
        this.bookReview={
            reviewerName:'Books Reader',
            rating:null,
            reviewDate:'',
            review:'',
        }
        eventBus.$emit('showMsg', msg);})
        .catch(err => {
            console.log('err', err);
            const msg = {
                txt: 'Error. Please try later',
                type: 'error'
            };
            eventBus.$emit('showMsg', msg);
        });
        // this.$router.push('/book')
    },
    removeReview(idx){
        event.preventDefault()
        this.book.reviews.splice(idx,1)
        bookService.saveReview(this.book).then(()=>{
            const msg = {
            txt: 'Review deleted',
            type: 'success'
        };
        eventBus.$emit('showMsg', msg);})
        .catch(err => {
            console.log('err', err);
            const msg = {
                txt: 'Error. Please try later',
                type: 'error'
            };
            eventBus.$emit('showMsg', msg);
        });
    }

},
computed:{
    
    date(){
        if(new Date().getFullYear()-this.book.publishedDate>10){
            return(`${this.book.publishedDate} Veteran book`)
        }else if(new Date().getFullYear()-this.book.publishedDate<=1){
            return(`${this.book.publishedDate} New!`)
        }else{
            return(`${this.book.publishedDate}`)
        }
    },
    pages(){
        if(this.book.pageCount>500){
            return (this.book.pageCount+' Long reading')
        }else if(this.book.pageCount>200){
            return (this.book.pageCount+' Decent reading')
        }else if(this.book.pageCount<100){
            return (this.book.pageCount+' Light reading')
        }else{
            return (this.book.pageCount)
        }
    },
    currency(){
        const number=this.book.listPrice.amount
        const intlNumber=new Intl.NumberFormat(`${this.book.listPrice.currencyCode}`, { style: 'currency', currency: `${this.book.listPrice.currencyCode}` }).format(number)
        return intlNumber
    },
    color(){
        if(this.book.listPrice.amount>150){
            return 'rd'
        }else if(this.book.listPrice.amount<20){
            return 'grn'
        }
    },

    description(){
        if(this.book.description.length>100){
            this.showMore=true;
            if(!this.showLess){
                var sub=this.book.description.substring(0,100)
                return sub
            }else{
            return this.book.description
            }
        }else{
            return this.book.description
        }
    },
    buttonTxt(){
        if(this.showLess){
            return "Show less"
        }else{
            return "Show more"
        }
    }
   
},
components:{
    bookService,
    eventBus
}

}