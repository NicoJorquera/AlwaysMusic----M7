const { Client } = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'AlwaysMusic',
    password: '',
    port: 5432
};

const client = new Client(config);
client.connect();

const args = process.argv.slice(2);

if(args[0] == 'nuevo') {
    async function ingresar (nombre, rut, curso, nivel) {
        const res = await client.query(
            `insert into estudiantes (nombre, rut, curso, nivel) values ('${nombre}', '${rut}', '${curso}', '${nivel}') returning *;`
        );
        console.log(`${res.rows[0].nombre} fue ingresado con éxito`);
        client.end();
    };
    ingresar(args[1], args[2], args[3], args[4]);
};

if(args[0] == 'consulta') {
    async function consultar () {
        const res = await client.query(
            `select * from estudiantes`
        );
        console.log('Registro actual ', res.rows);
        client.end();
    };
    consultar();
};

if(args[0] == 'editar') {
    async function editar (nombre, rut, curso, nivel) {
        const res = await client.query(
            `update estudiantes set nombre = '${nombre}', rut = '${rut}', curso = '${curso}', nivel ='${nivel}' where rut = '${rut}' returning *; `
        );
            console.log(`Estudiante ${res.rows[0].nombre} editado con éxito`);
            client.end();
    };
    editar(args[1], args[2], args[3], args[4]);
};

if(args[0] == 'rut') {
    async function consultar_rut (rut) {
        const res = await client.query(
            `select * from estudiantes where rut = '${rut}'`
        );
        console.log(res.rows[0]);
        client.end();
    };
    consultar_rut(args[1]);
};

if(args[0] == 'eliminar') {
    async function eliminar (rut) {
        const res = await client.query(
            `delete from estudiantes where rut ='${rut}' returning *;`
        );
        console.log(`Registro de estudiante con rut ${res.rows[0].rut} eliminado`);
        client.end();
    };
    eliminar(args[1]);
};