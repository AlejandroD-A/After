import express, { json, urlencoded } from 'express'
import config from './config.js'
import { carritoApi, productosApi } from './daos/index.js'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
const productosRouter = new express.Router()

let admin = true

const soloAdmins = (req, res, next) => {
  if (admin) {
    return next()
  } else {
    res.status(403).json({ message: 'No tiene acceso a esta ruta' })
  }
}

productosRouter.get('/', async (req, res) => {
  const productos = await productosApi.listarAll()
  res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
  res.json(await productosApi.listar(req.params.id))
})

productosRouter.post('/', soloAdmins, async (req, res) => {
  console.log(req.body)
  res.json(await productosApi.guardar(req.body))
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
  res.json(await productosApi.actualizar(req.body))
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
  res.json(await productosApi.borrar(req.params.id))
})

app.use('/api/productos', productosRouter)

const PORT = config.port

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`)
})
