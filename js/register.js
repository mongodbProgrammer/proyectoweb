document.addEventListener('DOMContentLoaded', () => {
    DOMEvents.init();
});
const DOMEvents = {
    init() {
        this.login();
        this.register();
        this.inputs();
    },
    getSession() {
        const session = sessionStorage.getItem('user');
        if(session !== null) {
            const a = document.createElement('a');
            a.href = 'index.html';
            a.click();
        }
    },
    inputs(){
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
            input.addEventListener('keyup', () => {
                const username = document.querySelector('#username');
                const password = document.querySelector('#password');
                const redopassword = document.querySelector('#redopassword');
                const register = document.querySelector('.register');
                register.disabled = !(username.value !== '' && password.value !== '' && redopassword.value !== '');
            });
        });
    },
    register() {
        document.querySelector('.register').addEventListener('click', () => {
            const redopassword = document.querySelector('#redopassword');
            const password = document.querySelector('#password');
            if (redopassword.value !== password.value) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Las contraseñas no coinciden',
                });
            } else {
                fetch('http://localhost:3000/usuario/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: document.querySelector('#username').value,
                        password: document.querySelector('#password').value,
                    })
                }).then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario registrado',
                        showConfirmButton: false,
                        timer: 3000,
                    }).then(() => {
                        if (sessionStorage.getItem('user') !== null) {
                            sessionStorage.removeItem('user');
                        }
                        sessionStorage.setItem('user', JSON.stringify({
                            username: document.querySelector('#username').value,
                            password: document.querySelector('#password').value,
                        }));
                        const a = document.createElement('a');
                        a.href = 'index.html';
                        a.click();
                    });
                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al registrar usuario',
                        footer: error,
                    });
                });
            }
        });

    },
    login() {
        document.querySelector('.login').addEventListener('click', async () => {
            const a = document.createElement('a');
            a.href = 'iniciarsesion.html';
            a.click();
        });
    }
}