import express from "express";
import { FamilleController } from "../controllers/famille.controller.js";

// Fonction pour initialiser les routes liées aux familles dans l'application Express
const initFamilleRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des familles
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/create", FamilleController.createFamille);
    router.get("/read", FamilleController.readFamilles);
    router.get("/:familleId", FamilleController.readOneFamille);
    router.put("/:familleId", FamilleController.updateFamille);
    router.delete("/:familleId", FamilleController.deleteOneFamille);

    // Utilisation du routeur dans l'application avec le préfixe "/famille"
    app.use("/famille", router);
};

export default initFamilleRoutes;