import initUserRoutes from "./user.routes.js";
import initEspeceRoutes from "./espece.routes.js";
import initHabitatRoutes from "./habitat.routes.js";
import initFamilleRoutes from "./famille.routes.js";
import initTemperamentRoutes from "./famille.routes.js";

// Fonction pour initialiser toutes les routes de l'application Express
const initRoutes = (app) => {
    // Appel des fonctions d'initialisation des routes pour chaque domaine
    initUserRoutes(app);
    initEspeceRoutes(app);
    initHabitatRoutes(app);
    initFamilleRoutes(app);
    initTemperamentRoutes(app);
};

export default initRoutes;