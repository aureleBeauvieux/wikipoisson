import express from "express";
import { TemperamentController } from "../controllers/temperament.controller.js";

// Fonction pour initialiser les routes liées aux temperaments dans l'application Express
const initTemperamentRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des temperaments
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/create", TemperamentController.createTemperament);
    router.get("/read", TemperamentController.readTemperaments);
    router.get("/:temperamentId", TemperamentController.readOneTemperament);
    router.put("/:temperamentId", TemperamentController.updateTemperament);
    router.delete("/:temperamentId", TemperamentController.deleteOneTemperament);

    // Utilisation du routeur dans l'application avec le préfixe "/temperament"
    app.use("/temperament", router);
};

export default initTemperamentRoutes;