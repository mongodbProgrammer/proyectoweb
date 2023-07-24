document.addEventListener('DOMContentLoaded', () => {
    DOMEvents.init();
});


const DOMEvents = {
    init() {
        this.login();
        this.register();
        this.getSession();
    },
    getSession() {
        const session = sessionStorage.getItem('user');
        if(session !== null) {
            const a = document.createElement('a');
            a.href = 'index.html';
            a.click();
        }
    },
    login() {
        document.querySelector('.login').addEventListener('click', async () => {
            const username = document.querySelector('#username');
            const password = document.querySelector('#password');
            const response = await fetch(`http://localhost:3000/usuario/${username.value}/${password.value}`);
            const data = await response.json();
            if(data.length > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido',
                    showConfirmButton: false,
                    timer: 3000,
                }).then(() => {
                    sessionStorage.setItem('user', JSON.stringify(data[0]));
                    const a = document.createElement('a');
                    a.href = 'index.html';
                    a.click();
                });
            }else{
                if(username.value !== '' || password.value !== '') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ingresar usuario y contraseña',
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuario o contraseña incorrectos',
                    })
                }
            }
        });
    },
    register() {
        document.querySelector('.register').addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = 'registrarse.html';
            a.click();
        });
    }
}