export default{
    props: ['search'],
    template:`
    <div class="search-preview">
    <p>{{search.volumeInfo.title}}</p> 
    <button @click="add">+</button>
    <!-- <img v-bind:src=book.thumbnail> -->
    <!-- <p>{{currency}}</p> -->
    </div>
    `,
created(){
},
methods:{
    add(){
        this.$emit('add',this.search)
    }
}

}