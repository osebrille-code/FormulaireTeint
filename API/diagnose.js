// --- api/diagnose.js : Votre Logiciel Serveur Secret ---

// =========================================================
// 1. BASE DE DONNÉES PRODUITS (Nécessaire au calcul)
// =========================================================
const SHOP_ROOT = "https://komigo.me/soniabonnefoy_vfvnvb/";
const LINKS = {
  FOUNDATION_LIQUID:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-SerumFoundation-Alaari",
  FOUNDATION_BB:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-BBTinted-FairLight",
  FOUNDATION_CREME:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-CreamFoundation-1C_P",
  FOUNDATION_POWDER:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-PressedPowder-Cabretta",
  BASE_ILLUMINATING:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-IlluminatingPrimer",
  POWDER_PRIME_SET:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-PrimeSetPowder",
  SPRAY: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-PrimeSetMist",
  SKINCARE_YOUTH:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-YouthplexionNightSerum",
  SKINCARE_GLOW:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-GlowplexionSerum",
  SKINCARE_UPLIFT:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-UpliftBeautyOil",
  SKINCARE_GEL:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-YouologyDayMoisturizer",
  SKINCARE_MASK:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-RoyaltyDetoxMask",
  EYE_CREAM:
    "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-YouniversalEyeCream",
  EYE_MASK: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-EyeMask",
  CONCEALER: SHOP_ROOT,
};

const PRODUCTS_DB = [
  { id: "fdt_mineral", name: "FDT Sérum TOUCH (Liquide)", category: "Teint", desc: "Couvrance modulable, fini poudré.", url: LINKS.FOUNDATION_LIQUID, },
  { id: "fdt_bb", name: "Crème Teintée BARE·YOU", category: "Teint", desc: 'Couvrance légère, fini "dewy".', url: LINKS.FOUNDATION_BB, },
  { id: "fdt_poudre", name: "FDT Poudre Compacte TOUCH", category: "Teint", desc: "Sans talc. Fini velours.", url: LINKS.FOUNDATION_POWDER, },
  { id: "fdt_creme", name: "FDT Crème Compacte TOUCH", category: "Teint", desc: "Fini satiné, haute couvrance.", url: LINKS.FOUNDATION_CREME, },
  { id: "base_illu", name: "Base Illuminatrice", category: "Base", desc: "Lumière & Hydratation.", url: LINKS.BASE_ILLUMINATING, },
  { id: "youth", name: "Sérum YOUTHPLEXION", category: "Soin Profond", desc: "Booster collagène.", url: LINKS.SKINCARE_YOUTH, },
  { id: "uplift", name: "Sérum UPLIFT Beauty", category: "Soin Tenseur", desc: "Lisse et raffermit.", url: LINKS.SKINCARE_UPLIFT, },
  { id: "glow", name: "Sérum GLOWPLEXION", category: "Soin Eclat", desc: "Cible les imperfections.", url: LINKS.SKINCARE_GLOW, },
  { id: "gel", name: "Gel Rafraîchissant", category: "Soin", desc: "Hydratation légère.", url: LINKS.SKINCARE_GEL, },
  { id: "detox", name: "Masque Détoxifiant", category: "Soin", desc: "Régule le sébum.", url: LINKS.SKINCARE_MASK, },
  { id: "eye_cream", name: "Contour des Yeux Youniversal", category: "Soin Yeux", desc: "Hydrate et lisse les cernes.", url: LINKS.EYE_CREAM, },
  { id: "eye_mask", name: "Patchs Contour des Yeux", category: "Soin Yeux", desc: "Hydrate & Décongestionne.", url: LINKS.EYE_MASK, },
  { id: "concealer", name: "Correcteur Skin Perfecting", category: "Correction", desc: "Camouflage cernes.", url: LINKS.CONCEALER, },
  { id: "powder_prime", name: "Poudre Prime & Set", category: "Finition", desc: "Eau encapsulée.", url: LINKS.POWDER_PRIME_SET, },
  { id: "spray", name: "Brume Prime & Set", category: "Finition", desc: "Fixation extrême.", url: LINKS.SPRAY, },
];


// =========================================================
// 2. FONCTIONS DE CALCUL DES TEINTES (Le secret)
// =========================================================

const calculateShadeName = (tone, undertone) => {
    if (tone === "VeryFair") return undertone === "Froid" ? "Scarlet" : "Swan";
    if (tone === "Fair")
      return undertone === "Froid"
        ? "Organza"
        : undertone === "Chaud"
        ? "Lace"
        : "Velour";
    if (tone === "Medium")
      return undertone === "Froid"
        ? "Chiffon"
        : undertone === "Chaud"
        ? "Satin"
        : "Eyelet";
    if (tone === "Dark")
      return undertone === "Froid"
        ? "Alaari"
        : undertone === "Chaud"
        ? "Velvet"
        : "Charmeuse";
    if (tone === "Deep")
      return undertone === "Froid"
        ? "Azlon"
        : undertone === "Chaud"
        ? "Sanyan"
        : "Suede";
    return "Taffeta";
  };

const calculateCreamCode = (tone, undertone) => {
    let letter = "N";
    if (undertone === "Froid") letter = "C";
    if (undertone === "Chaud") letter = "W";
    let number = "2";
    if (tone === "VeryFair") number = "1";
    if (tone === "Fair") number = "2";
    if (tone === "Medium") number = "4";
    if (tone === "Dark") number = "7";
    if (tone === "Deep") number = "9";
    return `${number}${letter}`;
  };

const analyzeProfile = (answers) => {
    let recs = [];
    let isComplex = false;
    let reason = "";
    let warning = "";

    // 1. DÉTERMINATION DU SOUS-TON
    const votes = { Chaud: 0, Froid: 0, Neutre: 0 };
    if (answers.sun && answers.sun !== "Inconnu")
      votes[
        answers.sun === "Brûle"
          ? "Froid"
          : answers.sun === "Bronze"
          ? "Chaud"
          : "Neutre"
      ]++;
    if (answers.jewelry && answers.jewelry !== "Inconnu")
      votes[
        answers.jewelry === "Argent"
          ? "Froid"
          : answers.jewelry === "Or"
          ? "Chaud"
          : "Neutre"
      ]++;
    if (answers.veins === "Bleues") votes.Froid++;
    else if (answers.veins === "Vertes") votes.Chaud++;
    else if (answers.veins === "Mix") votes.Neutre++;

    let uTone = "Neutre";
    if (votes.Chaud > votes.Froid && votes.Chaud > votes.Neutre)
      uTone = "Chaud";
    else if (votes.Froid > votes.Chaud && votes.Froid > votes.Neutre)
      uTone = "Froid";
    else uTone = "Neutre";


    // 2. CALCUL DE LA TEINTE
    let calculatedShade = "";
    if (answers.preference === "Creme") {
      calculatedShade = calculateCreamCode(answers.tone, uTone);
    } else if (answers.preference === "BB") {
      if (answers.tone === "VeryFair") calculatedShade = "Fair Light";
      else if (answers.tone === "Fair") calculatedShade = "Light";
      else if (answers.tone === "Medium") calculatedShade = "Light Medium";
      else calculatedShade = "Medium";
    } else {
      calculatedShade = calculateShadeName(answers.tone, uTone);
    }

    // 3. LOGIQUE PRODUITS & AJUSTEMENTS
    let finalProduct = "";
    const isRiskOrange = [
      "Taffeta",
      "Satin",
      "Velvet",
      "Cypress",
      "Charmeuse",
    ].includes(calculatedShade);

    if (answers.preference === "Poudre") {
      if (isRiskOrange) {
        finalProduct = "fdt_mineral";
        warning = `⚠️ Je t'ai orientée vers le Sérum car la Poudre ressort trop orangée sur les teintes ${calculatedShade}.`;
      } else if (calculatedShade === "Eyelet") {
        finalProduct = "fdt_poudre";
        calculatedShade = "Chiffon";
        warning = "ℹ️ Correspondance Poudre : Chiffon.";
      } else if (calculatedShade === "Jacquard") {
        finalProduct = "fdt_poudre";
        calculatedShade = "Linen";
        warning = "ℹ️ Correspondance Poudre : Linen.";
      } else {
        finalProduct = "fdt_poudre";
      }
    } else if (answers.preference === "BB") {
      finalProduct = "fdt_bb";
    } else if (answers.preference === "Creme") {
      finalProduct = "fdt_creme";
    } else {
      finalProduct = "fdt_mineral";
    }


    // 4. DÉTERMINATION DES RECOMMANDATIONS SOINS
    const conditions = Array.isArray(answers.skinCondition)
      ? answers.skinCondition
      : [answers.skinCondition];
    if (conditions.includes("Mature")) {
      recs.push(PRODUCTS_DB.find((p) => p.id === "uplift"));
      recs.push(PRODUCTS_DB.find((p) => p.id === "youth"));
    } else if (
      conditions.includes("Imperfections") ||
      answers.skinType === "Grasse"
    ) {
      recs.push(PRODUCTS_DB.find((p) => p.id === "glow"));
      if (answers.skinType === "Grasse")
        recs.push(PRODUCTS_DB.find((p) => p.id === "detox"));
    } else if (conditions.includes("Déshydratée")) {
      recs.push(PRODUCTS_DB.find((p) => p.id === "youth"));
    } else {
      recs.push(PRODUCTS_DB.find((p) => p.id === "gel"));
    }
    
    // Base et FDT
    recs.push(PRODUCTS_DB.find((p) => p.id === "base_illu"));
    recs.push(PRODUCTS_DB.find((p) => p.id === finalProduct));

    // Accessoires/Correcteurs
    if (answers.concern === "Cernes") {
      recs.push(PRODUCTS_DB.find((p) => p.id === "concealer"));
      recs.push(PRODUCTS_DB.find((p) => p.id === "eye_cream"));
      recs.push(PRODUCTS_DB.find((p) => p.id === "eye_mask"));
    }
    if (
      answers.skinType === "Grasse" ||
      answers.concern === "Pores" ||
      answers.concern === "Tenue"
    )
      recs.push(PRODUCTS_DB.find((p) => p.id === "powder_prime"));
    if (answers.concern === "Tenue" && answers.skinType === "Sèche")
      recs.push(PRODUCTS_DB.find((p) => p.id === "spray"));


    // 5. DÉTERMINATION DU STATUT COMPLEXE
    if (answers.tone === "Deep" && answers.sun === "Brûle") {
      isComplex = true;
      reason = "Incohérence Teint/Soleil.";
    }
    const unknownCount = Object.values(answers).filter(
      (v) => v === "Inconnu"
    ).length;
    if (unknownCount >= 2) {
      isComplex = true;
      reason = "Trop d'incertitudes.";
    }


    // 6. PRÉPARATION DU RÉSULTAT FINAL
    const finalRecs = recs.filter(r => r); 

    return {
      shadeCalculated: calculatedShade,
      statusCalculated: isComplex ? "complex" : "standard",
      alert: warning || reason,
      recommendations: finalRecs, 
      // On retourne le sous-ton calculé pour l'envoi à Make (si nécessaire)
      analysisForMake: {
          undertoneCalculated: uTone,
      }
    };
};

// =========================================================
// 3. FONCTION SERVEUR PRINCIPALE (Endpoint Vercel)
// =========================================================

/**
 * Fonction Serverless exécutée par Vercel.
 * Elle reçoit les réponses du quiz et renvoie le diagnostic secret.
 */
export default async function handler(req, res) {
  // Sécurité: Accepter seulement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { answers } = req.body; 

  if (!answers) {
    return res.status(400).json({ error: 'Missing quiz answers.' });
  }

  try {
    // Exécution de l'algorithme SECRET
    const result = analyzeProfile(answers); 

    // Renvoyer les résultats au Front-end (App.js)
    res.status(200).json(result); 

  } catch (error) {
    // Gérer les erreurs internes
    console.error("Erreur dans la fonction diagnose.js:", error);
    res.status(500).json({ error: 'Internal Server Error during diagnosis.' });
  }
}
