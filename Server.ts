import express, { Router, Express } from "express";
import cors from 'cors'

import { dbConection } from "./Database/Config";

// Importa las rutas de tus entidades
import { router as RutasUsuarios } from './Routes/Usuarios';
import { router as RutasUnidades } from './Routes/Unidades';
import { router as RutasTiposMantenimientos } from './Routes/TiposMantenimientos';
import { router as RutasRutas } from './Routes/Rutas';
import { router as RutasRoles } from './Routes/Roles';
import { router as RutasRepostajes } from './Routes/Repostajes';
import { router as RutasMantenimientos } from './Routes/Mantenimientos';
import { router as RutasEstablecimientos } from './Routes/Establecimientos';

class Server {
    app: Router;
    router: Router;
    port: number;
    paths: { [key: string]: string };
    private _express: Express;

    constructor() {
        this.app = Router();
        this.router = Router();
        this.port = Number(process.env["PORT"]);
        // Definir las rutas para tus entidades
        this.paths = {
            usuarios: '/api/usuarios',
            unidades: '/api/unidades',
            tiposMantenimientos: '/api/tiposmantenimientos',
            rutas: '/api/rutas',
            roles: '/api/roles',
            repostajes: '/api/repostajes',
            mantenimientos: '/api/mantenimientos',
            establecimientos: '/api/establecimientos',
        };
        this.conectarDb();
        this.middlewares();
        this.routes();
        this.router.use('/noveno', this.app);
        this._express = express().use(this.router);
    }

    private middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    private async conectarDb() {
        await dbConection();
    }
   
    private routes() {
        // Agrega las rutas de tus entidades aquí
        this.app.use(this.paths.usuarios, RutasUsuarios);
        this.app.use(this.paths.unidades, RutasUnidades);
        this.app.use(this.paths.tiposMantenimientos, RutasTiposMantenimientos);
        this.app.use(this.paths.rutas, RutasRutas);
        this.app.use(this.paths.roles, RutasRoles);
        this.app.use(this.paths.repostajes, RutasRepostajes);
        this.app.use(this.paths.mantenimientos, RutasMantenimientos);
        this.app.use(this.paths.establecimientos, RutasEstablecimientos);
    }

    listen() {
        this._express.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}/noveno`);
        });
    }
}

export { Server };
