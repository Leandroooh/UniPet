import { PetManager } from '../controllers/PetManager.js';


const petInstance = new PetManager();

export const getAllPetDataRoute = async (req, res) => {
    const allPetData = await petInstance.getAllPets();

    if (!allPetData || !Array.isArray(allPetData) || allPetData.length === 0) {
        res.status(404).send({ error: "Database is empty" });
        return;
    }

    console.log(allPetData)
    res.send({ allPetData });
};

export const addNewPetRoute = async (req, res) => {

    const { name, gender, breed, age, guardian, action } = req.body;
    const newPetData = { name, gender, breed, age, guardian, action }

    await petInstance.addNewPet(newPetData)
    res.status(201).send({ Success: 'Pet added!' })
}

export const deletePetRoute = async (req, res) => {
    const { id } = req.params;

    await petInstance.deletePet(id)
    res.status(200).send('Pet deleted!')

}

export const patchPetRoute = async (req, res) => {
    const { id } = req.params;
    const { name, guardian, age } = req.body

    const data = { name, guardian, age }

    try {
        await petInstance.patchPet(id, data)
        res.status(200).redirect('/')
    } catch (error) {
        console.log(error.message)
    }
}