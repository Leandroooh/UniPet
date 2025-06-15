import express from "express";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import router from "./routes.js";
import { DataBaseManager } from './controllers/DataBaseManager.js';
import { PetManager } from './controllers/PetManager.js';

// Path Settings
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express Settings
const app = express();
app.use(express.json());

// DataBase Instance
export const Manager = new PetManager();
export const db = new DataBaseManager('http://localhost:3000')

// EJS - Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Pages - Settings
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.use(router);

const PORT = process.env.PORT || 3030;
app.listen(PORT, console.log(`Server has been started at Port ${PORT}`));
