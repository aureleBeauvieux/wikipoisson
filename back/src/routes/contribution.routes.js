import express from "express";
import { ContributionController } from "../controllers/contribution.controller.js";

// Fonction pour initialiser les routes liées aux contributions dans l'application Express
const initContributionRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des contributions
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/create", ContributionController.createContribution);
    router.get("/read", ContributionController.readContributions);
    router.get("/user/:userId", ContributionController.readUserContributions); //user ??? 
    router.get("/:id_contribution", ContributionController.readOneContribution);
    router.put("/:id_contribution", ContributionController.updateContribution);
    router.delete("/:id_contribution", ContributionController.deleteOneContribution);

    // Utilisation du routeur dans l'application avec le préfixe "/contribution"
    app.use("/contribution", router);
};

export default initContributionRoutes;