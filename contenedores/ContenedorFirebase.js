import admin from 'firebase-admin'
import { service_account } from '../config'

admin.initializeApp({
  credential: admin.credential.cert(service_account)
})

export default class ContenedorFirebase {
  constructor(collection) {
    this.db = admin.firestore
    this.query = db.collection(collection)
  }

  async listar(id) {
    try {
      const doc = await this.coleccion.doc(id).get()
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`)
      } else {
        const data = doc.data()
        return { ...data, id }
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`)
    }
  }

  async listarAll() {
    try {
      const result = []
      const snapshot = await this.coleccion.get()
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })
      return result
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`)
    }
  }

  async guardar(nuevoElem) {
    try {
      const guardado = await this.coleccion.add(nuevoElem)
      return { ...nuevoElem, id: guardado.id }
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async actualizar() {}

  async borrar() {}

  async borrarTodos() {}
}
