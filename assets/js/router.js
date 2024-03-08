export class Router {

    routes={}

    add(routeName, page){
        this.routes[routeName] = page
    }

    route(event){
        event = event || window.event
        event.preventDefault()
    
        window.history.pushState({}, "", event.target.href)
    
        this.handle()
        
    }
    
    handle(){
        const { pathname } = window.location
        const body = document.body;
        const route = this.routes[pathname] || this.routes[404]
    
    
        switch(pathname){
            case "/":
                body.className = "home-bg";
                break;
            case "/universe":
                body.className = "universe-bg";
                break;
            case "/explore":
                body.className = "explore-bg";
                break;
            default:
                body.className= "home-bg";
                break   ;
                    
        }
        
        const links = document.querySelectorAll('nav a')
    
    
        
        links.forEach(link => {
            if (link.getAttribute('href') === pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    
        fetch(route)
        .then((data)=>data.text())
        .then(html => document.querySelector('#app').innerHTML = html)
    
    console.log(pathname)
    }
    
}
const router = new Router()