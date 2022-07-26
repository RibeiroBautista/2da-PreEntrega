import fs from "fs"
import Contenedor from "./contenedor.utils.js";
const baseProductos = new Contenedor();

class Compras{
    constructor(){
        this.archivo = "dbCompras";
    }
    async createCart () {
        const id = await import('nanoid').then(module =>{ return module.nanoid(5)});
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        const nuevoCarrtio = {id: id, timestamp: new Date().toLocaleString("fr-FR"), productos: []};
        listadoCompras.push(nuevoCarrtio);
        await fs.promises.writeFile('./src/utils/dbCompras.json', JSON.stringify(listadoCompras));
        return id
    }
    async deleteOneCart (idCart) {
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        const indiceEncontrado = listadoCompras.findIndex((carrito) => {
            return carrito.id === idCart;
        });
        let resultado = '';
        if (indiceEncontrado >= 0){
            listadoCompras.splice(indiceEncontrado, 1);
            await fs.promises.writeFile('./src/utils/dbCompras.json', JSON.stringify(listadoCompras));
            resultado = 'Producto eliminado';
        } else {
            resultado = 'Carrito no encontrado';
        }
        return resultado
    }
    async listProducts (idCart) {
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        const indiceEncontrado = listadoCompras.findIndex((carrito) => {
            return carrito.id === idCart;
        });
        let resultado = '';
        if (indiceEncontrado >= 0){
            resultado = listadoCompras[indiceEncontrado].productos;
        } else {
            resultado = 'Carrito no encontrado';
        }
        return resultado
    }
    async addProductToCart (idCart, idProducto) {
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        const indiceEncontrado = listadoCompras.findIndex((carrito) => {
            return carrito.id === idCart;
        });
        let resultado = '';
        if (indiceEncontrado >= 0){
            let productFromBase = await baseProductos.getById(idProducto.id);
            if (!!productFromBase && productFromBase != 'Producto no encontrado'){
                listadoCompras[indiceEncontrado].productos.push(productFromBase);
                await fs.promises.writeFile('./src/utils/dbCompras.json', JSON.stringify(listadoCompras));
                resultado = 'Producto agregado correctamente';
            } else {
                resultado = 'Carrito correcto, pero producto no existe';
            }
        } else {
            resultado = 'Carrito no encontrado';
        }
        return resultado
    }
    async deleteOneFromCart (idCart, idProducto) {
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        const indiceEncontrado = listadoCompras.findIndex((carrito) => {
            return carrito.id === idCart;
        });
        let resultado = '';
        if (indiceEncontrado >= 0){
            const indiceEncontradoProducto = listadoCompras[indiceEncontrado].productos.findIndex((producto) => {
                return producto.id == idProducto;
            });
            if (indiceEncontradoProducto >= 0){
                listadoCompras[indiceEncontrado].productos.splice(indiceEncontradoProducto, 1);
                await fs.promises.writeFile('./src/utils/dbCompras.json', JSON.stringify(listadoCompras));
                resultado = 'Producto eliminado del carrito correctamente';
            } else {
                resultado = 'Carrito correcto, pero producto no existe';
            }
        } else {
            resultado = 'Carrito no encontrado';
        }
        return resultado
    }
}

export default Compras;