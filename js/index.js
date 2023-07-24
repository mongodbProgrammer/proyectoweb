document.addEventListener('DOMContentLoaded', () => {
    DOMEvents.init();
});

const DOMEvents = {
    init() {
        this.login();
        this.register();
        this.getSession();
        this.logout();
        this.startnow();
    },
    startnow(){
        document.querySelector('.startnow').addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = 'proyecto.html';
            a.click();
        });
    },
    logout(){
        document.querySelector('.logout').addEventListener('click', () => {
            sessionStorage.removeItem('user');
            const a = document.createElement('a');
            a.href = 'index.html';
            a.click();
        });
    },
    getSession() {
        if(sessionStorage.getItem('user') !== null) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            document.querySelector('.userSession').classList.remove('d-flex');
            document.querySelector('.userSession').classList.add('d-none');
            document.querySelector('.logout').classList.remove('d-none');
            document.querySelector('.userText').innerHTML = 'Bienvenido '+user.username;
        }else{
            document.querySelector('.userSession').classList.remove('d-none');
            document.querySelector('.userSession').classList.add('d-flex');
        }
    },
    login() {
        document.querySelector('.login').addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = 'iniciarsesion.html';
            a.click();
        });
    },
    register() {
        document.querySelector('.register').addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = 'registrarse.html';
            a.click();
        });
    },
};