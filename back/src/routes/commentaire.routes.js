import express from "express";
import { CommentaireController } from "../controllers/commentaire.controller.js";

// Fonction pour initialiser les routes liées aux commentaires dans l'application Express
const initCommentaireRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des commentaires
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/create", CommentaireController.createCommentaire);
    router.get("/read", CommentaireController.readCommentaires);
    router.get("/:commentaireId", CommentaireController.readOneCommentaire);
    router.put("/:commentaireId", CommentaireController.updateCommentaire);
    router.delete("/:commentaireId", CommentaireController.deleteOneCommentaire);

    // Utilisation du routeur dans l'application avec le préfixe "/commentaire"
    app.use("/commentaire", router);
};

export default initCommentaireRoutes;