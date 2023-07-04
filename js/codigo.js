    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('serviceWorker.js')
        .then(registration=>{console.log('Registro SW exitoso',registration);})
        .catch(rejeted =>{console.error('Error al registrar SW',rejeted);})
    }
//Fin registro SW
const mis_criptos = document.getElementById('mis_criptos');
let eliminar_cripto, criptos;
const listado_cripto = document.getElementById('listado_cripto');
const selectedCrypto = document.getElementById("crypto-select");
const cryptocantidad = document.getElementById("crypto-amount");
const valorAlAnadir = document.getElementById("crypto-value");
const botonAgregar = document.getElementById('anadir-cripto');

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
    const col4_btn = document.createElement('td');
    const btn_agregar = document.createElement('button');
    const btn_span = document.createElement('span');
  
    //col1_id.innerText = id;
    colNombre.className = 'nombre_tabla';
    img.src = imagen;
    img.alt = nombre;
    nombreCripto.innerText = nombre;
    simbol.innerText = simbolo;

 
    btn_agregar.className = 'btn-app';
    btn_agregar.innerText = 'Agregar';
    btn_span.innerText = ' a favoritos';
  
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
  
    btn_agregar.appendChild(btn_span);
    col4_btn.appendChild(btn_agregar);
    contenedor.appendChild(col4_btn);

    if (listado_cripto) {
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
  if (selectedCrypto) {
    selectedCrypto.appendChild(option);
  }
};

    /**
 * Inserta un valor dependiendo del select al input hidden
 * @param {number} value - valor de la criptomoneda
 */
const anadirValorHidden = value => {
    if (valorAlAnadir) {
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

  let criptosFavoritas = localStorage.getItem('criptosFavoritas');
  if (criptosFavoritas) {
    criptosFavoritas = JSON.parse(criptosFavoritas);
    criptosFavoritas.push(criptoData);
  } else {
    criptosFavoritas = [criptoData];
  }

  localStorage.setItem('criptosFavoritas', JSON.stringify(criptosFavoritas));
};


fetch(`https://api.coingecko.com/api/v3/coins/`)
  .then((res) => res.json())
  .then((res) => {
    console.log(res[0]);
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

      if (selectedCrypto) {
        if (criptomoneda.id === selectedCrypto.value) {
            valorParaELHidden = criptomoneda.market_data.current_price.usd;
          }
      }
    });
    // llama a la función anadirValorHidden con la respuesta res
    anadirValorHidden(valorParaELHidden);

    // agrega un evento de cambio al select
    if (selectedCrypto) {
        selectedCrypto.addEventListener("change", () => {
            valorParaELHidden = res.find(criptomoneda => criptomoneda.id === selectedCrypto.value).market_data.current_price.usd;
          // llama a la función anadirValorHidden con la respuesta res y el valor seleccionado del select
          anadirValorHidden(valorParaELHidden);
        });
    }
  });

  if (botonAgregar) {
    botonAgregar.addEventListener('click',()=>{
        datosAnadirCripto(selectedCrypto.value,cryptocantidad.value,valorAlAnadir.value);
      })
  }