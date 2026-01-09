# 🏥 Clear Health Steps

> **Your AI-Powered Health Decision Support Platform**

Clear Health Steps is a comprehensive health guidance application that helps users understand symptoms, discover natural remedies, and make informed decisions about when to seek medical care. **This is NOT a diagnostic tool** - it's designed to educate and guide users toward appropriate healthcare actions.

---

## 🌟 Key Features

### 1. **Symptom Checker** (`/symptoms`)
An intelligent symptom assessment tool that:
- Analyzes user-reported symptoms
- Provides urgency classification (🟢 Self-Care, 🟡 See Doctor, 🔴 Emergency)
- Offers evidence-based recommendations
- Includes clear "When to See a Doctor" guidance

### 2. **Health Chat AI** (`/chat`)
An AI-powered conversational assistant that:
- Answers health-related questions
- Provides educational information
- Guides users through symptom understanding
- Always emphasizes consulting healthcare professionals

### 3. **Health Library** (`/library`)
A comprehensive medical knowledge base with:
- **100+ health conditions** covering:
  - Common Infections (Cold, Flu, COVID-19, Strep Throat)
  - Respiratory (Asthma, Bronchitis, Pneumonia)
  - Digestive (IBS, GERD, Food Poisoning)
  - Cardiovascular (Hypertension, Heart Palpitations)
  - Skin Conditions (Eczema, Psoriasis, Acne)
  - Mental Health (Anxiety, Depression, Insomnia)
  - Musculoskeletal (Back Pain, Arthritis)
  - Neurological (Migraine, Vertigo)
  - Infectious Diseases (Dengue, Malaria, TB)
  - And many more...

### 4. **Prescription Scanner** (`/scanner`)
A tool to:
- Scan and analyze prescription information
- Check drug interactions
- Understand medication details

### 5. **Natural Health Guide** (`/natural-health`)
Extensive natural wellness resources including:
- **Medicinal Leaves Database** with regional information
- **Interactive Map** showing medicinal plant locations
- **Natural Health Techniques** and remedies
- Traditional medicine knowledge

### 6. **Drug Interaction Checker**
Safety-focused tool to:
- Check interactions between multiple medications
- Identify potential risks
- Provide safety warnings

### 7. **User Dashboard** (`/dashboard`)
Personalized user area with:
- Health history tracking
- Saved symptoms and analyses
- User preferences

---

## 🏗️ Project Architecture

```
clear-health-steps/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components (49 components)
│   │   ├── layout/          # Layout components (Header, Footer, etc.)
│   │   ├── DrugInteractionChecker.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── MedicinalLeavesMap.tsx
│   │   └── MedicinalLeavesSection.tsx
│   │
│   ├── pages/               # Application pages
│   │   ├── Landing.tsx      # Home page with hero section
│   │   ├── SymptomChecker.tsx
│   │   ├── HealthChat.tsx
│   │   ├── HealthLibrary.tsx
│   │   ├── PrescriptionScanner.tsx
│   │   ├── NaturalHealth.tsx
│   │   ├── About.tsx
│   │   ├── Auth.tsx         # Authentication page
│   │   ├── Dashboard.tsx    # User dashboard
│   │   └── NotFound.tsx     # 404 page
│   │
│   ├── data/                # Static data files
│   │   ├── healthConditions.ts     # 100+ health conditions (59KB)
│   │   ├── medicinalLeaves.ts      # Medicinal plants database (65KB)
│   │   ├── naturalHealthTechniques.ts
│   │   ├── regionCoordinates.ts    # Map coordinates
│   │   └── symptomTranslations.ts  # Multi-language support
│   │
│   ├── contexts/            # React Context providers
│   │   └── AuthContext.tsx  # Authentication state management
│   │
│   ├── hooks/               # Custom React hooks
│   │
│   ├── i18n/                # Internationalization
│   │   └── locales/         # Language files (4 languages)
│   │
│   ├── integrations/        # External service integrations
│   │   └── supabase/        # Supabase client & types
│   │
│   └── lib/                 # Utility functions
│
├── supabase/
│   ├── functions/           # Edge Functions
│   │   ├── analyze-symptoms/
│   │   ├── check-drug-interactions/
│   │   ├── health-chat/
│   │   └── scan-prescription/
│   │
│   ├── migrations/          # Database migrations
│   └── config.toml
│
└── public/                  # Static assets
```

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 + Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animation** | Framer Motion |
| **State Management** | TanStack React Query |
| **Routing** | React Router DOM v6 |
| **Backend** | Supabase (Auth, Database, Edge Functions) |
| **i18n** | i18next (Multi-language support) |
| **Charts** | Recharts |
| **Maps** | Leaflet + React-Leaflet |
| **Forms** | React Hook Form + Zod validation |

---

## 🌍 Multi-Language Support

The application supports multiple languages:
- 🇺🇸 English
- 🇮🇳 Hindi
- 🇪🇸 Spanish
- 🇫🇷 French

---

## ⚠️ Important Safety Disclaimers

| Feature | Disclaimer |
|---------|------------|
| **Not a Diagnosis** | This platform does NOT diagnose diseases. It provides educational guidance only. |
| **Doctor Reviewed** | Information is reviewed by medical professionals but is not a substitute for professional medical advice. |
| **Privacy First** | Your health data is encrypted and protected. |

---

## 🚦 Urgency Level System

The app uses a color-coded urgency system:

| Level | Meaning | Description |
|-------|---------|-------------|
| 🟢 **Green** | Self-Care | Symptoms that can typically be managed at home |
| 🟡 **Amber** | See Doctor | Symptoms that should be evaluated by a healthcare provider |
| 🔴 **Red** | Emergency | Symptoms requiring immediate medical attention |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd clear-health-steps

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with:

```env
VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
VITE_SUPABASE_URL="your-supabase-url"
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📱 Application Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Home page with feature overview |
| `/symptoms` | Symptom Checker | AI-powered symptom analysis |
| `/chat` | Health Chat | Conversational health assistant |
| `/library` | Health Library | Browse 100+ health conditions |
| `/scanner` | Prescription Scanner | Scan and analyze prescriptions |
| `/natural-health` | Natural Health | Medicinal plants & natural remedies |
| `/about` | About | Trust & safety information |
| `/auth` | Authentication | Login/Register |
| `/dashboard` | Dashboard | User's personal health dashboard |

---

## 🔧 Supabase Edge Functions

| Function | Purpose |
|----------|---------|
| `analyze-symptoms` | AI-powered symptom analysis |
| `check-drug-interactions` | Drug interaction safety checker |
| `health-chat` | Conversational AI responses |
| `scan-prescription` | Prescription OCR and analysis |

---

## 📊 Data Overview

### Health Conditions Database
- **100+ conditions** with comprehensive information
- Each condition includes:
  - Name (with translations)
  - Category
  - Description
  - Symptoms list
  - Prevention tips
  - "When to See Doctor" guidelines

### Medicinal Leaves Database
- Extensive database of medicinal plants
- Regional availability information
- Traditional uses and benefits

---

## 🎨 Design System

The application uses a health-focused design system with:
- **Calming color palette** (Teal, Blue, Green)
- **Urgency colors** (Green, Amber, Red)
- **Accessible typography** (Plus Jakarta Sans)
- **Smooth animations** for better UX
- **Mobile-first responsive design**

---

## 📞 Support

This project was built with [Lovable](https://lovable.dev). For questions about the platform, visit [Lovable Documentation](https://docs.lovable.dev).

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

<p align="center">
  <strong>🏥 Clear Health Steps - Empowering Informed Health Decisions</strong>
</p>
