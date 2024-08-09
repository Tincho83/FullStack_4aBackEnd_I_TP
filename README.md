![image](/src/public/img/demo.png)
# BackEnd I - PreEntregable TP1
## _Servidor con endpoints y servicios para gestionar los productos y carritos de compra de un e-commerce._  
  
### Vista previa / Preview
![image](/src/public/img/demo.gif)

### Depliegue / Deploy
[BackEnd I PreEntrega TP1](https://tiendavirtual62310x.netlify.app/)

### Descripcion / Description
Aplicativo Backend para e-commerce realizado en javascript, express para el curso de Backend I en CoderHouse.  


### Construccion / Building
-  Javascript
-  node

# Install nodejs and verify version
   - node --version
   - npm --version

### Dependecias / Dependencies
-  express

## Instalacion / Installation
### Pasos / Steps
- Abrir VS Code / Open Vs Code
- Clonar repositorio / Clone Repository
   -  **git clone git@github.com:Tincho83/FullStack_3ReactJS_TP3C.git**  
   o  
   -  **git clone https://github.com/Tincho83/FullStack_3ReactJS_TP3C.git**

- Acceder a la carpeta del proyecto / Access to project folder
   - **cd FullStack_3ReactJS_TP3C**

- Instalar dependecias / Install dependencies
   - **npm install**
   o instalar dependencias individualmente
   - **npm install @express**

- Instalar otras herramientas / Install others tools
   - **npm install -g nodemon** (instala nodemon de manera global. Esta herramiente reinicia el servidor cuando detecta cambios en el codigo.)
   
- Compilar / Compile
   - **npm run dev** (Para ejecutar en modo desarrollo)
   - **npm run start** (Para ejecutar en modo produccion)

### Estructura del proyecto / Project structure

#### Carpeta raiz del proyecto
   -  **src** (Contiene los fuentes del proyecto)
   -  **.gitignore** (Para uso de git)
   -  **package.json** (Informacion y configuracion del proyecto)
   -  **Readme.md** (Este archivo)   
   -  **node_modules** (No disponible en el repositorio, aparecera cuando instalen las dependencias del proyecto.)

#### Carpeta SRC
   -  **dao** (Objeto de Acceso a Datos (Data Access Object) contiene los administradores para acceso a datos):
      - **CartsManager.js** (Administrador de acceso a datos para ABM del carrito.)
      - **ProductsManager.js**  (Administrador de acceso a datos para ABM de los productos.)
   -  **data** contiene los archivos para la persistencia de la informacion:
      -  **carrito.json** (datos de carritos y sus productos)
      -  **products.json** (datos de los productos)
   - **js** contiene las aplicaciones
      - **app.js** (aplicativo principal)
   - **public** contiene archivos de acceso publico
      - **css** hoja de estilos
      - **img** imagenes
      - **index.html** archivo principal html.
   - **routes** contiene las rutas para los endpoints
      - **carts.router.js** rutas para los endpoints del carrito.
      - **products.router.js** rutas para los endpoints de los productos.


### Contacto
[![N|Solid](/src/public/img/linkedin.png)](https://www.linkedin.com/in/martin-hernandez-9b7154215)
