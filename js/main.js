import bookApp from "./pages/book-app.cmp.js";
import {router} from "./routes.js"
import appHeader from "./cmps/app-header.cmp.js";
import userMsg from "./cmps/user-msg.cmp.js";

const options={
    el: '#app',
    router,
    template: `
        <section>
        <user-msg/>
        <app-header/>
        <router-view />
        </section>
    `,

components: {
bookApp,
appHeader,
userMsg
}

};
new Vue(options);