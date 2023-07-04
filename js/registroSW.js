if('serviceWorker' in navigator){
    navigator.serviceWorker.register('serviceWorker.js')
    .then(registration=>{console.log('Registro SW exitoso',registration);})
    .catch(rejeted =>{console.error('Error al registrar SW',rejeted);})
}