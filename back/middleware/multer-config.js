//*========================================================
//*=============== MULTER IMAGES - MIDDLEWARE =============
//*========================================================

/* Notes : 
- multer est un package de gestion de fichiers.
- Sa méthode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.
- Sa méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), 
et les enregistre au système de fichiers du serveur à l'aide du storage configuré. */

// Importer Multer : 
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Objet de configuration pour Multer
const storage = multer.diskStorage({
    // L'objet de configuration passé à .diskStorage a besoin de 2 éléments :
    // 1. Destination explique où enregistrer les fichiers 
    destination: (req, file, callback) => {
        // Appel du callback ; argument null = pas d'erreur ; + nom du dossier de réception
        callback(null, 'public/images');
    },
    // 2. FILENAME = le nom de fichiers à utiliser (on ne doit pas utiliser les noms d'origine)
    // Fonction (requête, fichier, fonction callback)
    filename: (req, file, callback) => {
        // Configurer nouveau nom fichier (originalname donne accès au nom d'origine)\
        // Remplacer les " " (espaces) par des "_" (underscores) : .split(' ').join('_')
        const name = file.originalname.split(' ').join('_');
        // Appliquer une extension au fichier, on récupère le "mimetype" de chaque fichier 
        // Créer une dictionnaire de "mimetypes" (ligne 35)
        const extension = MIME_TYPES[file.mimetype];
        // Appel callback : null = pas d'erreur | name + timestamp (milliseconde = unique) + . (point) + extension)
        callback(null, name + Date.now() + '.' + extension);
    }
});

/* 2. Nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image. */

module.exports = multer({ storage: storage }).single('image');
/* module.exports =
- Appel méthode "multer"
- ({ notre objet storage })
- Appel méthode ".single" = notre fichier est unique
- Expliquer à "multer" qu'il sagit de fichier image uniquement

Enfin, appliquer multer aux routes SAUCE*/
