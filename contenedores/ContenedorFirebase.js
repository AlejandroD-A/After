import admin from 'firebase-admin'

import config from '../config.js'

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: ''
})

export default class ContenedorFirebase {
  constructor(collection) {
    this.db = admin.firestore()
    this.query = this.db.collection(collection)
  }

  async listar(id) {
    try {
      const doc = await this.query.doc(id).get()
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
      const snapshot = await this.query.get()
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
      const guardado = await this.query.add(nuevoElem)
      return { ...nuevoElem, id: guardado.id }
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async actualizar() {}

  async borrar() {}

  async borrarTodos() {}
}
