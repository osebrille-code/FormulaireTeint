import React, { useState } from "react";
import {
  ArrowRight,
  Activity,
  Check,
  Zap,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

// Nombre total d'étapes de questions (avant l'étape finale de diagnostic)
const MAX_STEPS = 6;

// --- STRUCTURE GLOBALE DES RECOMMANDATIONS ---

const RECOMMENDATION_MAP = {
  "Peau Grasse / Équilibre & Pureté": {
    icon: "🌿",
    protocol:
      "Un protocole visant à réguler l'excès de sébum et à affiner le grain de peau.",
    emailContent: `
      <h3>Mes conseils Équilibre & Pureté :</h3>
      
      <strong>Nettoyant Matin et Soir :</strong> Parfait pour nettoyer sans décaper.<br>
      <strong>Sérum Matin et Soir :</strong> Pour apporter des soins en profondeur et traiter la surproduction de sébum.<br>
      <strong>Crème (Matin et Soir) :</strong> Hydrate sans graisser.<br>
      <strong>Masque Argile Charbon :</strong> À faire 1x/semaine pour purifier.<br>
    `,
    cartLink: "https://komigo.me/soniabonnefoy_vfvnvb/CQKDHN",
  },
  "Cernes / Relance Circulatoire": {
    icon: "👀",
    protocol:
      "Un duo ciblé pour décongestionner le contour des yeux et atténuer les cernes/poches.",
    emailContent: `
      <h3>Mon protocole Regard :</h3>
      
      <strong>Crème Contour des Yeux :</strong> À appliquer matin et soir.<br>
      <strong>Patchs Contour des Yeux :</strong> À utiliser plusieurs fois par semaine pour décongestionner.<br>
    `,
    cartLink: "Relance circulatoire https://komigo.me/soniabonnefoy_vfvnvb/CQKHPP",
  },
  "Structure & Vitalité / Fermeté & Rebond": {
    icon: "✨",
    protocol:
      "Les produits sélectionnés pour relancer la production de collagène, redensifier la peau et améliorer sa fermeté.",
    emailContent: `
      <h3>Le protocole Structure & Vitalité :</h3>
     
      <strong>Nettoyant :</strong> Un nettoyant doux est essentiel pour préparer la peau à recevoir les actifs.<br>
      <strong>Sérum :</strong> 
      <p style="margin-top: 5px; margin-bottom: 15px; font-size: 0.95em;">
      Ce sérum soutient le processus naturel de réparation et de renouvellement de votre peau pendant le sommeil. Formulé avec de l'extrait de prune verte (protection antioxydante) et de l'extrait de ciste du Maroc (renouvellement cellulaire), il offre une peau visiblement restaurée et revitalisée au réveil. A utiliser matin et soir.
      </p>
      <strong>Crème de Jour :</strong> Elle apporte confort, hydratation et protection contre les agressions extérieures.<br>
      <strong>Crème de Nuit :</strong> Formulée pour soutenir le processus de renouvellement cellulaire nocturne et la production de collagène.<br>
      
      <h4>✨ Le geste "boost" pour la fermeté : Cure de Collagène Marin liquide et hydrolysé</h4>
      
      Suite à votre diagnostic, je vous recommande également d’ajouter une cure de collagène afin de soutenir la qualité de votre peau, ainsi que la fermeté et l’hydratation générale des tissus.<br><br>
      
      Cette cure contient :<br>
      <strong>Collagène marin (5000 mg par stick) :</strong> c’est la protéine structurelle principale de la peau. Un apport extérieur peut aider à compenser la baisse naturelle de production.<br>
      <strong>Vitamine C (30 mg) :</strong> elle contribue à la formation normale du collagène.<br>
      <strong>Extrait d’acérola (250 mg) :</strong> source naturelle de vitamine C.<br>
      <strong>Acide hyaluronique (120 mg) :</strong> molécule connue pour aider à maintenir l’hydratation de la peau.<br>
      <strong>Aloe vera :</strong> utilisée pour ses propriétés apaisantes.<br><br>
      
      La prise est simple : 1 stick par jour. L’association collagène + vitamine C a pour but de soutenir la fermeté et l’élasticité de la peau.
      
      Si vous avez des questions ou si vous souhaitez que je vous accompagne dans la mise en place de votre routine, je suis disponible. Il vous suffira de répondre à ce mail.
    `,
    cartLink: "https://komigo.me/soniabonnefoy_vfvnvb/CQKDZY",
  },
  "Peau Sèche / Confort & Protection": {
    icon: "💧",
    protocol:
      "Ton programme est conçu pour restaurer la barrière cutanée, hydrater en profondeur et retrouver du confort (Manque de lipides).",
    emailContent: `
      <h3>Mon programme Peau Sèche / Confort & Hydratation :</h3>
      
      <strong>Nettoyant (Matin et Soir) :</strong> Il ne va ni l’irriter ni l’agresser.<br>
      <strong>Sérum au Concombre et à l’Aloès :</strong> Pour l’hydrater en profondeur.<br>
      <strong>Crème de Jour et Crème de Nuit :</strong> Hydratation de surface optimale et protection de la barrière.<br>
      <strong>Sérum huile de beauté UPLIFT :</strong> Complément de l'hydratation précédente (on lui a donné à boire), maintenant on va la nourrir avec ce sérum (lui donner à manger).<br>
    `,
    cartLink: "https://komigo.me/soniabonnefoy_vfvnvb/CPN3B4",
  },
  "Peau Mixte / Confort & Protection": {
    icon: "🧭",
    protocol:
      "Ton programme est conçu pour gérer l'excess de sébum en zone T tout en nourrissant les zones sèches (Mixité/Déshydratation).",
    emailContent: `
      <h3>Mon programme Peau Mixte / Confort & Équilibre :</h3>
      
      <strong>Nettoyant Doux :</strong> Essentiel pour exfolier ta peau sans la décaper.<br>
      <strong>Sérum avec vitamine C et de la figue de Barbarie :</strong> Hydratation non grasse pour tout le visage.<br>
      <strong>Crème Équilibrante :</strong> Pour hydrater sans surcharger les zones grasses.<br>
    `,
    cartLink: "https://komigo.me/soniabonnefoy_vfvnvb/CQKJBK",
  },
  "Cortisol Face / Stress & SOS": {
    icon: "🔥",
    protocol:
      "Un protocole anti-inflammatoire et apaisant pour traiter les imperfections liées au stress chronique et restaurer la barrière.",
    emailContent: `
      <h3>Protocole Anti-Stress (Cortisol Face) :</h3>
      <p>Concentrez-vous sur des produits doux et apaisants. Votre priorité est de réduire l'inflammation et de restaurer la fonction barrière. Le sérum hydratant (à la figue de barbarie) et des masques régénérants de nuit sont essentiels.</p>

      <h4>✨ Le geste "réparation" : Cure de Collagène Marin</h4>

      Le stress chronique peut impacter la qualité de votre peau en réduisant la production de collagène. Je vous recommande d'ajouter une cure de collagène pour soutenir la réparation cutanée, l'hydratation et la résilience de vos tissus.<br><br>

      Cette cure contient :<br>
      <strong>Collagène marin (5000 mg par sachet) :</strong> pour renforcer la structure de la peau.<br>
      <strong>Vitamine C (30 mg) :</strong> pour optimiser l'assimilation et la production naturelle de collagène.<br>
      <strong>Extrait d’acérola (250 mg)</strong> et <strong>Acide hyaluronique (120 mg)</strong> pour l'hydratation et le confort.<br><br>
    `,
    cartLink: "https://komigo.me/soniabonnefoy_vfvnvb/CQKJS4",
  },
  "Carence / Beauté Intégrale": {
    icon: "💊",
    protocol:
      "Un protocole de compléments alimentaires pour renforcer les ongles et les cheveux de l'intérieur.",
    emailContent: `
      <h3>Protocole Beauté Intégrale (Gummies Cheveux & Ongles) :</h3>
      <p>Tes ongles et/ou tes cheveux montrent un manque de nutriments essentiels. Pour agir efficacement sur la casse et la pousse, je te recommande d'ajouter une cure de gummies fortifiants à ta routine.</p>
      <p>Ces gummies contiennent des nutriments essentiels (Biotine, Zinc, Sélénium, Vitamines B) pour renforcer la fibre capillaire, réduire la casse et favoriser une pousse plus résistante.</p>
      <strong>Cure de Gummies :</strong> 2 gummies par jour. Une cure de 3 mois est recommandée pour obtenir des résultats visibles et durables.<br>
    `,
    cartLink:
      "https://komigo.me/soniabonnefoy_vfvnvb/CQKJ2C",
  },
};

export default function App() {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    gender: "Non spécifié",
    skinSignals: [],
    afterCleansing: "",
    eyeConcerns: [],
    ageRange: "",
    currentRoutine: [],
    nailsBreak: "N",
    dullHair: "N",
    topPriority: "",
    identity: { nom: "", prenom: "", email: "" },
  });

  const skinOptions = [
    "Ma peau brille",
    "Ma peau tire",
    "Pores apparents",
    "Rides, ridules",
    "S'affaisse / se relâche",
    "Imperfections",
  ];
  const cleansingOptions = [
    { value: "A", text: "Ma peau ne me gêne pas, elle est normale." },
    { value: "B", text: "Ma peau tiraille énormément et est rugueuse." },
    {
      value: "C",
      text: "Ma peau tiraille un peu, mais redevient grasse au bout de 2h.",
    },
    {
      value: "D",
      text: "Ma peau est plus douce, mais brille rapidement après.",
    },
  ];

  const eyeOptions = [
    "Contour des yeux sec",
    "Contour des yeux marqué",
    "Poches sous les yeux",
    "Cernes marrons",
  ];

  const ageOptions = ["15/25 ans", "25/35 ans", "35/45 ans", "45 ans et plus"];

  const routineOptions = [
    "Masque",
    "Crème contour des yeux",
    "Sérum",
    "Crème jour",
    "Crème nuit",
    "Exfoliant",
    "Collagène",
  ];
  const yesNoOptions = [
    { label: "Oui", value: "O" },
    { label: "Non", value: "N" },
  ];

  const handleMultiSelect = (category, value) => {
    setFormData((prev) => {
      const list = prev[category];
      if (list.includes(value)) {
        return {
          ...prev,
          [category]: list.filter((item) => item !== value),
        };
      } else {
        return { ...prev, [category]: [...list, value] };
      }
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  // --- 5. LOGIQUE DE MULTI-DIAGNOSTIC AVEC ÂGE ET COMPORTEMENT ---

  const getApplicableDiagnoses = () => {
    const skin = formData.skinSignals;
    const eye = formData.eyeConcerns;
    const age = formData.ageRange;
    const cleansing = formData.afterCleansing;
    const nailsBreak = formData.nailsBreak;
    const dullHair = formData.dullHair;
    const diagnoses = [];

    const isMatureAge = age === "35/45 ans" || age === "45 ans et plus";
    const isAdultAcneAge = age === "25/35 ans" || isMatureAge;

    // --- 1. STRUCTURE & VITALITÉ
    const hasWrinkles = skin.includes("Rides, ridules");
    const hasSagging = skin.includes("S'affaisse / se relâche");
    if (
      (isMatureAge && (hasWrinkles || hasSagging)) ||
      (!isMatureAge && hasWrinkles && hasSagging)
    ) {
      diagnoses.push("Structure & Vitalité / Fermeté & Rebond");
    }

    // --- 2. PEAU SÈCHE
    if (
      cleansing === "B" ||
      (skin.includes("Ma peau tire") &&
        eye.includes("Contour des yeux sec") &&
        cleansing !== "C" &&
        cleansing !== "D")
    ) {
      diagnoses.push("Peau Sèche / Confort & Protection");
    }

    // --- 3. PEAU GRASSE
    if (
      (skin.includes("Ma peau brille") && skin.includes("Pores apparents")) ||
      cleansing === "D"
    ) {
      diagnoses.push("Peau Grasse / Équilibre & Pureté");
    }

    // --- 4. PEAU MIXTE
    if (
      (skin.includes("Ma peau brille") && skin.includes("Ma peau tire")) ||
      cleansing === "C"
    ) {
      diagnoses.push("Peau Mixte / Confort & Protection");
    }

    // --- 5. CERNES
    if (
      eye.includes("Poches sous les yeux") ||
      eye.includes("Cernes marrons") ||
      eye.includes("Contour des yeux marqué")
    ) {
      diagnoses.push("Cernes / Relance Circulatoire");
    }

    // --- 6. CORTISOL FACE
    const isStressedSkin =
      skin.includes("Ma peau tire") || eye.includes("Contour des yeux marqué");
    if (skin.includes("Imperfections") && isStressedSkin && isAdultAcneAge) {
      diagnoses.push("Cortisol Face / Stress & SOS");
    }

    // --- 7. CARENCE (Ongles/Cheveux)
    if (nailsBreak === "O" || dullHair === "O") {
      diagnoses.push("Carence / Beauté Intégrale");
    }

    const finalDiagnoses = [...new Set(diagnoses)];
    if (finalDiagnoses.includes("Peau Grasse / Équilibre & Pureté")) {
      return finalDiagnoses.filter(
        (d) => d !== "Peau Sèche / Confort & Protection"
      );
    }

    return finalDiagnoses;
  };

  const applicableDiagnoses = getApplicableDiagnoses();

  // --- 6. ENVOI VERS N8N (Webhooks) ---

  const sendToN8N = async () => {
    if (!formData.identity.email || !formData.identity.prenom) {
      alert(
        "Merci de remplir ton prénom et email pour recevoir mes préconisations !"
      );
      return;
    }

    const recommendationDetails = applicableDiagnoses.map((diag) => {
      const reco = RECOMMENDATION_MAP[diag];
      return {
        title: diag.split(" / ")[0],
        cartLink: reco ? reco.cartLink : "#",
        emailContent: reco
          ? reco.emailContent
          : `<p>Protocole non défini pour ${diag.split(" / ")[0]}</p>`,
      };
    });

    let finalEmailContent = `
        <p>Hello ${formData.identity.prenom} !</p>
        <p>Suite à ton diagnostic, ta peau présente ${
          applicableDiagnoses.length
        } besoin(s) simultané(s). Voici ton protocole complet, divisé par problématique, pour une routine sur mesure.</p>
        <div style="margin-top: 20px; margin-bottom: 20px; border-top: 1px solid #ddd;"></div>
    `;

    recommendationDetails.forEach((detail, index) => {
      finalEmailContent += detail.emailContent;
      finalEmailContent += `
            <p style="margin-top: 15px; margin-bottom: 25px;">
                <a href="${
                  detail.cartLink
                }" style="padding: 10px 20px; background-color: #5B21B6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Accéder au panier ${detail.title}
                </a>
            </p>
            ${
              index < recommendationDetails.length - 1
                ? '<div style="margin-top: 20px; margin-bottom: 20px; border-top: 1px solid #eee;"></div>'
                : ""
            }
        `;
    });
    finalEmailContent += `<p>Si tu as des questions, n'hésite pas à écrire en réponse à ce mail !</p><p>Xoxo. Sonia</p>`;

    const dataToSend = {
      date: new Date().toLocaleDateString("fr-FR"),
      prenom: formData.identity.prenom,
      nom: formData.identity.nom,
      email: formData.identity.email,
      genre: formData.gender,
      age: formData.ageRange,
      problemes_peau: formData.skinSignals.join(", "),
      comportement_nettoyage: formData.afterCleansing,
      problemes_yeux: formData.eyeConcerns.join(", "),
      routine_actuelle: formData.currentRoutine.join(", "),
      ongles_cassants: formData.nailsBreak,
      cheveux_ternes: formData.dullHair,
      priorite_absolue: formData.topPriority,
      diagnostics_trouves: applicableDiagnoses.join(", "),
      contenu_email_final: finalEmailContent,
      details_recommandations_json: JSON.stringify(recommendationDetails),
    };

    console.log("Envoi JSON vers N8N...", dataToSend);

    const WEBHOOK_URL =
      "https://n8n.srv1165443.hstgr.cloud/webhook/91319412-213b-4d2a-b6fd-626cc421c51b";
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      // Attention : import.meta.env est spécifique à Vite. Si tu utilises Create React App, utilise process.env.REACT_APP_WHATSAPP_NUMBER
      const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
      const messageWhatsApp = `👋 Bonjour Sonia ! Voici mon Diagnostic Soin. Mes besoins principaux sont : ${applicableDiagnoses.join(
        ", "
      )}. Peux-tu préparer mon protocole complet ?`;

      if (WHATSAPP_NUMBER) {
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            messageWhatsApp
          )}`,
          "_blank"
        );
      } else {
        alert("Diagnostic envoyé. Merci !");
      }
    } catch (error) {
      console.error("Erreur d'envoi", error);
      alert("Une erreur est survenue lors de l'envoi du diagnostic.");
    }
  };

  const progress = Math.min(100, Math.floor((step / MAX_STEPS) * 100));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex justify-center items-start p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
        {/* En-tête Expert */}
        <div className="bg-slate-900 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={20} className="text-purple-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-purple-400">
              Skin test
            </span>
          </div>
          <h1 className="text-2xl font-serif">Diagnostic type de peau</h1>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed border-l-2 border-purple-500 pl-3">
            "60% des personnes ne connaissent pas leur vrai type de peau..." Ne
            devine plus. Identifions ensemble tes besoins réels.
          </p>
        </div>

        {/* Barre de progression */}
        {step < MAX_STEPS && (
          <div className="p-4 pt-2">
            <div className="flex justify-between items-center text-xs font-medium text-purple-600 mb-1">
              <span>Avancement</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div
                className="bg-purple-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="p-6 pt-2">
          {/* ÉTAPE 0: SIGNES CLINIQUES */}
          {step === 0 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-bold mt-4 mb-6">
                Dirais-tu que ta peau...
              </h2>
              <p className="text-xs text-slate-500 mb-3">
                (Plusieurs choix possibles)
              </p>
              <div className="space-y-2">
                {skinOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.skinSignals.includes(opt)
                        ? "border-purple-600 bg-purple-50 shadow-sm"
                        : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                        formData.skinSignals.includes(opt)
                          ? "bg-purple-600 border-purple-600"
                          : "border-slate-300"
                      }`}
                    >
                      {formData.skinSignals.includes(opt) && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{opt}</span>
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={() => handleMultiSelect("skinSignals", opt)}
                      checked={formData.skinSignals.includes(opt)}
                    />
                  </label>
                ))}
              </div>
              <button
                onClick={nextStep}
                className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2"
              >
                Suivant <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* ÉTAPE 1: COMPORTEMENT */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="flex justify-start items-center mb-4">
                <button
                  onClick={prevStep}
                  className="text-sm text-slate-500 flex items-center gap-1 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft size={16} /> Précédent
                </button>
              </div>
              <h2 className="text-lg font-bold mt-4 mb-6">
                Après le nettoyage, sans crème, que ressens-tu ?
              </h2>
              <div className="space-y-3">
                {cleansingOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setFormData({ ...formData, afterCleansing: opt.value });
                      nextStep();
                    }}
                    className={`w-full p-4 rounded-xl border text-left font-medium transition-all ${
                      formData.afterCleansing === opt.value
                        ? "border-purple-600 bg-purple-50 text-purple-900"
                        : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ÉTAPE 2: FOCUS REGARD */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="flex justify-start items-center mb-4">
                <button
                  onClick={prevStep}
                  className="text-sm text-slate-500 flex items-center gap-1 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft size={16} /> Précédent
                </button>
              </div>
              <h2 className="text-lg font-bold mt-4 mb-6">
                Dirais-tu de tes yeux...
              </h2>
              <div className="space-y-2">
                {eyeOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.eyeConcerns.includes(opt)
                        ? "border-purple-600 bg-purple-50 shadow-sm"
                        : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                        formData.eyeConcerns.includes(opt)
                          ? "bg-purple-600 border-purple-600"
                          : "border-slate-300"
                      }`}
                    >
                      {formData.eyeConcerns.includes(opt) && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{opt}</span>
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={() => handleMultiSelect("eyeConcerns", opt)}
                      checked={formData.eyeConcerns.includes(opt)}
                    />
                  </label>
                ))}
              </div>
              <button
                onClick={nextStep}
                className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2"
              >
                Suivant <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 3 && ( // Étape 3
            <div className="animate-fade-in">
              <div className="flex justify-start items-center mb-4">
                <button
                  onClick={prevStep}
                  className="text-sm text-slate-500 flex items-center gap-1 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft size={16} /> Précédent
                </button>
              </div>
              <h2 className="text-lg font-bold mt-4 mb-6">Ta tranche d'âge</h2>
              <div className="grid grid-cols-1 gap-3">
                {ageOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFormData({ ...formData, ageRange: opt });
                      nextStep();
                    }}
                    className={`p-4 rounded-xl border text-left font-medium transition-all ${
                      formData.ageRange === opt
                        ? "border-purple-600 bg-purple-50 text-purple-900"
                        : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && ( // Étape 4
            <div className="animate-fade-in">
              <div className="flex justify-start items-center mb-4">
                <button
                  onClick={prevStep}
                  className="text-sm text-slate-500 flex items-center gap-1 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft size={16} /> Précédent
                </button>
              </div>
              <h2 className="text-lg font-bold mt-4 mb-4">
                Revue de tes routines & signaux corporels
              </h2>
              <h3 className="text-sm font-semibold mt-6 mb-3">
                Produits utilisés (Multi-choix)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {routineOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex flex-col justify-center items-center p-3 rounded-lg border text-center cursor-pointer h-20 transition-all ${
                      formData.currentRoutine.includes(opt)
                        ? "border-purple-500 bg-purple-50"
                        : "border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-bold">{opt}</span>
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={() => handleMultiSelect("currentRoutine", opt)}
                      checked={formData.currentRoutine.includes(opt)}
                    />
                    {formData.currentRoutine.includes(opt) && (
                      <Check size={16} className="text-purple-600 mt-1" />
                    )}
                  </label>
                ))}
              </div>

              {/* NOUVELLES QUESTIONS O/N */}
              <h3 className="text-sm font-semibold mt-6 mb-3 flex items-center gap-2">
                <Zap size={16} className="text-purple-500" /> Signaux internes
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg bg-slate-50">
                  <label className="text-sm font-medium">
                    As-tu les ongles cassants ?
                  </label>
                  <div className="flex gap-2">
                    {yesNoOptions.map((opt) => (
                      <button
                        key={`nails-${opt.value}`}
                        onClick={() =>
                          setFormData({ ...formData, nailsBreak: opt.value })
                        }
                        className={`px-4 py-1 rounded text-sm font-medium transition-colors ${
                          formData.nailsBreak === opt.value
                            ? "bg-purple-600 text-white"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg bg-slate-50">
                  <label className="text-sm font-medium">
                    Cheveux ternes et/ou abîmés ?
                  </label>
                  <div className="flex gap-2">
                    {yesNoOptions.map((opt) => (
                      <button
                        key={`hair-${opt.value}`}
                        onClick={() =>
                          setFormData({ ...formData, dullHair: opt.value })
                        }
                        className={`px-4 py-1 rounded text-sm font-medium transition-colors ${
                          formData.dullHair === opt.value
                            ? "bg-purple-600 text-white"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={nextStep}
                className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2"
              >
                Suivant <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 5 && ( // Étape 5
            <div className="animate-fade-in">
              <div className="flex justify-start items-center mb-4">
                <button
                  onClick={prevStep}
                  className="text-sm text-slate-500 flex items-center gap-1 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft size={16} /> Précédent
                </button>
              </div>
              <h2 className="text-lg font-bold mt-4 mb-4">
                La "Baguette Magique"
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Parmi les problèmes que tu as signalés, lequel voudrais-tu
                effacer en PRIORITÉ absolue ?
              </p>
              <div className="space-y-3">
                {formData.skinSignals.length > 0 ? (
                  formData.skinSignals.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setFormData({ ...formData, topPriority: opt });
                        nextStep();
                      }}
                      className="w-full p-4 rounded-xl border border-orange-200 bg-orange-50 text-orange-900 font-medium text-left hover:bg-orange-100 transition-colors"
                    >
                      🎯 Régler : {opt}
                    </button>
                  ))
                ) : (
                  <button
                    onClick={nextStep}
                    className="w-full p-4 bg-slate-100 rounded-xl"
                  >
                    Aucun problème signalé, passer à la suite
                  </button>
                )}
              </div>
              <p className="text-xs text-center text-slate-400 mt-4">
                Un seul choix possible pour cibler le traitement.
              </p>
            </div>
          )}

          {step === 6 && ( // Étape 6
            <div className="animate-fade-in">
              <h3 className="text-xl font-serif font-bold text-slate-800 mb-4 text-center">
                Ton Diagnostic Personnalisé
              </h3>

              {applicableDiagnoses.length > 0 ? (
                <div className="space-y-4">
                  {applicableDiagnoses.map((diag, index) => {
                    const reco =
                      RECOMMENDATION_MAP[
                        diag
                      ];
                    return (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-xl border border-purple-200 shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{reco.icon}</span>
                          <h4 className="font-bold text-slate-800">
                            {diag.split(" / ")[0]}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 italic">
                          {reco.protocol}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-center gap-3">
                  <AlertTriangle size={20} className="text-yellow-600" />
                  <p className="text-sm text-yellow-800">
                    Aucun diagnostic clair n'a été trouvé. Sonia va analyser
                    manuellement tes réponses.
                  </p>
                </div>
              )}

              {/* Formulaire Identité */}
              <div className="space-y-4 mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Où envoyer ta préconisation beauté ?
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Prénom"
                    className="w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        identity: {
                          ...formData.identity,
                          prenom: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    className="w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        identity: { ...formData.identity, nom: e.target.value },
                      })
                    }
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email (pour le protocole)"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      identity: { ...formData.identity, email: e.target.value },
                    })
                  }
                />
              </div>

              {/* MENTION RGPD ET SPAMS */}
              <p className="text-xs text-center text-slate-500 mt-4">
                <strong>
                  Pense à vérifier tes spams si le protocole n'arrive pas !
                </strong>
                <br />
                En validant, vous acceptez que <strong>Ose&Brille</strong>{" "}
                utilise ces données pour vous envoyer le diagnostic. Consultez
                notre{" "}
                <a
                  href="/politique-confidentialite.html"
                  target="_blank"
                  className="font-bold text-purple-600 hover:text-purple-700 underline"
                >
                  Politique de confidentialité
                </a>
                .
              </p>

              <button
                onClick={sendToN8N}
                className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all"
              >
                Valider mon diagnostic et recevoir mes préconisations
              </button>

              <p className="text-[10px] text-center text-slate-400 mt-3">
                Tes données restent strictement confidentielles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
