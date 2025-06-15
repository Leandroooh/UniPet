import express from "express";
import { addNewPetRoute, deletePetRoute, getAllPetDataRoute, patchPetRoute } from './services/PetRoutes.js';
import { addNewPet, deletePet, renderPage } from './services/InterfaceRouter.js';

const router = express.Router();

// router.get("/", getAllPetDataRoute);
router.get("/", renderPage);
router.post("/pet/create", addNewPet);
router.post("/pet/delete/:id", deletePet);
router.post("/pet/update/:id", patchPetRoute);

export default router;
