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
  ArrowLeft, // Importé pour le bouton retour
} from "lucide-react";

// --- 1. TES LIENS KOMIGO ---
// Les liens produits restent ici car ils sont publics
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

// --- 2. CONFIGURATION AUTOMATISATION & API ---
const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/on3dp8ol1rk0pymb8fo67mpewz98yg86";

// C'EST L'ADRESSE DE VOTRE FONCTION VERCEL SECRÈTE
const ALGORITHM_API_URL = "/api/diagnose"; 

// Lien vers l'Instagram DM
const INSTAGRAM_DM_LINK = "https://ig.me/m/ton_identifiant_instagram_ici"; 

// Lien vers la politique de confidentialité
const PRIVACY_POLICY_LINK = "/politique-confidentialite.html";

// La base de données produits n'est plus ici, elle est dans api/diagnose.js
const PRODUCTS_DB_PLACEHOLDER = []; 


const GradientBackground = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 p-4 flex flex-col items-center justify-center relative font-sans">
    <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative z-10 border border-white/60 min-h-[600px] max-h-[90vh]">
      {children}
    </div>
  </div>
);

// Composant de bouton de retour
const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-5 left-5 p-2 bg-white/50 backdrop-blur-md rounded-full text-slate-700 shadow-md hover:bg-white/80 transition-all z-20"
    aria-label="Retour arrière"
  >
    <ArrowLeft size={20} />
  </button>
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
      { label: "Brûle direct", value: "Brûle" },
      { label: "Brûle puis bronze", value: "Neutre" },
      { label: "Bronze facilement", value: "Bronze" },
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
  const [recommendations, setRecommendations] = useState(PRODUCTS_DB_PLACEHOLDER);
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

  const handleBack = () => {
    if (step === "quiz") {
      if (qIdx > 0) {
        setQIdx(qIdx - 1);
      } else {
        // Retour à la page de bienvenue
        setStep("welcome");
      }
    } else if (step === "capture") {
      setStep("quiz");
      setQIdx(QUESTIONS.length - 1); // Revenir à la dernière question du quiz
    } else if (step === "results") {
      // Pour les résultats, on renvoie à la page de capture
      setStep("capture");
    }
  };


  const sendDataToSonia = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email) return;
    setIsSending(true);
    
    let analysisResult = null;


    // --- 1. APPEL À L'ALGORITHME SECRET (Côté Serveur Vercel) ---
    try {
        const apiResponse = await fetch(ALGORITHM_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: quizAnswers }), 
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();
            analysisResult = data;
            
            // Mise à jour de l'état du composant avec les données secrètes reçues
            setShadeName(data.shadeCalculated);
            setStatus(data.statusCalculated);
            setAlertReason(data.alert);
            setRecommendations(data.recommendations);
        } else {
            console.error("Erreur serveur API d'analyse. Statut:", apiResponse.status);
            alert("Erreur: Le diagnostic n'a pas pu être calculé. Veuillez réessayer.");
            setIsSending(false);
            return;
        }
    } catch (err) {
        console.error("Erreur technique de connexion à l'API", err);
        alert("Erreur de connexion. Veuillez vérifier votre réseau.");
        setIsSending(false);
        return;
    }


    // --- 2. ENVOI VERS MAKE (WEBHOOK) ---
    if (MAKE_WEBHOOK_URL && MAKE_WEBHOOK_URL.startsWith("http") && analysisResult) {
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
          alert: analysisResult.alert,
          date: new Date().toISOString(),
        };

        const response = await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error("Erreur serveur Make");
        }
      } catch (err) {
        console.log("Erreur technique envoi Make", err);
      }
    }

    // Affichage des résultats
    setTimeout(() => {
      setIsSending(false);
      setStep("results");
    }, 500);
  };

  // Condition pour afficher le bouton retour
  const showBackButton = (step === "quiz") || (step === "capture") || (step === "results" && status === "complex");


  return (
    <GradientBackground>

      {showBackButton && <BackButton onClick={handleBack} />}

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
            
            {/* Ajout du lien vers la politique de confidentialité */}
            <div className="pt-4">
              <a 
                href={PRIVACY_POLICY_LINK} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-purple-600 underline transition-colors"
              >
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      )}

      {step === "quiz" && (
        <div className="h-full flex flex-col p-6 bg-white">
          <div className="mb-6 mt-12"> {/* Marge ajoutée pour le bouton retour */}
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
                
                {/* ENCART INSTA DM AFFICHÉ UNIQUEMENT SI STATUS === "complex" */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 text-center">
                  <p className="text-sm text-blue-800 font-bold mb-3">
                    Envoie-moi ta photo pour une validation manuelle et personnelle !
                  </p>
                  <p className="text-xs text-blue-700 mb-4 leading-relaxed bg-blue-100 p-2 rounded-lg">
                    📸 <strong>Conseil Photo :</strong> Prends la photo <strong>face à une fenêtre</strong>,
                    mais <strong>jamais face au soleil</strong> direct. Idéalement, une fenêtre côté
                    Nord (lumière naturelle indirecte) pour que les couleurs soient fidèles.
                  </p>
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
            ) : (
              // Affichage standard
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
                {/* L'encart "Demander conseil" n'est plus affiché ici. */}
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
                      {/* Note: p.img est vide dans la BDD Serverless */}
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
                  recommendations.some((p) => p.id === "fdt_poudre") && (
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
