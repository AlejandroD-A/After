import ContenedorFirebase from '../../contenedores/ContenedorFirebase'

export default class FirebaseProductos extends ContenedorFirebase {
  constructor() {
    super('productos')
  }

  listarAll() {
    super.query()
  }
}
