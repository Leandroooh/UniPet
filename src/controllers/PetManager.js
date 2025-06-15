import { Pet } from '../models/PetModel.js';
import { db } from '../server.js';

const EndPoint = 'pets'

export class PetManager {

    async getAllPets() {
        const data = await db.getAllData(EndPoint)
        return data
    }

    //  data = Object com name, species, breed, age, guardian
    async addNewPet(data) {
        if (!data || typeof data !== "object") {
            throw new Error("[Error] É necessário que todas as informações sejam preenchidas corretamente!");
        }

        const { name, gender, breed, age, guardian, action } = data;
        const PetModel = new Pet(name, gender, breed, age, guardian, action)

        try {
            await db.createItem(EndPoint, PetModel);
            console.log("Pet adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar pet:", error.message);
        }
    }

    async deletePet(id) {

        if (!id) {
            throw new Error("[Error] É necessário que o ID seja informado!");
        }

        const existingPet = await db.getDataById(EndPoint, id);

        if (!existingPet) {
            throw new Error("[Error] Pet não encontrado!");
        }

        try {
            await db.deleteItem(EndPoint, id)
        } catch (error) {
            console.error("Erro ao deletar pet:", error.message);
        }

    }

    //  data = Object com name, age  ou guardian
    async patchPet(id, data) {
        if (!id || !data || Object.keys(data).length === 0) {
            throw new Error("[Error] É necessário fornecer pelo menos um campo para atualização!");
        }

        try {
            const existingPet = await db.getDataById(EndPoint, id);

            if (!existingPet) {
                throw new Error("[Error] Pet não encontrado!");
            }

            // Criando um objeto com apenas os campos editáveis
            const allowedFields = ["name", "age", "guardian"];
            const updatedPet = { ...existingPet };

            for (const key of Object.keys(data)) {
                if (allowedFields.includes(key) && data[key] !== undefined) {
                    updatedPet[key] = data[key];
                }
            }

            await db.updateItem(EndPoint, id, updatedPet);
        } catch (error) {
            console.log(error.message);
        }
    }



}