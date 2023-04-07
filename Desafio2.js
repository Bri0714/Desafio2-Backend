/*realizar un clase productmager que gestione un conjunto de porductos*/
// al hablar de gestionar es un CRUD
// Create, Read, Update, Delete
// Create: crear un producto
// Read: leer un producto
// Update: actualizar un producto
// Delete: eliminar un producto
// vamos a crear una clase que se llame ProductManager
// vamos a crear un constructor

//ahora las porpiedades

const fs = require('fs')

const filename = './Desafio2.txt'

class ProductManager {
    
    constructor() {
        this.products = [];
        //this.index = 0
    }


    generateID = () => {
        if (this.products.length === 0) return 1
        return this.products[this.products.length - 1].id + 1
    }

    getProducts = () => {
        return this.products
    }

    addProducts = (tittle, description, thumbnail, price, code, stock) => {

        //this.index++
        const id = this.generateID()
        const events = { id, tittle, description, thumbnail, price, code, stock }

        const codeRepeat = this.products.find((product) => product.code === code)
        if (codeRepeat) {
            return console.log('el codigo ya existe')
        }

        //validar que todas las propiedades sean obligatorias  y que el codigo no se repita

        if (!tittle || !description || !thumbnail || !price || !code || !stock) {
            return console.log('faltan datos en las propiedades')
        }
        this.products.push(events)

    }

    //metodo para encontrar producto psandole el id
    getProductById = (id) => {
        const product = this.products.find((product) => product.id === id)
        if (product === undefined) {
            console.error('ERROR NOT FOUND')
        }
        return product

    }

    //metodo para actualizar producto updateProduct y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
    updateProduct = (id, tittle, description, thumbnail, price, code, stock) => {
        const product = this.products.find((product) => product.id === id)
        if (product === undefined) {
            console.error('ERROR NOT FOUND')
        }
        product.tittle = tittle
        product.description = description
        product.thumbnail = thumbnail
        product.price = price
        product.code = code
        product.stock = stock
        return product
    }

    //metodo para eliminar el producto deleteProduct
    deleteProduct = (id) => {
        const product = this.products.find((product) => product.id === id)
        if (product === undefined) {
            console.error('ERROR NOT FOUND')
        }
        const index = this.products.indexOf(product)
        this.products.splice(index, 1)
        return this.products
    }

}




const productos = new ProductManager()

productos.addProducts('ropa deportiva', ' camiseta real madrid', '/img/barcelona.jpg', 200000, 'AF25', 2000)
productos.addProducts('ropa deportiva', ' camiseta real madrid', '/img/real.jpg', 200000, 'AF27', 2000)
productos.addProducts('ropa deportiva', ' camiseta real madrid', '/img/real.jpg', 200000, 'AF26', 2000)



fs.writeFileSync(filename , JSON.stringify(productos, null , '\t'))

productos.updateProduct(1, 'camiseta', 'camiseta real madrid', '/img/real.jpg', 200000, 'AF25', 2000)

fs.writeFileSync(filename , JSON.stringify(productos, null , '\t'))

productos.deleteProduct(1)

fs.writeFileSync(filename , JSON.stringify(productos, null , '\t'))

productos.addProducts('ropa deportiva', ' camiseta chelsea', '/img/chelsea.jpg', 40000, 'AF29', 3000)

fs.writeFileSync(filename , JSON.stringify(productos, null , '\t'))

productos.getProducts()


const contenido = JSON.parse(fs.readFileSync(filename,'UTF-8','\t'))
console.log(contenido)

productos.getProducts()

//console.log(productos.getProductById(1))
//console.log(productos.getProducts())
//console.log(productos.addProducts())
//console.log(productos.updateProduct(1, 'camiseta', 'camiseta real madrid', '/img/real.jpg', 200000, 'AF25', 2000))
//console.log(productos.getProducts())
//console.log(productos.deleteProduct(1))


