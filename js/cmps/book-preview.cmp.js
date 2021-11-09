export default{
    props: ['book'],
    template:`
    <div class="book preview">
    <p>{{bookTitle}}</p>
    <img v-bind:src=book.thumbnail>
    <p>{{currency}}</p>
    </div>
    `,

computed:{
    bookTitle(){
        return this.book.title
    },
    currency(){
        
        const number=this.book.listPrice.amount
        const intlNumber=new Intl.NumberFormat(`${this.book.listPrice.currencyCode}`, { style: 'currency', currency: `${this.book.listPrice.currencyCode}` }).format(number)
        return intlNumber
    }
}

}
