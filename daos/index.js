//IMPORTAR DAOS

import FirebaseProductos from './productos/firebaseProductos.js'

let productosApi
let carritoApi

productosApi = new FirebaseProductos()

//REALIZAR SWITCH e instanciar DAO segun  la persistencia

export { productosApi, carritoApi }
