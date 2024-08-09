/*
* Clase: ProductManager.js
* Descripcion: Administrador de Productos
* Autor: MH
* Fecha: 19/07/2024
*/

const fs = require('fs');

class ProductManager {
    
	//Contructor para nueva instancia de ProductManager.
	constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
		
        //Comprobar que todas las propiedades sean brindadas.
        if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.log(`Todos los campos son obligatorios.`);
            return;
        }

        //Validaciones
		//Almacenamos en variable si el codigo de producto existe. 
        let prodCodExiste = this.products.find(producto => producto.code === code);

        //Comprobar si el codigo de prod existe de antes.
        if (prodCodExiste) {
            console.log(`El producto codigo: ${code} , ya existe.`);
            return;
        }

		//Al agregar productos es necesario fijar un valor inicial de id para el arreglo nuevo, si el arreglo ya contiene datos el id debe ser autoincremental. 
        let id = 1;
        if (this.products.length > 0) {            
            id = this.products[this.products.length - 1].id + 1;
        }

        //Agregar Productos
		// Cada nuevo producto cuenta con las propiedades informadas y id autoincrementable
        let prodNuevo = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        //Agrega Producto
        this.products.push( prodNuevo );
    }

    getProducts() {
        return this.products;
    }

	    getProductById(id) {
            
        let producto = this.products.find(producto => producto.id === id);
        if (!producto) {
			console.log('Not Found.');
			console.error(`No existen productos con el id ${id}`);
            return;
        } else {            
            console.log(`Producto encontrado, id: ${id} `);
			return producto;
        }
    }

}

const PM = new ProductManager();

// Para error: Todos los campos son obligatorios
PM.addProduct("Leche Entera", "Leche Entera 1 Lt", 875.60, "https://repo/tienda/lecheentera.png", "LTS-LE001");

// Carga de Productos
//              Title           Description         Price    Thumbnail                             Code       Stock
PM.addProduct("Leche Entera", "Leche Entera 1 Lt", 875.60, "https://repo/tienda/lecheentera.png", "LTS-LE001", 7);
PM.addProduct("Leche Descremada", "Leche Descremada 1 Lt", 925.00, "https://repo/tienda/lechedescremada.png", "LTS-LD001", 5);
PM.addProduct("Queso Cremoso", "Queso Cremoso 2kg", 14925.00, "https://repo/tienda/quesocremoso.png", "LTS-QC001", 3);

// Para error: El producto codigo ABC, ya existe
PM.addProduct("Leche Entera", "Leche Entera 1 Lt", 875.60, "https://repo/tienda/lecheentera.png", "LTS-LE001", 3);


//Mostrar todos los productos
console.log('Todos los productos');
console.log(PM.getProducts());

//Mostrar producto con ID
console.log('Buscado producto id X');
console.log(PM.getProductById(3));

//Para error al no encontrar producto con ID indicado
console.log('Buscado producto id X (no existente)');
console.log(PM.getProductById(7));
