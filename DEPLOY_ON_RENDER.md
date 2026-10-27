# ការដាក់ពង្រាយ Khmer Java Academy លើ Render (Deployment Guide) 🚀

ឯកសារណែនាំលម្អិតអំពីរបៀប Deploy គេហទំព័រ **Khmer Java Academy** ទៅកាន់ [Render.com](https://render.com) ដោយឥតគិតថ្លៃ (Free Tier) មានទាំងប្រព័ន្ធ Frontend (React), OpenJDK Runtime, Gemini AI Tutor Backend, និង Cloud PostgreSQL Realtime Sync។

---

## វិធីទី ១៖ ដាក់ពង្រាយតាមរយៈ Render Blueprint (ណែនាំ - ងាយស្រួលបំផុត) ⚡

ដោយសារគម្រោងនេះមានឯកសារ [`render.yaml`](./render.yaml) រួចជាស្រេច ការ Deploy គឺស្វ័យប្រវត្ត ១០០%៖

1. **រុញកូដ (Push Code) ទៅកាន់ GitHub** របស់អ្នក៖
   ```bash
   git add .
   git commit -m "feat: configure render deployment and cloud sync"
   git push origin master
   ```

2. ចូលទៅកាន់ **[Render Dashboard](https://dashboard.render.com/)**
3. ចុចប៊ូតុង **New +** (នៅខាងស្តាំលើ) រួចជ្រើសរើស **Blueprint**
4. ជ្រើសរើស GitHub Repository របស់អ្នក (`khmer-java-academy`)
5. Render នឹងអានឯកសារ `render.yaml` ដោយស្វ័យប្រវត្តិ។ បន្ទាប់មកវានឹងសួរឱ្យបំពេញ **Environment Variables** សំខាន់ៗចំនួន ៣៖
   - `GEMINI_API_KEY`: បញ្ចូល API Key របស់ Gemini (ឧទាហរណ៍៖ `AQ.Ab8RN6KeA32V...`)
   - `VITE_SUPABASE_URL`: បញ្ចូល Supabase URL របស់អ្នក (ឧទាហរណ៍៖ `https://xxxx.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY`: បញ្ចូល Supabase Anon Public Key របស់អ្នក
6. ចុច **Apply** — Render នឹងធ្វើការ build និង deploy ដោយស្វ័យប្រវត្តិក្នុងរយៈពេលប្រហែល ១-២ នាទី!

---

## វិធីទី ២៖ បង្កើត Web Service ដោយដៃ (Manual Web Service) 🛠️

ប្រសិនបើអ្នកចង់បង្កើត Web Service ផ្ទាល់ដោយខ្លួនឯង៖

1. ចូលទៅកាន់ [Render Dashboard](https://dashboard.render.com/) -> ចុច **New +** -> **Web Service**
2. ជ្រើសរើស GitHub Repository របស់អ្នក
3. បំពេញព័ត៌មានតាមទម្រង់ខាងក្រោម៖
   - **Name:** `khmer-java-academy`
   - **Region:** `Singapore` *(តំបន់ជិតប្រទេសកម្ពុជាបំផុត មានល្បឿនលឿន latency < 30ms)*
   - **Branch:** `master` (ឬ `main`)
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

4. នៅក្នុងផ្នែក **Environment Variables** ចុច **Add Environment Variable** ហើយបញ្ចូល៖
   | Key | Value | ចំណាំ |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Production environment |
   | `PORT` | `10000` | Render default port |
   | `AI_TUTOR_PROVIDER` | `gemini` | Gemini AI provider |
   | `GEMINI_API_KEY` | *(Gemini API Key របស់អ្នក)* | សម្រាប់ដំណើរការលោកគ្រូ Java AI |
   | `VITE_SUPABASE_URL` | *(Supabase URL របស់អ្នក)* | សម្រាប់ Multi-device Sync |
   | `VITE_SUPABASE_ANON_KEY` | *(Supabase Anon Key របស់អ្នក)* | សម្រាប់ទិន្នន័យ Progress & Notes |

5. នៅក្នុងផ្នែក **Advanced**:
   - **Health Check Path:** `/api/health`
   - **Auto-Deploy:** `Yes` *(Render នឹង Deploy ឡើងវិញរាល់ពេលអ្នក Push កូដថ្មី)*

6. ចុច **Create Web Service**!

---

## ការត្រួតពិនិត្យដំណើរការ (Health & Verification) ✅

នៅពេល Render បង្ហាញពាក្យថា **`Live`** អ្នកនឹងទទួលបាន URL ផ្លូវការ (ឧទាហរណ៍៖ `https://khmer-java-academy.onrender.com`)៖

- **គេហទំព័រចម្បង:** `https://your-app.onrender.com/`
- **ការរត់កូដ Java Playground:** `https://your-app.onrender.com/playground`
- **លោកគ្រូ Java AI (Gemini):** សាកល្បងចុចលើ Floating Button ឬ Header ដើម្បីជជែកជាមួយ AI
- **កំណត់ចំណាំ (Personal Notes):** សាកល្បងចូលរៀនមេរៀនណាមួយ ហើយចុចប៊ូតុង **កំណត់ចំណាំ**
- **Health Check:** `https://your-app.onrender.com/api/health` នឹងឆ្លើយតប `{"status":"ok", ...}`
