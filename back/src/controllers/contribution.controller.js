import { ContributionDB } from "../databases/contribution.database.js";

// Fonction pour créer une contribution
const createContribution = async(req, res) => {
    const {
        date_creation,
        validation,
        user_id,
        id_espece,
        nom_commun,
        nom_scientifique,
        description,
        taille_max,
        alimentation,
        temperature,
        dificulte,
        cree_le,
        id_temperament,
        id_categorie,
        id_habitat,

    } = req.body;

    const response = await ContributionDB.createContribution(date_creation, validation,
        user_id, id_espece, nom_commun, nom_scientifique, description, taille_max,
        alimentation, temperature, dificulte, cree_le, id_temperament, id_categorie,
        id_habitat);
    const result = response.result;

    return res.status(201).json({ message: "OK", contributions: result });
};

// Fonction pour récupérer toutes les contributions
const readContributions = async(req, res) => {
    const contributionResponse = await ContributionDB.readContributions();
    const contributions = contributionResponse.result;

    return res.status(200).json({ message: "OK", contributions });
};

// Fonction pour récupérer une contribution spécifique
const readOneContribution = async(req, res) => {
    const id_contribution = req.params.id_contribution;

    const response = await ContributionDB.readOneContribution(id_contribution);
    const result = response.result;

    const contribution = {
        id_contribution,
        date_creation: result[0].date_creation,
        validation: result[0].validation,
        user_id: result[0].user_id,
        id_espece: result[0].id_espece,
        nom_commun: result[0].nom_commun,
        nom_scientifique: result[0].nom_scientifique,
        description: result[0].description,
        taille_max: result[0].taille_max,
        alimentation: result[0].alimentation,
        temperature: result[0].temperature,
        dificulte: result[0].dificulte,
        cree_le: result[0].cree_le,
        id_temperament: result[0].id_temperament,
        id_categorie: result[0].id_categorie,
        id_habitat: result[0].id_habitat,
    };

    return res.status(200).json({ message: "Requête OK", contribution });
};

// Fonction pour modifier une contribution
const updateContribution = async(req, res) => {
    const {
        date_creation,
        validation,
        user_id,
        id_espece,
        nom_commun,
        nom_scientifique,
        description,
        taille_max,
        alimentation,
        temperature,
        dificulte,
        cree_le,
        id_temperament,
        id_categorie,
        id_habitat,
        id_contribution
    } = req.body;

    const response = await ContributionDB.updateContribution(date_creation, validation,
        user_id, id_espece, nom_commun, nom_scientifique, description, taille_max,
        alimentation, temperature, dificulte, cree_le, id_temperament, id_categorie,
        id_habitat, id_contribution);

    if (response.error) {
        return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: `La contribution numéro ${id_contribution} a été modifiée` });
};

// Fonction pour modifier la validation d'une contribution (webmaster uniquement)
const updateValidation = async(req, res) => {
    if (req.user.role !== 'webmaster') {
        return res.status(403).json({ message: "Accès non autorisé. Réservé au webmaster." });
    }

    const { id_contribution, validation } = req.body;

    const response = await ContributionDB.updateValidation(id_contribution, validation);

    if (response.error) {
        return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: `La validation de la contribution ${id_contribution} a été mise à jour` });
};

// Fonction pour supprimer une contribution
const deleteOneContribution = async(req, res) => {
    const id_contribution = req.params.id_contribution;

    const response = await ContributionDB.deleteOneContribution(id_contribution);
    const error = response.error;

    if (error) {
        return res.status(500).json({ message: error });
    } else {
        return res.status(200).json({ message: "Contribution supprimée" });
    }
};

// Exportation des fonctions du contrôleur
export const ContributionController = {
    createContribution,
    readContributions,
    readOneContribution,
    updateContribution,
    updateValidation,
    deleteOneContribution,
};