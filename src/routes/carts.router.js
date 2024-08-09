const { Router } = require("express");
const CartsManager = require("../dao/CartsManager.js");

const router = Router();

CartsManager.path = "./src/data/carrito.json";


// Listar todos los carritos de la base y su contenido. Incluye uso de limit y skip.
// Ejemplo sin limit y skip: (App: Posman Metodo: GET tipo: JSON): http://localhost:8080/api/carts
// Ejemplo con limit y skip: (App: Posman Metodo: GET tipo: JSON): http://localhost:8080/api/carts?limit=2&skip=2
router.get("/", async (req, res) => {
    let carts;

    try {
        carts = await CartsManager.getCarts();
    } catch (error) {
        console.log(error);
        res.setHeader('Content-type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor, vuelva a intentar mas tarde.`,
            detalle: `${error.message}`
        });
    }

    let { limit, skip } = req.query;

    if (limit) {
        limit = Number(limit);
        if (isNaN(limit)) {
            res.setHeader('Content-type', 'application/json');
            return res.status(400).json({ error: `El argumento limit debe ser numerico.` });
        }
    } else {
        limit = carts.length;
    }

    if (skip) {
        skip = Number(skip);
        if (isNaN(skip)) {
            res.setHeader('Content-type', 'application/json');
            return res.status(400).json({ error: `El argumento skip debe ser numerico.` });
        }
    } else {
        skip = 0;
    }

    console.log("\r\n\n**********************************************************");
    console.log("url: ", req.url);
    console.log("params: ", req.params);
    console.log("query: ", req.query);
    console.log("limit: ", limit);
    console.log("Obtener Listado Productos. ");
    console.log("Listado Productos:\r\n ", carts);
    console.log("**********************************************************\r\n");

    let resultado = carts.slice(skip, skip + limit);

    res.setHeader('Content-type', 'application/json');
    return res.status(200).json({ resultado });
});


// Listar solo el carrito con el id proporcionado.
// Ejemplo: (App: Posman Metodo: GET tipo: JSON): http://localhost:8080/api/carts/2
router.get("/:cid", async (req, res) => {
    let { cid } = req.params;
    cid = Number(cid);

    console.log("\r\n\n**********************************************************");
    console.log("url: ", req.url);
    console.log("params: ", req.params);
    console.log("query: ", req.query);
    console.log("Obtener Carrito. ");

    if (isNaN(cid)) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: `Debe ingresar un Id numerico.` });
    }

    let carts;

    try {
        carts = await CartsManager.getCarts();
    } catch (error) {
        console.log(error);
        res.setHeader('Content-type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor, vuelva a intentar mas tarde.`,
            detalle: `${error.message}`
        });
    }

    let cart = carts.find(idc => idc.id === cid);

    if (!cart) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: `ID Cart ${cid} not found.` });
    }

    // "cart.products" para solo los productos del carrito proporcionado, si se desea ver todos los atributos usar "cart"
    console.log("Producto: ", cart.products);
    console.log("**********************************************************\r\n");

    res.setHeader('Content-type', 'application/json');
    return res.status(200).json({ payload: cart.products });

});


// Agregar un nuevo carrito.
// Notas: Id autoincremental (No pasar desde el Body). products es un arreglo que contendra los objetos de productos. 
// Ejemplo (App: Posman Metodo: POST Opcion: BODY SubOpcion: RAW tipo: JSON): url: http://localhost:8080/api/carts
// {"products": [] }  *** Manejo de Error
// {"products": [ { "id": "10", "quantity": 1 }  ] }
router.post("/", async (req, res) => {

    console.log("\r\n\n**********************************************************");
    console.log("url: ", req.url);
    console.log("params: ", req.params);
    console.log("query: ", req.query);
    console.log("body: ", req.body);
    console.log("Crear un carrito. ");

    const { products = [] } = req.body;
    console.log("products: ", products);

    //Validaciones
    // campo obligatorio
    if (!products) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: 'Por favor agregue productos al carrito.' });
    }

    if (products.length === 0) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: 'Por favor agregue productos al carrito.' });
    }

    let carts = await CartsManager.getCarts();

    //Al agregar producto nuevo es necesario fijar un valor inicial de id para el arreglo nuevo,
    //si el arreglo ya contiene datos el id debe ser autoincremental. 
    let id = 1;
    if (carts.length > 0) {
        id = carts[carts.length - 1].id + 1;
    }



    //...validar todo lo que se necesite 

    try {
        //let prodnuevo = await ProductsManager.addProduct({ name, ...restoatributos });
        //...........let prodnuevo = await ProductsManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
        let cartnuevo = await CartsManager.addCart({ products });

        console.log("Carrito Nuevo: ", cartnuevo);
        console.log("**********************************************************\r\n");

        res.setHeader('Content-type', 'application/json');
        return res.status(200).json({ cartnuevo });

    } catch (error) {
        console.log(error);
        console.log("**********************************************************\r\n");

        res.setHeader('Content-type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor, vuelva a intentar mas tarde.`,
            detalle: `${error.message}`
        });
    }

    nombres = `${nombres} ${nombreBody}`.trim();

    res.setHeader('Content-type', 'application/json');
    return res.status(200).send(nombres);

});

// Agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato: product [id producto], quantity [cantidad unidades del producto]
// Ejemplo (App: Posman Metodo: POST Opcion: BODY SubOpcion: RAW tipo: JSON): url: http://localhost:8080/api/carts
//{"products": [ { "id": "10", "quantity": 1 }  ] }
router.post("/:cid/product/:pid", async (req, res) => {

    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    try {
        await CartsManager.addProductToCart(cid, pid);
        res.status(200).send('Producto agregado al carrito');
    } catch (error) {
        res.status(500).send('Error al agregar el producto al carrito');
    }

















    

    console.log("Carrito Id: ", cid);
    console.log("Product Id: ", pid);

    console.log("\r\n\n**********************************************************");
    console.log("url: ", req.url);
    console.log("params: ", req.params);
    console.log("query: ", req.query);
    console.log("body: ", req.body);
    console.log("Crear un carrito. ");

    cartManager.addProductToCart(cid, pid);
    res.send('Producto agregado al carrito');


    const { products = [] } = req.body;
    console.log("products: ", products);

    //Validaciones
    // campo obligatorio
    if (!products) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: 'Por favor agregue productos al carrito.' });
    }

    if (products.length === 0) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: 'Por favor agregue productos al carrito.' });
    }

    let carts = await CartsManager.getCarts();

    //Al agregar producto nuevo es necesario fijar un valor inicial de id para el arreglo nuevo,
    //si el arreglo ya contiene datos el id debe ser autoincremental. 
    let id = 1;
    if (carts.length > 0) {
        id = carts[carts.length - 1].id + 1;
    }



    //...validar todo lo que se necesite 

    try {
        //let prodnuevo = await ProductsManager.addProduct({ name, ...restoatributos });
        //...........let prodnuevo = await ProductsManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
        let cartnuevo = await CartsManager.addCart({ products });

        console.log("Carrito Nuevo: ", cartnuevo);
        console.log("**********************************************************\r\n");

        res.setHeader('Content-type', 'application/json');
        return res.status(200).json({ cartnuevo });

    } catch (error) {
        console.log(error);
        console.log("**********************************************************\r\n");

        res.setHeader('Content-type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor, vuelva a intentar mas tarde.`,
            detalle: `${error.message}`
        });
    }

    nombres = `${nombres} ${nombreBody}`.trim();

    res.setHeader('Content-type', 'application/json');
    return res.status(200).send(nombres);

});









// Actualizar producto desde campos del body. Falta Terminar
// Ejemplo (App: Posman Metodo: PUT Opcion: BODY SubOpcion: RAW tipo: JSON): url: http://localhost:8080/api/products/25 {"name":"Batwatin", "alias":"Dock Grison"}
// {"title":"Queso Windy", "description":"Queso Cremoso", "code":"QuesoAR", "price":14000, "stock": 3, "category": "Queso"}
router.put("/:pid", async (req, res) => {
    console.log("url: ", req.url);
    console.log("params: ", req.params);

    let { pid } = req.params;
    pid = Number(pid);
    if (isNaN(pid)) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: `Debe ingresar un Id numerico.` });
    }

    let prods;
    try {
        prods = await ProductsManager.getProducts();
    } catch (error) {
        console.log(error);
        res.setHeader('Content-type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor, vuelva a intentar mas tarde.`,
            detalle: `${error.message}`
        });
    }

    let prod = prods.find(idp => idp.id === pid);

    if (!prod) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: `ID Product ${pid} not found.` });
    }

    let { ...aModificar } = req.body; // tambien puede ser let aModificar = req.body;

    delete aModificar.id;

    // validaciones pertinentes

    if (aModificar.name) {
        let existe = prods.find(prod => prod.name.toLowerCase() === aModificar.name.toLowerCase() && prod.id !== pid);

        if (existe) {
            res.setHeader('Content-type', 'application/json');
            return res.status(400).json({ error: `Name Product ${aModificar.name} ya existe.` });
        }
    }

    try {
        let prodModific = await ProductsManager.updateProduct(pid, aModificar);
        res.setHeader('Content-type', 'application/json');
        return res.status(200).json({ prodModific });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor, vuelva a intentar mas tarde.`,
            detalle: `${error.message}`
        });

    }

});


// Borra producto con el id proporcionado.
router.delete("/:pid", async (req, res) => {

    let { pid } = req.params;
    pid = Number(pid);
    if (isNaN(pid)) {
        res.setHeader('Content-type', 'application/json');
        return res.status(400).json({ error: `Debe ingresar un Id numerico.` });
    }

    console.log("\r\n\n**********************************************************");
    console.log("url: ", req.url);
    console.log("params: ", req.params);
    console.log("Id: ", pid);
    console.log("Borrar un Producto. ");

    try {
        let prodresult = await ProductsManager.deleteProduct(pid);
        console.log("**********************************************************\r\n");
        if (prodresult > 0) {
            res.setHeader('Content-type', 'application/json');
            return res.status(200).json({ payload: `Producto Id ${pid} eliminado.` });
        } else {
            res.setHeader('Content-type', 'application/json');
            return res.status(500).json({ error: `Error al eliminar.` });
        }

    } catch (error) {
        console.log(error);
        console.log("**********************************************************\r\n");
        res.setHeader('Content-type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor, vuelva a intentar mas tarde.`,
            detalle: `${error.message}`
        });

    }









});


module.exports = { router };

