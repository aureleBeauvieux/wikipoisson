import express from "express";
import { HabitatController } from "../controllers/habitat.controller.js";

// Fonction pour initialiser les routes liées aux habitats dans l'application Express
const initHabitatRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des habitats
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/create", HabitatController.createHabitat);
    router.get("/read", HabitatController.readHabitats);
    router.get("/:habitatId", HabitatController.readOneHabitat);
    router.put("/:habitatId", HabitatController.updateHabitat);
    router.delete("/:habitatId", HabitatController.deleteOneHabitat);

    // Utilisation du routeur dans l'application avec le préfixe "/habitat"
    app.use("/habitat", router);
};

export default initHabitatRoutes;