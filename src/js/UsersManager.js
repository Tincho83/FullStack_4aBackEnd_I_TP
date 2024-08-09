class UsersManager {
    static usuarios = [];

    static getUsuarios() {
        return this.usuarios
    }

    static addUsuario(nombre, email, password) {
        //Validaciones
        if (typeof nombre !== "string" || typeof email !== "string" || typeof password !== "string") {
            console.log(`Argumentos invalidos`);
            return;
        }

        if (!nombre.trim() || !email.trim() || !password.trim()) {
            console.log(`Complete los datos`);
            return;
        }

        let regExMail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
        //let res=reCorto.test('prueba@correo.com') // true
        //console.log(res)
        if (!regExMail.test(email)) {
            console.log("Mail invalido");
            return;
        }

        let existe=UsersManager.usuarios.find(usuario=>usuario.email===email)
        if(existe){
            console.log(`Usuario de correo existente. ${email}`);
            return;
        }
        // resto
        //Al agregar productos es necesario fijar un valor inicial de id para el arreglo nuevo, si el arreglo ya contiene datos el id debe ser autoincremental. 
        let id = 1;
        if (this.usuarios.length > 0) {
            id = Math.max(...UsersManager.usuarios.map(iden=>iden.id)) + 1;
        }

        let nuevoUsuario={
            id,
            nombre,
            email,
            password
        }

        UsersManager.usuarios.push(nuevoUsuario);
        console.log("Usuario Creado");
    }

}


console.log(UsersManager.getUsuarios());
UsersManager.addUsuario(100, "m@m.com", "123");
UsersManager.addUsuario(" ", "m@m.com", "123");
UsersManager.addUsuario("m", "m@m.com", "123");
console.log(UsersManager.getUsuarios());

console.log(__dirname);

//clase 4 1:40