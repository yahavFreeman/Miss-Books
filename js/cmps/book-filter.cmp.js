export default{
    template: `
    <div class="book-filter">
    <label>Search</label>
    <input @input="filter" type="text" v-model="filterBy.name" placeholder="Search">
    <input @input="filter" type="number" v-model="filterBy.price" placeholder="Minimum price">
    </div>
    `,
data(){
    return{
        filterBy:{
            name:'',
            price:0
        }
    }
},
methods: {
filter(){
    this.$emit('filtered',{...this.filterBy})
}
}
}