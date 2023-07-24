document.addEventListener('DOMContentLoaded', () => {
    DOMEvents.init();
});

const DOMEvents = {
    init() {
        this.loadEmpleos().then(() => {
        });
        this.getSession();
        this.search();
        this.notificacion();
    },
    notificacion() {
        document.querySelector('.badge').addEventListener('click', () => {
            Swal.fire({
                icon: 'info',
                title: 'Notificaciones',
                text: 'Te has suscrito a las notificaciones',
            });
        });
    },
    clear() {
        const empleos = document.querySelector('.empleos');
        empleos.innerHTML = '';
        const boxDescription = document.querySelector('.box-description');
        boxDescription.innerHTML = '';
    },
    search() {
        const search = document.querySelector('.search');
        search.addEventListener('click', async (e) => {
            this.clear();
            const busqueda = document.querySelector('#busqueda');
            const json = {
                description: busqueda.value,
                fecha: Number(document.querySelector('#fecha').value)
            }
            if(busqueda.value === '' && json.fecha === 0) {
                await this.loadEmpleos();
            }else{
            await this.loadEmpleos(JSON.stringify(json));
            }
        });
    },
    getSession() {
        const session = sessionStorage.getItem('user');
        if (session === null) {
            const a = document.createElement('a');
            a.href = 'iniciarsesion.html';
            a.click();
        }
    },
    async loadEmpleos(filter = "") {
        let response;
        if(filter === ""){
            response = await fetch('http://localhost:3000/empleos/');
        }else{
        response = await fetch('http://localhost:3000/empleos/get/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: filter
            }
        );
        }
        console.log(response)
        const data = await response.json();
        if (data.length === 0) {
            const empleos = document.querySelector('.empleos');
            empleos.innerHTML = '<div class="text-center w-100">No hay datos para mostrar</div>';
            const boxDescription = document.querySelector('.box-description');
            boxDescription.innerHTML = '<div class="text-center w-100">No hay datos para mostrar</div>';
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontraron resultados',
            });
            return;
        }
        const empleos = document.querySelector('.empleos');
        data.forEach((empleo) => {
            let hours;
            let texttime;
            const li = document.createElement('li');
            const currentDate = new Date().toISOString().slice(0, 10);
            const date1 = new Date(empleo["fecha"]);
            const date2 = new Date(currentDate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            hours = Math.floor(diffTime / (1000 * 60 * 60));
            if (hours < 24) {
                texttime = `hace ${hours} horas`;
            } else {
                texttime = `hace ${diffDays} dias`;
            }
            li.classList.add('d-flex');
            li.id = empleo["id"];
            li.addEventListener('click', (e) => {
                const allLi = document.querySelectorAll('.empleos li');
                allLi.forEach((li) => {
                    li.classList.remove('li-active');
                });
                e.currentTarget.classList.add('li-active');
                const boxDescription = document.querySelector('.box-description');
                boxDescription.innerHTML = `
                <div class="container">
                    <div class="box-header d-flex flex-column">
                        <span class="box-list-title">${empleo["titulo"]}</span>
                        <span class="box-list-description">${empleo["descripcion"]}</span>
                        <span class="box-list-clasification">
                          <span class="text-primary text-capitalize me-1">${empleo["empresa"]}</span>
                          <i class="fa fa-star" style="color:#ffc100;"></i>
                          <span class="fw-bold">3.9</span>
                        </span>
                      <div class="w-100 d-flex align-items-center gap-2">
                        <button class="btn btn-primary fs-5 mt-2 p-1" id="postularme${empleo["id"]}">Postularme</button>
                          <img alt="..." class="box-list-image mt-2" src="${empleo["imagen"]}"/>
                      </div>
                    </div>
                    <hr>
                  <div class="box-body">
                    ${empleo["informacion"]}
                  </div>
                  <hr>
                  <div class="box-footer">
                    <span class="box-list-description">Acerca de esta empresa</span>
                    <div>
                      <span class="box-list-time">Esta es una empresa muy grande</span>
                    </div>
                  </div>
                </div>
                `;
                document.getElementById('postularme' + empleo["id"]).addEventListener('click', async (e) => {
                    Swal.fire({
                        title: 'Postulación',
                        text: "Se ha postulado a este empleo correctamente",
                        icon: 'success',
                        showCancelButton: false,
                        timer: 3000,
                    });
                });
            });
            li.innerHTML = `
              <div class="d-flex flex-column w-100">
                <span class="box-list-priority">${empleo["prioridad"] === 0 ? '' : 'Se precisa Urgente'}</span>
                <span class="box-list-title">${empleo["titulo"]}</span>
                <span class="box-list-description">
                  ${empleo["descripcion"]}
                </span>
                <span class="box-list-time">${texttime}</span>
              </div>
              <div class="w-auto d-flex align-items-center p-2">
                <div>
                ${
                empleo["imagen"] ? `<img alt="..." class="box-list-image" style="width: 4rem" src="${empleo["imagen"]}">` : ''
            }
                </div>
              </div>`;
            empleos.appendChild(li);

        });

        const firstLi = document.querySelector('.empleos li');
        firstLi.click();
    }
}