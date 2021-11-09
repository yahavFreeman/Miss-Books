import { eventBus } from "../service/event-buss.service.js";
import { router } from "../routes.js";

export default {
    template:`
    <transition name="fade">
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
        <router-link v-if="msg.page" :to="msg.page">Find it here</router-link>
        </div>
    </transition>
    `,
    data(){
        return{
            msg:null
        }
    },
    created(){
        eventBus.$on('showMsg',this.showMsg)
    },
    methods: {
        showMsg(msg){
            this.msg=msg
            setTimeout(()=>{
                this.msg=null
            },3000)
        }
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
    },
components:{
router
}



}