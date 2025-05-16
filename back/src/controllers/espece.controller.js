import { EspeceDB } from "../databases/espece.database.js";

// Fonction pour créer un espece
const createEspece = async(req, res) => {
    // Extraction des données de la requête
    const {
        nom_commun,
        nom_scientifique,
        description,
        taille_max,
        alimentation,
        temperature,
        dificulte,
        cree_le,
        modifie_le,
        id_temperament,
        id_categorie,
        id_habitat,
        id_contribution_valide,
    } = req.body;

    // Appel à la fonction de la base de données pour créer un espece
    const response = await EspeceDB.createEspece(
        nom_commun,
        nom_scientifique,
        description,
        taille_max,
        alimentation,
        temperature,
        dificulte,
        cree_le,
        modifie_le,
        id_temperament,
        id_categorie,
        id_habitat,
        id_contribution_valide,
    );
    const result = response.result;

    // Retour d'une réponse avec le statut 201 (Créé) et les données du espece créé
    return res.status(201).json({ message: "OK", especes: result });
};

// Fonction pour récupérer tous les especes
const readEspeces = async(req, res) => {
    // Appel à la fonction de la base de données pour récupérer tous les especes
    const especeResponse = await EspeceDB.readEspeces();
    const especes = especeResponse.result;

    // Retour d'une réponse avec le statut 200 (OK) et les données des especes
    return res.status(200).json({ message: "OK", especes });
};

// Fonction pour récupérer un espece spécifique par son identifiant
const readOneEspece = async(req, res) => {
    // Extraction de l'identifiant du espece à partir des paramètres de la requête
    const id_espece = req.params.id_espece;

    // Appel à la fonction de la base de données pour récupérer un espece spécifique par son identifiant
    const response = await EspeceDB.readOneEspece(id_espece);
    const result = response.result;

    // Création d'un objet représentant le espece avec des propriétés spécifiques
    const espece = {
        id_espece,
        nom_commun: result[0].nom_commun,
        nom_scientifique: result[0].nom_scientifique,
        description: result[0].description,
        taille_max: result[0].taille_max,
        alimentation: result[0].alimentation,
        temperature: result[0].temperature,
        dificulte: result[0].dificulte,
        cree_le: result[0].cree_le,
        modifie_le: result[0].modifie_le,
        id_temperament: result[0].id_temperament,
        id_categorie: result[0].id_categorie,
        id_habitat: result[0].id_habitat,
        id_contribution_valide: result[0].id_contribution_valide,
    };

    // Retour d'une réponse avec le statut 200 (OK) et les données du espece spécifié
    return res.status(200).json({ message: "Requête OK", espece });
};

// Fonction pour modifier un espece ???
const updateEspece = async(req, res) => {
    // Extraction des données de la requête
    const {
        nom_commun,
        nom_scientifique,
        description,
        taille_max,
        alimentation,
        temperature,
        dificulte,
        cree_le,
        modifie_le,
        id_temperament,
        id_categorie,
        id_habitat,
        id_contribution_valide,
        id_espece
    } = req.body;

    // Appel à la fonction de la base de données pour mettre à jour un espece
    const response = await EspeceDB.updateEspece(
        nom_commun,
        nom_scientifique,
        description,
        taille_max,
        alimentation,
        temperature,
        dificulte,
        cree_le,
        modifie_le,
        id_temperament,
        id_categorie,
        id_habitat,
        id_contribution_valide,
        id_espece
    );

    // Vérification des erreurs lors de la mise à jour
    if (response.error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: response.error });
    }

    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un espece indiquant la mise à jour réussie
    return res.status(200).json({ message: `L'espece numéro ${id_espece} a été modifié` });
};

// Fonction pour supprimer un espece par son identifiant
const deleteOneEspece = async(req, res) => {
    // Extraction de l'identifiant du espece à partir des paramètres de la requête
    const id_espece = req.params.id_espece;

    // Appel à la fonction de la base de données pour supprimer un espece
    const response = await EspeceDB.deleteOneEspece(id_espece);

    // Récupération d'une éventuelle erreur
    const error = response.error; // soit une chaîne de caractères, soit null

    // Vérification de la présence d'une erreur
    if (error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: error });
    } else {
        // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un espece indiquant la suppression réussie
        return res.status(200).json({ message: "Espece supprimé" });
    }
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des especes
export const EspeceController = {
    createEspece,
    readEspeces,
    readOneEspece,
    updateEspece,
    deleteOneEspece,
};