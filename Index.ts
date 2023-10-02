import { config } from "dotenv";
config();

import { Server } from "./Server";

const server = new Server();
server.listen();
