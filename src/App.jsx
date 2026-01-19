import React, { useState } from "react";
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
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

// --- 1. TES LIENS KOMIGO & IMAGES ---
const SHOP_ROOT = "https://komigo.me/soniabonnefoy_vfvnvb/";

// URLs Images
const IMAGES = {
  FOUNDATION_LIQUID: "https://komigo.me/static/media/shop/products/CVKna3Wigz5QKoL68VMcg.webp?width=2000",
  FOUNDATION_BB: "https://komigo.me/static/media/shop/products/CK1EPqyf4TCE9h1VZBEd8.webp?width=2000",
  FOUNDATION_CREME: "https://komigo.me/static/media/shop/products/CK1ERADYbkbK8xZSwrMCd.webp?width=2000",
  FOUNDATION_POWDER: "https://komigo.me/static/media/shop/products/CK1EZ3D643NWp6pqhHMfb.webp?width=2000",
  BASE_ILLUMINATING: "https://komigo.me/static/media/shop/products/CK1EJvFFCtoeZHQNzweZa.webp?width=2000",
  POWDER_PRIME_SET: "https://komigo.me/static/media/shop/products/CTToKgHqSGfCkWoSeq1mY.webp?width=2000",
  SPRAY: "https://komigo.me/static/media/shop/products/CK1Ea91s9oF9m4Zh2adk1.webp?width=2000",
  SKINCARE_YOUTH: "https://komigo.me/static/media/shop/products/CVG7kty25ZBt9yNCot2V8.webp?width=2000",
  SKINCARE_GLOW: "https://komigo.me/static/media/shop/products/CVG9mR3zT53dEeKCDs5MA.webp?width=2000",
  SKINCARE_UPLIFT: "https://komigo.me/static/media/shop/products/CX7moyn9MviZohXztz65x.webp?width=2000",
  SKINCARE_MASK: "https://komigo.me/static/media/shop/products/CTTXZVXCmnQSjsXJxwMtY.webp?width=2000",
  EYE_CREAM: "https://komigo.me/static/media/shop/products/CTTXbdzzjbqeZp6EsZAA7.webp?width=2000",
  EYE_MASK: "https://komigo.me/static/media/shop/products/CQ9FDRqoVThp9eXsgW9ig.webp?width=2000",
};

// Fonctions URLs dynamiques
const getSerumFoundationUrl = (shade) => 
  `https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-SerumFoundation-${shade}`;

const getBBCreamUrl = (shade) => {
  const urlShade = shade.replace(/\s+/g, '');
  return `https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-BBTinted-${urlShade}`;
};

const getCreamFoundationUrl = (shade) => 
  `https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-CreamFoundation-${shade}_P`;

const getPowderFoundationUrl = (shade) =>
  `https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-PressedPowder-${shade}`;

const LINKS = {
  FOUNDATION_LIQUID: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-SerumFoundation-Alaari",
  FOUNDATION_BB: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-BBTinted-FairLight",
  FOUNDATION_CREME: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-CreamFoundation-1C_P",
  FOUNDATION_POWDER: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-PressedPowder-Cabretta",
  BASE_ILLUMINATING: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-IlluminatingPrimer",
  POWDER_PRIME_SET: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-PrimeSetPowder",
  SPRAY: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-PrimeSetMist",
  SKINCARE_YOUTH: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-YOUTHPLEXIONDayMoisturizer",
  SKINCARE_GLOW: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-GlowplexionSerum",
  SKINCARE_UPLIFT: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-HydratingSqualaneOil",
  SKINCARE_GEL: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-YOUTHPLEXIONDayMoisturizer",
  SKINCARE_MASK: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-ClayCharcoalMask",
  EYE_CREAM: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-YouniversalEyeCream",
  EYE_MASK: "https://komigo.me/soniabonnefoy_vfvnvb/shop/pk/Younique-EyeMask",
  CONCEALER: SHOP_ROOT,
};

// --- 2. CONFIGURATION AUTOMATISATION ---
const N8N_WEBHOOK_URL = "https://n8n.srv1165443.hstgr.cloud/webhook/a5c67185-e091-4167-9158-3aded7cfd328";
const INSTAGRAM_DM_LINK = "https://ig.me/m/sonia_bonnefoy";

// --- 3. BASE DE DONNÉES PRODUITS ---
const PRODUCTS_DB = [
  {
    id: "fdt_mineral",
    name: "FDT Sérum TOUCH (Liquide)",
    category: "Teint",
    desc: "Couvrance modulable.",
    img: IMAGES.FOUNDATION_LIQUID,
    url: LINKS.FOUNDATION_LIQUID,
  },
  {
    id: "fdt_bb",
    name: "BB crème Teintée BARE·YOU",
    category: "Teint",
    desc: 'Couvrance légère, effet "seconde peau".',
    img: IMAGES.FOUNDATION_BB,
    url: LINKS.FOUNDATION_BB,
  },
  {
    id: "fdt_poudre",
    name: "FDT Poudre Compacte TOUCH",
    category: "Teint",
    desc: "Sans talc. Fini velours.",
    img: IMAGES.FOUNDATION_POWDER,
    url: LINKS.FOUNDATION_POWDER,
  },
  {
    id: "fdt_creme",
    name: "FDT Crème Compacte TOUCH",
    category: "Teint",
    desc: "Fini satiné, couvrance modulable.",
    img: IMAGES.FOUNDATION_CREME,
    url: LINKS.FOUNDATION_CREME,
  },
  {
    id: "base_illu",
    name: "Base éclat",
    category: "Base",
    desc: "Lisse et améliore le rendu.",
    img: IMAGES.BASE_ILLUMINATING,
    url: LINKS.BASE_ILLUMINATING,
  },
  {
    id: "youth",
    name: "Sérum YOUTHPLEXION",
    category: "Soin Profond",
    desc: "Restaure et rajeunie.",
    img: IMAGES.SKINCARE_YOUTH,
    url: LINKS.SKINCARE_YOUTH,
  },
  {
    id: "uplift",
    name: "Sérum huile hydratante",
    category: "Soin Tenseur",
    desc: "Lisse et hydrate.",
    img: IMAGES.SKINCARE_UPLIFT,
    url: LINKS.SKINCARE_UPLIFT,
  },
  {
    id: "glow",
    name: "Sérum GLOWPLEXION",
    category: "Soin Eclat",
    desc: "Cible les imperfections.",
    img: IMAGES.SKINCARE_GLOW,
    url: LINKS.SKINCARE_GLOW,
  },
  {
    id: "gel",
    name: "Crème de jour",
    category: "Soin",
    desc: "Hydratation renforcée.",
    img: IMAGES.SKINCARE_YOUTH, // Fallback si pas d'image spécifique GEL
    url: LINKS.SKINCARE_GEL,
  },
  {
    id: "detox",
    name: "Masque Détoxifiant",
    category: "Soin",
    desc: "Régule le sébum.",
    img: IMAGES.SKINCARE_MASK,
    url: LINKS.SKINCARE_MASK,
  },
  {
    id: "eye_cream",
    name: "Contour des Yeux Youniversal",
    category: "Soin Yeux",
    desc: "Hydrate et lisse les cernes.",
    img: IMAGES.EYE_CREAM,
    url: LINKS.EYE_CREAM,
  },
  {
    id: "eye_mask",
    name: "Patchs Contour des Yeux",
    category: "Soin Yeux",
    desc: "Hydrate & Décongestionne.",
    img: IMAGES.EYE_MASK,
    url: LINKS.EYE_MASK,
  },
  {
    id: "concealer",
    name: "Correcteur Skin Perfecting",
    category: "Correction",
    desc: "Camouflage cernes.",
    img: IMAGES.FOUNDATION_LIQUID, // Fallback visuel
    url: LINKS.CONCEALER,
  },
  {
    id: "powder_prime",
    name: "Poudre BeHold",
    category: "Finition",
    desc: "Poudre hydratante & fixante.",
    img: IMAGES.POWDER_PRIME_SET,
    url: LINKS.POWDER_PRIME_SET,
  },
  {
    id: "spray",
    name: "Brume Prime & Set",
    category: "Finition",
    desc: "Brume hydratante & fixante.",
    img: IMAGES.SPRAY,
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
    image: "/Teints.png",
    options: [
      { label: "Très Foncé", value: "Deep" },
      { label: "Foncé", value: "Dark" },
      { label: "Entre clair et foncé", value: "Medium" },
      { label: "Clair", value: "Fair" },
      { label: "Très Clair", value: "VeryFair" },
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
      { label: "Relâchement (Rides/Fermeté)", value: "Mature" },
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

// --- 4. GÉNÉRATEUR HTML POUR EMAIL ---
const generateEmailHtml = (userInfo, answers, shade, status, alertReason, recommendations, getLabel) => {
  const isComplex = status === "complex";
  
  // Ordre de priorité
  const categoryOrder = {
    "Teint": 1,
    "Base": 2,
    "Finition": 3,
    "Correction": 4,
    "Soin Yeux": 5,
    "Soin Profond": 6,
    "Soin Tenseur": 7,
    "Soin Eclat": 8,
    "Soin": 9,
  };

  const sortedRecommendations = [...recommendations]
    .filter(p => p)
    .sort((a, b) => {
      const orderA = categoryOrder[a.category] || 99;
      const orderB = categoryOrder[b.category] || 99;
      return orderA - orderB;
    });

  // Récupération du produit de teint pour l'affichage "Héros" dans le mail
  const foundation = recommendations.find(p => p.category === "Teint");

  // HTML avec images
  const productsHtml = sortedRecommendations
    .map(p => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; width: 60px; vertical-align: middle;">
           <img src="${p.img}" alt="${p.name}" width="50" height="50" style="display: block; border-radius: 8px; object-fit: cover; border: 1px solid #f1f5f9;">
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
          <strong style="color: #1e293b; font-size: 14px;">${p.name}</strong><br>
          <span style="color: #64748b; font-size: 12px;">${p.desc}</span><br>
          <span style="display: inline-block; background: #f3e8ff; color: #7c3aed; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-top: 4px;">${p.category}</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; vertical-align: middle;">
          <a href="${p.url}" style="display: inline-block; background: #1e293b; color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: bold;">Voir</a>
        </td>
      </tr>
    `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ton Diagnostic Beauté Personnalisé</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">✨ Ton Diagnostic Beauté</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Personnalisé pour ${userInfo.name}</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px;">
              <table width="100%" style="background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 16px;">
                    <h2 style="margin: 0 0 12px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">📋 Ton Profil</h2>
                    <table width="100%" style="font-size: 13px; color: #334155;">
                      <tr><td style="padding: 4px 0;"><strong>Teint :</strong> ${getLabel("tone", answers.tone)}</td></tr>
                      <tr><td style="padding: 4px 0;"><strong>Sous-ton :</strong> Soleil ${getLabel("sun", answers.sun)} / Veines ${getLabel("veins", answers.veins)}</td></tr>
                      <tr><td style="padding: 4px 0;"><strong>Type de peau :</strong> ${getLabel("skinType", answers.skinType)}</td></tr>
                      <tr><td style="padding: 4px 0;"><strong>État :</strong> ${getLabel("skinCondition", answers.skinCondition)}</td></tr>
                      <tr><td style="padding: 4px 0;"><strong>Texture préférée :</strong> ${getLabel("preference", answers.preference)}</td></tr>
                      <tr><td style="padding: 4px 0;"><strong>Besoin prioritaire :</strong> ${getLabel("concern", answers.concern)}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${isComplex ? `
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <table width="100%" style="background: #fef3c7; border-radius: 12px; border: 1px solid #fcd34d;">
                <tr>
                  <td style="padding: 16px;">
                    <h2 style="margin: 0 0 8px 0; font-size: 16px; color: #92400e;">🔒 Analyse Personnalisée Requise</h2>
                    <p style="margin: 0; font-size: 13px; color: #92400e; line-height: 1.5;">
                      Ton profil est atypique (${alertReason}). Pour éviter une erreur de teinte, <strong>je dois valider personnellement ta recommandation.</strong>
                    </p>
                    <a href="${INSTAGRAM_DM_LINK}" style="display: inline-block; margin-top: 12px; background: #f59e0b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">💬 Me contacter sur Instagram</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : `
          <tr>
            <td style="padding: 0 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <tr>
                  <td width="100" style="padding: 16px; background: #f8fafc; border-right: 1px solid #e2e8f0; vertical-align: middle; text-align: center;">
                    ${foundation ? `<img src="${foundation.img}" alt="Fond de teint" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; display: block; margin: 0 auto;">` : ''}
                  </td>
                  <td style="padding: 16px; vertical-align: middle;">
                     <span style="display: inline-block; background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 12px; font-size: 10px; font-weight: bold; text-transform: uppercase; margin-bottom: 4px;">✅ Profil Validé</span>
                     <p style="margin: 0; font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: bold;">Ta teinte idéale</p>
                     <h2 style="margin: 4px 0; font-size: 24px; color: #7c3aed; line-height: 1;">${shade}</h2>
                     <p style="margin: 0 0 12px 0; font-size: 12px; color: #334155;">${foundation ? foundation.name : ''}</p>
                     <a href="${foundation ? foundation.url : '#'}" style="display: inline-block; background: #1e293b; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: bold;">Commander ma teinte</a>
                  </td>
                </tr>
              </table>
              ${alertReason ? `<p style="background: #eff6ff; color: #1e40af; padding: 12px; border-radius: 8px; font-size: 12px; margin: 16px 0 0 0;">${alertReason}</p>` : ''}
            </td>
          </tr>

          <tr>
            <td style="padding: 16px 24px;">
              <table width="100%" style="background: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
                <tr>
                  <td style="padding: 12px 16px;">
                    <strong style="color: #166534; font-size: 11px; text-transform: uppercase;">🛡️ Garantie Love It Incluse</strong>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #15803d;">Satisfaite ou échangée. <strong>Même si le produit est ouvert.</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <h2 style="margin: 0 0 16px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; text-align: center;">🎁 Produits adaptés à tes besoins </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                ${productsHtml}
              </table>
            </td>
          </tr>
          `}

          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <table width="100%" style="background: #eff6ff; border-radius: 12px; border: 1px solid #bfdbfe; text-align: center;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #1e40af; font-weight: bold;">Tu as un doute ? Une question ?</p>
                    <p style="margin: 0 0 16px 0; font-size: 12px; color: #3b82f6;">Envoie-moi ta photo pour une validation personnalisée !</p>
                    <a href="${INSTAGRAM_DM_LINK}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">💬 Me contacter sur Instagram</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                Ce diagnostic a été généré automatiquement.<br>
                Pour toute question, contacte-moi sur Instagram : <a href="${INSTAGRAM_DM_LINK}" style="color: #7c3aed;">@sonia_bonnefoy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

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
    
    // Ajouter le produit de teint avec l'URL dynamique selon la teinte
    const foundationProduct = PRODUCTS_DB.find((p) => p.id === finalProduct);
    if (foundationProduct) {
      let dynamicUrl = foundationProduct.url;
      
      if (finalProduct === "fdt_mineral") {
        dynamicUrl = getSerumFoundationUrl(calculatedShade);
      } else if (finalProduct === "fdt_bb") {
        dynamicUrl = getBBCreamUrl(calculatedShade);
      } else if (finalProduct === "fdt_creme") {
        dynamicUrl = getCreamFoundationUrl(calculatedShade);
      } else if (finalProduct === "fdt_poudre") {
        dynamicUrl = getPowderFoundationUrl(calculatedShade);
      }
      
      recs.push({ ...foundationProduct, url: dynamicUrl });
    }

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
      recommendations: recs,
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

    const analysisResult = analyzeProfile(quizAnswers);

    if (N8N_WEBHOOK_URL && N8N_WEBHOOK_URL.startsWith("http")) {
      try {
        const emailHtml = generateEmailHtml(
          userInfo,
          quizAnswers,
          analysisResult.shadeCalculated,
          analysisResult.statusCalculated,
          analysisResult.reason,
          analysisResult.recommendations,
          getLabel
        );

        const productsList = analysisResult.recommendations
          .filter(p => p)
          .map(p => ({
            name: p.name,
            category: p.category,
            description: p.desc,
            url: p.url,
            img: p.img,
          }));

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
          products: productsList,
          emailHtml: emailHtml,
          emailSubject: `✨ ${userInfo.name}, voici ton diagnostic beauté personnalisé !`,
        };

        const response = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("Envoyé à N8N avec succès !");
        } else {
          console.error("Erreur serveur N8N");
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

  const foundationProduct = recommendations.find(p => p.category === "Teint");

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
            Trouve ta teinte exacte et les produits adaptés à ta peau.
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
        <div className="h-full flex flex-col p-6 bg-white overflow-y-auto">
          <button
            onClick={() => {
              if (qIdx > 0) {
                setQIdx(qIdx - 1);
              } else {
                setStep("welcome");
              }
            }}
            className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center mb-4 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>

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
              <p className="text-sm text-purple-600 font-bold mb-4 flex items-center gap-1">
                <CheckSquare size={16} /> Plusieurs choix possibles
              </p>
            )}

            <div
              className={`${
                QUESTIONS[qIdx].image
                  ? "flex flex-col sm:flex-row gap-4 items-start"
                  : ""
              }`}
            >
              {QUESTIONS[qIdx].image && (
                <div className="order-1 sm:order-2 flex-shrink-0 flex justify-center sm:justify-end w-full sm:w-auto mb-4 sm:mb-0">
                  <img
                    src={QUESTIONS[qIdx].image}
                    alt="Guide teintes"
                    className="w-28 sm:w-32 md:w-36 h-auto rounded-xl shadow-lg object-contain"
                  />
                </div>
              )}

              <div
                className={`space-y-3 ${
                  QUESTIONS[qIdx].image ? "flex-1 order-2 sm:order-1" : ""
                }`}
              >
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
        <div className="h-full flex flex-col justify-center p-8 bg-white text-center relative">
          <button
            onClick={() => {
              setQIdx(QUESTIONS.length - 1);
              setStep("quiz");
            }}
            className="absolute top-6 left-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>

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
                <div className="mb-6">
                  {/* Carte Héros Produit + Teinte */}
                  <div className="bg-white rounded-2xl p-4 shadow-lg shadow-purple-100 border border-purple-100 flex items-center gap-4 relative overflow-hidden">
                    {/* Effet d'arrière-plan subtil */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 z-0"></div>
                    
                    {/* Image Produit */}
                    <div className="w-24 h-24 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative z-10">
                      <img
                        src={foundationProduct?.img}
                        alt={foundationProduct?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Infos Teinte & Action */}
                    <div className="flex-1 text-left relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 size={10} /> Validé
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ta teinte idéale</p>
                      <h2 className="text-2xl font-black text-purple-600 leading-tight mb-1">{shadeName}</h2>
                      <p className="text-xs text-slate-600 font-medium mb-3 line-clamp-1">{foundationProduct?.name}</p>
                      
                      <a
                        href={foundationProduct?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-full bg-slate-900 text-white text-xs font-bold py-2.5 rounded-lg gap-2 hover:bg-slate-800 transition-colors shadow-md"
                      >
                        <ShoppingBag size={12} /> Commander ma teinte
                      </a>
                    </div>
                  </div>

                  {/* Alerte éventuelle */}
                  {alertReason && (
                    <div className="mt-3 bg-blue-50 text-blue-800 text-xs p-3 rounded-xl border border-blue-100 font-medium text-left flex gap-2">
                      <span>ℹ️</span>
                      <span>{alertReason}</span>
                    </div>
                  )}
                </div>

                <GuaranteeBadge />

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 text-center">
                  <p className="text-sm text-blue-800 font-bold mb-3">
                    Tu as un doute ? Envoie-moi ta photo pour une validation manuelle !
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
            )}
          </div>

          {status === "standard" && (
            <div className="p-6 pb-20">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
                Produits adaptés à tes besoins
              </p>
              <div className="space-y-3 opacity-90">
                {[...recommendations]
                  .filter(p => p)
                  .sort((a, b) => {
                    const categoryOrder = {
                      "Teint": 1,
                      "Base": 2,
                      "Finition": 3,
                      "Correction": 4,
                      "Soin Yeux": 5,
                      "Soin Profond": 6,
                      "Soin Tenseur": 7,
                      "Soin Eclat": 8,
                      "Soin": 9,
                    };
                    const orderA = categoryOrder[a.category] || 99;
                    const orderB = categoryOrder[b.category] || 99;
                    return orderA - orderB;
                  })
                  .map((p, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center animate-in slide-in-from-bottom-4"
                  >
                    <div className="w-14 h-14 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                       <img 
                          src={p.img} 
                          alt={p.name} 
                          className="w-full h-full object-cover"
                        />
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
                      💧 <strong>Conseil Peau à besoins spécifques :</strong> Excellent choix
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
