import React, { useState } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Lock,
  User,
  CheckCircle2,
  Mail,
  ShoppingBag,
  CheckSquare,
  ClipboardList,
} from "lucide-react";

// --- 1. TES LIENS KOMIGO ---
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

// --- 2. CONFIGURATION AUTOMATISATION ---
// C'est ici que tu colles l'adresse que Make va te donner
const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/on3dp8ol1rk0pymb8fo67mpewz98yg86";

// Lien vers l'Instagram DM (Modifié selon la demande)
const INSTAGRAM_DM_LINK = "https://ig.me/m/sonia_bonnefoy"; // REMPLACER PAR LE VRAI LIEN

// --- 3. BASE DE DONNÉES PRODUITS (Icônes supprimées) ---
const PRODUCTS_DB = [
  {
    id: "fdt_mineral",
    name: "FDT Sérum TOUCH (Liquide)",
    category: "Teint",
    desc: "Couvrance modulable, fini poudré.",
    img: "", // icône supprimée
    url: LINKS.FOUNDATION_LIQUID,
  },
  {
    id: "fdt_bb",
    name: "Crème Teintée BARE·YOU",
    category: "Teint",
    desc: 'Couvrance légère, fini "dewy".',
    img: "", // icône supprimée
    url: LINKS.FOUNDATION_BB,
  },
  {
    id: "fdt_poudre",
    name: "FDT Poudre Compacte TOUCH",
    category: "Teint",
    desc: "Sans talc. Fini velours.",
    img: "", // icône supprimée
    url: LINKS.FOUNDATION_POWDER,
  },
  {
    id: "fdt_creme",
    name: "FDT Crème Compacte TOUCH",
    category: "Teint",
    desc: "Fini satiné, haute couvrance.",
    img: "", // icône supprimée
    url: LINKS.FOUNDATION_CREME,
  },
  {
    id: "base_illu",
    name: "Base Illuminatrice",
    category: "Base",
    desc: "Lumière & Hydratation.",
    img: "", // icône supprimée
    url: LINKS.BASE_ILLUMINATING,
  },
  {
    id: "youth",
    name: "Sérum YOUTHPLEXION",
    category: "Soin Profond",
    desc: "Booster collagène.",
    img: "", // icône supprimée
    url: LINKS.SKINCARE_YOUTH,
  },
  {
    id: "uplift",
    name: "Sérum UPLIFT Beauty",
    category: "Soin Tenseur",
    desc: "Lisse et raffermit.",
    img: "", // icône supprimée
    url: LINKS.SKINCARE_UPLIFT,
  },
  {
    id: "glow",
    name: "Sérum GLOWPLEXION",
    category: "Soin Eclat",
    desc: "Cible les imperfections.",
    img: "", // icône supprimée
    url: LINKS.SKINCARE_GLOW,
  },
  {
    id: "gel",
    name: "Gel Rafraîchissant",
    category: "Soin",
    desc: "Hydratation légère.",
    img: "", // icône supprimée
    url: LINKS.SKINCARE_GEL,
  },
  {
    id: "detox",
    name: "Masque Détoxifiant",
    category: "Soin",
    desc: "Régule le sébum.",
    img: "", // icône supprimée
    url: LINKS.SKINCARE_MASK,
  },
  {
    id: "eye_cream",
    name: "Contour des Yeux Youniversal",
    category: "Soin Yeux",
    desc: "Hydrate et lisse les cernes.",
    img: "", // icône supprimée
    url: LINKS.EYE_CREAM,
  },
  {
    id: "eye_mask",
    name: "Patchs Contour des Yeux",
    category: "Soin Yeux",
    desc: "Hydrate & Décongestionne.",
    img: "", // icône supprimée
    url: LINKS.EYE_MASK,
  },
  {
    id: "concealer",
    name: "Correcteur Skin Perfecting",
    category: "Correction",
    desc: "Camouflage cernes.",
    img: "", // icône supprimée
    url: LINKS.CONCEALER,
  },
  {
    id: "powder_prime",
    name: "Poudre Prime & Set",
    category: "Finition",
    desc: "Eau encapsulée.",
    img: "", // icône supprimée
    url: LINKS.POWDER_PRIME_SET,
  },
  {
    id: "spray",
    name: "Brume Prime & Set",
    category: "Finition",
    desc: "Fixation extrême.",
    img: "", // icône supprimée
    url: LINKS.SPRAY,
  },
];

const GradientBackground = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 p-4 flex flex-col items-center justify-center relative font-sans">
    <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative z-10 border border-white/60 min-h-[600px] max-h-[90vh]">
      {children}
    </div>
  </div>
);

// Mise à jour de la Garantie Love It
const GuaranteeBadge = () => (
  <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-start gap-3 mb-4">
    <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
    <div className="text-left">
      <p className="text-[10px] font-black text-green-800 uppercase tracking-wide">
        Garantie Love It Incluse
      </p>
      <p className="text-[11px] text-green-700 leading-tight">
        Satisfaite ou échangée. <strong>Même si le produit est ouvert.</strong> Commandez sans risque.
      </p>
    </div>
  </div>
);

const QUESTIONS = [
  {
    id: "tone",
    question: "Ton teint naturel ?",
    options: [
      { label: "Très Clair", value: "VeryFair" },
      { label: "Clair", value: "Fair" },
      { label: "Moyen", value: "Medium" },
      { label: "Mat / Foncé", value: "Dark" },
      { label: "Très Foncé", value: "Deep" },
    ],
  },
  {
    id: "sun",
    question: "L'été, ta peau...",
    options: [
      { label: "Brûle direct", value: "Brûle" }, // Icône 🍅 supprimée
      { label: "Brûle puis bronze", value: "Neutre" }, // Icône 🥕 supprimée
      { label: "Bronze facilement", value: "Bronze" }, // Icône 🍪 supprimée
      { label: "Je ne sais pas", value: "Inconnu" },
    ],
  },
  {
    id: "jewelry",
    question: "Tes bijoux ?",
    options: [
      { label: "L'Argent 🥈", value: "Argent" },
      { label: "L'Or 🥇", value: "Or" },
      { label: "Les deux / Je ne sais pas", value: "Inconnu" },
    ],
  },
  {
    id: "veins",
    question: "Tes veines au poignet ?",
    options: [
      { label: "Bleues / Violettes", value: "Bleues" },
      { label: "Vertes / Olives", value: "Vertes" },
      { label: "À la fois Vertes & Bleues", value: "Mix" },
      { label: "Je ne sais pas", value: "Inconnu" },
    ],
  },

  {
    id: "skinType",
    question: "Ton type de peau ?",
    options: [
      { label: "Gras (Brillance)", value: "Grasse" },
      { label: "Sec (Tiraillements)", value: "Sèche" },
      { label: "Mixte (Zone T)", value: "Mixte" },
      { label: "Je ne sais pas", value: "Mixte" },
    ],
  },
  {
    id: "skinCondition",
    question: "État de peau (Plusieurs choix possibles)",
    multi: true,
    options: [
      { label: "Mature (Rides/Fermeté)", value: "Mature" },
      { label: "Déshydratée (Manque d'eau)", value: "Déshydratée" },
      { label: "Imperfections (Boutons)", value: "Imperfections" },
      { label: "Rien de spécial", value: "Normale" },
    ],
  },
  {
    id: "preference",
    question: "Ta texture préférée ?",
    options: [
      { label: "BB Crème (Légère)", value: "BB" },
      { label: "Fond de Teint Sérum (Fluide)", value: "Serum" },
      { label: "Fond de Teint Poudre (Compact)", value: "Poudre" },
      { label: "Fond de Teint Crème (Compact)", value: "Creme" },
    ],
  },
  {
    id: "concern",
    question: "Ton besoin prioritaire ?",
    options: [
      { label: "Cacher mes cernes", value: "Cernes" },
      { label: "Fixer mon maquillage", value: "Tenue" },
      { label: "Flouter mes pores", value: "Pores" },
    ],
  },
];

export default function App() {
  const [step, setStep] = useState("welcome");
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [quizAnswers, setQuizAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [status, setStatus] = useState("standard");
  const [alertReason, setAlertReason] = useState("");
  const [shadeName, setShadeName] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const getLabel = (questionId, value) => {
    const q = QUESTIONS.find((q) => q.id === questionId);
    if (!q) return value;
    if (Array.isArray(value))
      return value
        .map((v) => q.options.find((o) => o.value === v)?.label || v)
        .join(", ");
    return q.options.find((o) => o.value === value)?.label || value;
  };

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

    // SOUS-TON
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

    // LOGIQUE PRODUITS
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

    setShadeName(calculatedShade);
    setAlertReason(warning);

    // SOINS
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

    recs.push(PRODUCTS_DB.find((p) => p.id === "base_illu"));
    recs.push(PRODUCTS_DB.find((p) => p.id === finalProduct));

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

    setStatus(isComplex ? "complex" : "standard");
    if (isComplex) setAlertReason(reason);
    setRecommendations(recs);

    return {
      shadeCalculated: calculatedShade,
      statusCalculated: isComplex ? "complex" : "standard",
      reason: warning || reason,
    };
  };

  const handleQuizAnswer = (val) => {
    const currentQ = QUESTIONS[qIdx];
    if (currentQ.multi) {
      const currentVals = quizAnswers[currentQ.id] || [];
      let newVals;
      if (currentVals.includes(val))
        newVals = currentVals.filter((v) => v !== val);
      else newVals = [...currentVals, val];
      setQuizAnswers({ ...quizAnswers, [currentQ.id]: newVals });
    } else {
      const newAns = { ...quizAnswers, [currentQ.id]: val };
      setQuizAnswers(newAns);
      if (qIdx < QUESTIONS.length - 1) setQIdx(qIdx + 1);
      else setStep("capture");
    }
  };

  const handleNextQuestion = () => {
    if (qIdx < QUESTIONS.length - 1) setQIdx(qIdx + 1);
    else setStep("capture");
  };

  const sendDataToSonia = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email) return;
    setIsSending(true);

    // On lance l'analyse et on récupère le résultat pour l'envoyer
    const analysisResult = analyzeProfile(quizAnswers);

    // --- ENVOI VERS MAKE (WEBHOOK) ---
    if (MAKE_WEBHOOK_URL && MAKE_WEBHOOK_URL.startsWith("http")) {
      try {
        const payload = {
          name: userInfo.name,
          email: userInfo.email,
          tone: getLabel("tone", quizAnswers.tone),
          undertone: `${getLabel("sun", quizAnswers.sun)} / ${getLabel(
            "veins",
            quizAnswers.veins
          )}`,
          skinType: getLabel("skinType", quizAnswers.skinType),
          skinCondition: getLabel("skinCondition", quizAnswers.skinCondition),
          preference: getLabel("preference", quizAnswers.preference),
          concern: getLabel("concern", quizAnswers.concern),
          shade: analysisResult.shadeCalculated,
          status: analysisResult.statusCalculated,
          alert: analysisResult.reason,
          date: new Date().toISOString(),
        };

        const response = await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("Envoyé à Make avec succès !");
        } else {
          console.error("Erreur serveur Make");
        }
      } catch (err) {
        console.log("Erreur technique envoi", err);
      }
    }

    setTimeout(() => {
      setIsSending(false);
      setStep("results");
    }, 1500);
  };

  return (
    <GradientBackground>
      {step === "welcome" && (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
            <Sparkles className="text-purple-300" size={36} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-4 leading-tight">
            Mon Diagnostic <span className="text-purple-600">Expert</span>
          </h1>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm">
            Trouve ta teinte exacte (C/N/W) et ta routine idéale en 1 minute.
          </p>
          <div className="w-full max-w-xs space-y-4">
            <div className="relative">
              <User
                className="absolute left-4 top-3.5 text-gray-400 pointer-events-none"
                size={20}
              />
              <input
                type="text"
                placeholder="Ton Prénom"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                className="w-full p-4 pl-12 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-500 outline-none font-bold text-slate-800"
              />
            </div>
            <button
              onClick={() =>
                userInfo.name ? setStep("quiz") : alert("Entre ton prénom !")
              }
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Commencer <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === "quiz" && (
        <div className="h-full flex flex-col p-6 bg-white">
          <div className="mb-6">
            <div
              className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>
                QUESTION {qIdx + 1} / {QUESTIONS.length}
              </span>
              <span className="ml-4">
                {Math.round(((qIdx + 1) / QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 transition-all duration-300"
                style={{ width: `${((qIdx + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-black text-slate-800 mb-2">
              {QUESTIONS[qIdx].question}
            </h2>
            {QUESTIONS[qIdx].multi && (
              <p className="text-sm text-purple-600 font-bold mb-6 flex items-center gap-1">
                <CheckSquare size={16} /> Plusieurs choix possibles
              </p>
            )}
            <div className="space-y-3">
              {QUESTIONS[qIdx].options.map((opt, i) => {
                const isSelected = QUESTIONS[qIdx].multi
                  ? (quizAnswers[QUESTIONS[qIdx].id] || []).includes(opt.value)
                  : quizAnswers[QUESTIONS[qIdx].id] === opt.value;
                return (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(opt.value)}
                    className={`w-full text-left p-4 rounded-xl border transition-all font-bold shadow-sm flex justify-between items-center ${
                      isSelected
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-slate-700 border-slate-200 hover:border-purple-500"
                    }`}
                  >
                    
                    <span>{opt.label}</span>

                    {isSelected && (
                       <CheckCircle2 size={20} className="text-white" />
                    )}
                  </button>
                );
              })}
            </div>
            {QUESTIONS[qIdx].multi && (
              <button
                onClick={handleNextQuestion}
                className="mt-6 w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all"
              >
                Valider mes choix
              </button>
            )}
          </div>
        </div>
      )}

      {step === "capture" && (
        <div className="h-full flex flex-col justify-center p-8 bg-white text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            Calcul Terminé
          </h2>
          <p className="text-slate-500 mb-8 text-sm">
            Découvre si ton profil nécessite une expertise manuelle.
          </p>
          <form onSubmit={sendDataToSonia} className="w-full space-y-4">
            <div className="relative">
              <Mail
                className="absolute left-4 top-3.5 text-gray-400 pointer-events-none"
                size={20}
              />
              <input
                required
                type="email"
                placeholder="Ton Email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="w-full p-4 pl-12 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-500 font-bold outline-none"
              />
            </div>
            <button
              disabled={isSending}
              className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isSending ? "Analyse et Envoi..." : "Voir mon résultat"}
            </button>
          </form>
        </div>
      )}

      {step === "results" && (
        <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-b-3xl shadow-sm z-10">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-left">
              <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-2">
                <ClipboardList size={16} className="text-slate-500" />
                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">
                  Ton Profil Beauté
                </h3>
              </div>
              <div className="space-y-1 text-xs text-slate-600">
                <p>
                  <strong>Teint :</strong> {getLabel("tone", quizAnswers.tone)}
                </p>
                <p>
                  <strong>Sous-ton :</strong> Soleil{" "}
                  {getLabel("sun", quizAnswers.sun)} / Veines{" "}
                  {getLabel("veins", quizAnswers.veins)}
                </p>
                <p>
                  <strong>Peau :</strong>{" "}
                  {getLabel("skinType", quizAnswers.skinType)}
                </p>
                <p>
                  <strong>État :</strong>{" "}
                  {getLabel("skinCondition", quizAnswers.skinCondition)}
                </p>
                <p>
                  <strong>Texture :</strong>{" "}
                  {getLabel("preference", quizAnswers.preference)}
                </p>
              </div>
            </div>

            {status === "complex" ? (
              <>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="text-amber-600" size={20} />
                    <h2 className="font-bold text-amber-800">
                      Analyse Requise
                    </h2>
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Ton profil est atypique ({alertReason}). Pour éviter une
                    erreur, <strong>je dois valider ta teinte.</strong>
                  </p>
                </div>
                {/* Bouton pour ouvrir l'Instagram DM */}
                <a
                  href={INSTAGRAM_DM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 bg-amber-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-amber-200 hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 animate-pulse"
                >
                  <MessageCircle size={24} /> Me contacter par Instagram DM
                </a>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold mb-3">
                    <CheckCircle2 size={16} /> Profil Validé
                  </div>
                  <h2 className="text-xl font-black text-slate-800">
                    Teinte : {shadeName}
                  </h2>
                  {alertReason && (
                    <div className="mt-3 bg-blue-50 text-blue-800 text-xs p-3 rounded-xl border border-blue-100 font-medium text-left">
                      {alertReason}
                    </div>
                  )}
                </div>
                <GuaranteeBadge />
                
                {/* Nouveau bloc Demander conseil avec instructions photo */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 text-center">
                  <p className="text-sm text-blue-800 font-bold mb-3">
                    Tu as un doute ? Envoie-moi ta photo pour une validation manuelle !
                  </p>
                  <p className="text-xs text-blue-700 mb-4 leading-relaxed bg-blue-100 p-2 rounded-lg">
                    📸 <strong>Conseil Photo :</strong> Prends la photo <strong>face à une fenêtre</strong>,
                    mais <strong>jamais face au soleil</strong> direct. Idéalement, une fenêtre côté
                    Nord (lumière naturelle indirecte) pour que les couleurs soient fidèles.
                  </p>
                  {/* Lien vers l'Instagram DM */}
                  <a
                    href={INSTAGRAM_DM_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-blue-700 transition-colors"
                  >
                    <MessageCircle size={14} /> Demander conseil (Instagram DM)
                  </a>
                </div>
              </>
            )}
          </div>

          {status === "standard" && (
            <div className="p-6 pb-20">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
                Ta routine recommandée
              </p>
              <div className="space-y-3 opacity-90">
                {recommendations.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center animate-in slide-in-from-bottom-4"
                  >
                    {/* Les emplacements d'icônes sont volontairement vides */}
                    <div className="text-2xl bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center border border-slate-100">
                      {p.img}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-sm">
                        {p.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 mb-1">
                        {p.desc}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-1 rounded font-bold">
                          {p.category}
                        </span>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold uppercase flex items-center gap-1 hover:bg-slate-700"
                        >
                          <ShoppingBag size={10} /> Acheter
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                {Array.isArray(quizAnswers.skinCondition) &&
                  quizAnswers.skinCondition.includes("Mature") &&
                  recommendations.find((p) => p.id === "fdt_poudre") && (
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 mt-3 text-xs text-purple-800">
                      💧 <strong>Conseil Peau Mature :</strong> Excellent choix
                      ! Cette poudre est hydratante. Applique-la au
                      <strong>gros pinceau</strong>.
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      )}
    </GradientBackground>
  );
}
