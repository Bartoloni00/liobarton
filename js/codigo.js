const mis_criptos = document.getElementById('mis_criptos');
let eliminar_cripto, criptos;
const listado_cripto = document.getElementById('listado_cripto');
const selectedCrypto = document.getElementById("crypto-select");
const cryptocantidad = document.getElementById("crypto-amount");
const valorAlAnadir = document.getElementById("crypto-value");
const botonAgregar = document.getElementById('anadir-cripto');
const criptos_del_usuario = document.getElementById('app_listado_cripto');

/**
 * Crea la tabla que listara las criptos en el HTML para luego el usuario pueda agregarlas como favoritas
 * @param {string} imagen - imagen
 * @param {string} simbolo - codigo de la criptomodena
 * @param {string} nombre - nombre de la criptomoneda
 * @param {number} precio - cantidad que posee el usuario
 * @param {number} capitalizacion - valor actual de la criptomoneda
 * @param {number} id - valor actual de la criptomoneda
 * 
 */
const crear_fila_cripto = (imagen, simbolo, nombre, precio, capitalizacion) => {
    const contenedor = document.createElement('tr');
   // const col1_id = document.createElement('td');
    const colNombre = document.createElement('td');
    const img = document.createElement('img');
    const nombreCripto = document.createElement('h3');
    const simbol = document.createElement('span');
    const col2_precio = document.createElement('td');
    const col3_capi = document.createElement('td');
    //const col4_btn = document.createElement('td');
    // const btn_agregar = document.createElement('button');
    // const btn_span = document.createElement('span');
  
    //col1_id.innerText = id;
    colNombre.className = 'nombre_tabla';
    img.src = imagen;
    img.alt = nombre;
    nombreCripto.innerText = nombre;
    simbol.innerText = simbolo;

 
    // btn_agregar.className = 'btn-app';
    // btn_agregar.innerText = 'Agregar';
    // btn_span.innerText = ' a favoritos';
  
    //contenedor.appendChild(col1_id);
  
    colNombre.appendChild(img);
    colNombre.appendChild(nombreCripto);
    colNombre.appendChild(simbol);
    contenedor.appendChild(colNombre);
  
    col2_precio.innerText =`USD ${precio}`;
    contenedor.appendChild(col2_precio);
  
    col3_capi.innerText =`USD ${capitalizacion}`;
    col3_capi.className = 'capitalizacion'
    contenedor.appendChild(col3_capi);
  
    // btn_agregar.appendChild(btn_span);
    // col4_btn.appendChild(btn_agregar);
    //contenedor.appendChild(col4_btn);

    if (listado_cripto != undefined) {
        listado_cripto.appendChild(contenedor);
    }
  }
/*
<tr> contenedor
        <td>1</td> col1_id
        <td class="nombre_tabla"> colNombre
            <img src="" alt=""> img
            <h3></h3> nombreCripto
            <span></span> simbolo
        </td>
        <td>29000</td> col2_precio
        <td>Capitalizacion</td> col3_capi
        <td><button class="btn-app">Agregar<span> a favoritos</span></button></td>
    </tr>
*/
/**
 * Crea y agrega un option al select del formulario de agregar criptomonedas.
 * @param {string} id - id de la criptomoneda
 * @param {string} nombre - nombre de la criptodivisa
 */
const crearOption = (id, name) => {
  const option = document.createElement("option");
  option.value = id;
  option.innerText = name;
  if (selectedCrypto != undefined) {
    selectedCrypto.appendChild(option);
  }
};

/**
 * Inserta un valor dependiendo del select al input hidden
 * @param {number} value - valor de la criptomoneda
 */
const anadirValorHidden = value => {
    if (valorAlAnadir != undefined) {
        valorAlAnadir.value = value;
    }
};


/**
*Guarda los datos de la criptomoneda agregada en el localStorage.
* @param {string} cripto - ID de la criptomoneda.
* @param {number} cantidad - Cantidad de la criptomoneda.
* @param {number} valor - Valor de la criptomoneda al momento de agregarla.
*/
const datosAnadirCripto = (cripto, cantidad, valor) => {
  const fecha_anadida = new Date().toISOString();
  const criptoData = {
    id_cripto: cripto,
    cantidad_de_criptos: cantidad,
    valor_al_momento_de_agregarla: valor,
    fecha_anadida: fecha_anadida,
  };

  let criptos_del_usuario = localStorage.getItem('criptos_del_usuario');
  if (criptos_del_usuario) {
    criptos_del_usuario = JSON.parse(criptos_del_usuario);
    criptos_del_usuario.push(criptoData);
  } else {
    criptos_del_usuario = [criptoData];
  }

  localStorage.setItem('criptos_del_usuario', JSON.stringify(criptos_del_usuario));
  cryptocantidad.valor = 0;
};


/**
 * Calcula el ROI y te devuelve un porcentaje con una cola de 2 digitos.
 * @param {number} ganancia - Monto actual de la inversion
 * @param {number} costo - Inversion inicial
 * @returns El porcentaje que resulto del calculo añadiendo un signo + o - dependiendo si es positivo o negativo
 */
const roi = (ganancia,costo)=>{
  let calculo = ((ganancia - costo)/costo) * 100;
      calculo = calculo.toFixed(2);
  if (calculo > 0) {
    return `+${calculo}%`;
  } else {
    return calculo+'%';
  }
}
/**
 * Crea la tabla de las criptomonedas a las que el usuario desea realizar un seguimiento
 * @param {string} img - img de la cript (api)
 * @param {string} cripto - nombre de la cripto (localstorage)
 * @param {number} cantidad - cantidad de criptomonedas del usuario (localstorage) 
 * @param {number} valorViejo - valor al momento de agregar la cripto (localstorage)
 * @param {number} ValorActual - valor actual de la cripto (api)
 */
const crearFila = (img,cripto,cantidad,valorViejo,valorActual) => {
  // Crear elementos HTML
  let tr = document.createElement('tr');
  let td1 = document.createElement('td');
  let imgDOM = document.createElement('img');
  let span = document.createElement('span');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  
  valorViejo = cantidad * valorViejo;
  valorActual = cantidad * valorActual;

  // Establecer atributos y contenido
  imgDOM.src = img; 
  imgDOM.alt = `${cripto} icon`;
  imgDOM.width = '50px';
  span.innerText = cripto;
  td1.appendChild(imgDOM);
  td1.appendChild(span);
  td2.className = 'capitalizacion';
  td2.innerText = `USD ${valorViejo.toFixed(2)}`;
  td3.className = 'capitalizacion';
  td3.innerText = `USD ${valorActual.toFixed(2)}`;
  td4.innerText = roi(valorActual, valorViejo);

  // Construir la fila
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  
  // Agregar la fila al DOM
  if(criptos_del_usuario != undefined){
    criptos_del_usuario.appendChild(tr);
  }
};

/**
 * Muestra las criptos del usuario en el DOM.
 * @param {Array} apiData - Datos de la API de criptos.
 */
const mostrar_criptos_del_usuario = (apiData) => {
  let img, valorViejo, valorActual, cantidad, nombre;

  // Limpiar el contenido existente en el contenedor de criptos del usuario
  if (criptos_del_usuario != undefined) {
    criptos_del_usuario.innerHTML = '';
  }

  // Obtener los datos almacenados en el LocalStorage
  let data = localStorage.getItem('criptos_del_usuario');
  data = JSON.parse(data);

  // Verificar si hay datos en el LocalStorage
  if (data != null) {
    data.forEach(criptos => {
      // Obtener la cantidad de criptos y redondear a 5 decimales
      cantidad = parseFloat(criptos.cantidad_de_criptos);
      cantidad = parseFloat(cantidad.toFixed(5));

      // Obtener el nombre de la cripto y el valor al momento de agregarla
      nombre = criptos.id_cripto;
      valorViejo = criptos.valor_al_momento_de_agregarla;

      // Buscar la información actualizada de la cripto en los datos de la API
      apiData.forEach(criptoApi => {
        if (nombre === criptoApi.id) {
          // Obtener la imagen y el valor actual de la cripto desde la API
          img = criptoApi.image.small;
          valorActual = criptoApi.market_data.current_price.usd;

          // Crear la fila y agregarla al DOM
          crearFila(img, nombre, cantidad, valorViejo, valorActual);
        }
      });
    });
  }
};


/*
<tr> 
                        <td>
                          <img src="img/icon-192x192.png" alt="" width="50px">
                          <span>Bitcoin</span>
                        </td> 
                        <td class="capitalizacion"> 16534</td>
                        <td class="capitalizacion">16534</td>
                        <td>+139%</td>
                      </tr> */
// Llamar a la función para crear la fila
//crearFila('img/logo.png','bitcoin',3, 16539,32040);
if (navigator.onLine) {
  
fetch(`https://api.coingecko.com/api/v3/coins/`)
.then((res) => res.json())
.then((res) => {
  //console.log(res[0]);
  mostrar_criptos_del_usuario(res);
  let valorParaELHidden;//valor que usaremos posteriormente para darselo a la funcion anadirValorHidden
  res.forEach((criptomoneda) => {
    crear_fila_cripto(
      criptomoneda.image.small,
      criptomoneda.symbol,
      criptomoneda.name,
      criptomoneda.market_data.current_price.usd,
      criptomoneda.market_data.market_cap.usd
    );
    crearOption(criptomoneda.id, criptomoneda.name);

    if (selectedCrypto != undefined) {
      if (criptomoneda.id === selectedCrypto.value) {
          valorParaELHidden = criptomoneda.market_data.current_price.usd;
        }
    }
  });
  // llama a la función anadirValorHidden con la respuesta res
  anadirValorHidden(valorParaELHidden);

  // agrega un evento de cambio al select
  if (selectedCrypto != undefined) {
      selectedCrypto.addEventListener("change", () => {
          valorParaELHidden = res.find(criptomoneda => criptomoneda.id === selectedCrypto.value).market_data.current_price.usd;
        // llama a la función anadirValorHidden con la respuesta res y el valor seleccionado del select
        anadirValorHidden(valorParaELHidden);
      });
  }
});

if (botonAgregar != undefined) {
  botonAgregar.addEventListener('click',()=>{
      datosAnadirCripto(selectedCrypto.value,cryptocantidad.value,valorAlAnadir.value);
      fetch(`https://api.coingecko.com/api/v3/coins/`)
.then((res) => res.json())
.then((res) => {
  mostrar_criptos_del_usuario(res);
})

    })
}
}else{
  let div = document.createElement('div');
  let img = document.createElement('img');
  img.src = 'img/no_conexion.svg';
  img.alt = 'No posees conexion a internet';
  let p = document.createElement('p');
  p.innerText = 'NO posees conexion a internet en este momento';

  div.appendChild(img);
  div.appendChild(p);
  if (listado_cripto != undefined) {
    listado_cripto.appendChild(div);
  }

  // const crearFilaOffline = () => {
  //   // Obtener datos de localStorage
  //   const cripto = localStorage.getItem('id_cripto');
  //   const cantidad = localStorage.getItem('cantidad_de_criptos');
  //   const valorViejo = localStorage.getItem('valor_al_momento_de_agregarla');

  //   // Crear elementos HTML
  //   let tr = document.createElement('tr');
  //   let td1 = document.createElement('td');//nombre de la cripto
  //   let td2 = document.createElement('td');//cantidad del usuario
  //   let td3 = document.createElement('td');// valor al momento de agregarla
    
  //   // Establecer atributos y contenido
  //   td1.innerText = cripto;
  //   td2.innerText = cantidad;
  //   td3.innerText = valorViejo;
  
  //   // Construir la fila
  //   tr.appendChild(td1);
  //   tr.appendChild(td2);
  //   tr.appendChild(td3);
    
  //   // Agregar la fila al DOM
  //   if(criptos_del_usuario != undefined){
  //     criptos_del_usuario.appendChild(tr);
  //   }
  // };
  // crearFilaOffline()
}
//Instalar PWA
  const btnInstall = document.getElementById('instalar');
  let eventInstall;
  window.addEventListener('beforeinstallprompt',event =>{
    event.preventDefault();
    eventInstall = event;
    if (btnInstall != undefined) {//comprobamos la existencia del elemento en la pagina
      btnInstall.style.display = 'inline-block';
      btnInstall.addEventListener('click',instalarApp);
    }
  })
  let instalarApp = ()=>{
    if (eventInstall != undefined) {
      eventInstall.prompt();
      eventInstall.userChoice
                  .then(res=>{
                    if(res.outcome == 'accepted'){
                      console.log('El usuario acepto instalar');
                      btnInstall.style.display = 'none';
                    }else{
                      console.log('El usuario no acepto la instalacion');
                    }
                  })
    }
  }
// Compartir PWA
const btnCompartir = document.getElementById('CompartirPWA');
if(navigator.share){//consultamos si existe la api share en el objeto navigator
  if (btnCompartir != undefined) {
    btnCompartir.style.display = 'inline-block';
    btnCompartir.addEventListener('click',()=>{
      const shareInfo = {
        title: 'Liobarton PWA',
        text: 'Seguimiento de criptomonedas',
        ulr:'http://localhost/liobarton/',
      };
      navigator.share(shareInfo)
              .then(()=>{
                console.log('compartiendo PWA');
              })
              .catch(error=>{
                console.error(error);
              })
    }
  )
  }
}
//Notificaciones Push
if (window.Notification) {//comprobamos que el navegador tiene soporte a notificaciones
  if (Notification.permission !== 'denied') {
    setTimeout(() => {
      Notification.requestPermission()
                // .then(permisos =>{
                //   if(permisos === 'granted'){
                //     console.log('El usuario acepto, realizamos la suscripcion al servidor');
                //   }else{
                //     console.log('El usuario no acepto recibir notificaciones');
                //   }
                // })
    }, 5000);
  }
}