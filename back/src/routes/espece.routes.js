import express from "express";
import { EspeceController } from "../controllers/espece.controller.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";

// Fonction pour initialiser les routes liées aux especes dans l'application Express
const initEspeceRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des especes
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/create", checkAdmin, EspeceController.createEspece);
    router.get("/read", EspeceController.readEspeces);
    router.get("/:id_espece", EspeceController.readOneEspece);
    router.put("/:id_espece", checkAdmin, EspeceController.updateEspece);
    router.delete("/:id_espece", checkAdmin, EspeceController.deleteOneEspece);

    // Utilisation du routeur dans l'application avec le préfixe "/espece"
    app.use("/espece", router);
};

export default initEspeceRoutes;