import { PetManager } from '../controllers/PetManager.js';

const petInstance = new PetManager();

export const renderPage = async (req, res) => {
    const pets = await petInstance.getAllPets()
    res.status(200).render('index', { pets })
}

export const deletePet = async (req, res) => {

    const { id } = req.params;

    try {
        await petInstance.deletePet(id)

        res.status(200).redirect('/')
    } catch (error) {
        console.log(error.message)
    }
}

export const addNewPet = async (req, res) => {
    const { name, gender, breed, age, guardian, action } = req.body;
    const petData = { name, gender, breed, age, guardian, action }

    try {
        await petInstance.addNewPet(petData)
        res.status(201).redirect('/')
    } catch (error) {
        console.log(error.message)
    }


}