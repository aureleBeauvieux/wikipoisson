import express from "express";
import { CommentaireController } from "../controllers/commentaire.controller.js";

// Fonction pour initialiser les routes liées aux commentaires dans l'application Express
const initCommentaireRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des commentaires
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/create", CommentaireController.createCommentaire);
    router.get("/read", CommentaireController.readCommentaires);
    router.get("/:id_commentaire", CommentaireController.readOneCommentaire);
    router.put("/:id_commentaire", CommentaireController.updateCommentaire);
    router.delete("/:id_commentaire", CommentaireController.deleteOneCommentaire);

    // Utilisation du routeur dans l'application avec le préfixe "/commentaire"
    app.use("/commentaire", router);
};

export default initCommentaireRoutes;