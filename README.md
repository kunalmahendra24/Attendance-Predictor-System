# 🎓 Attendance Predictor — IIIT Surat

ML-powered attendance prediction system trained on 38,000+ records across 9 subjects. Predicts campus footfall and optimizes temporary services (canteen, transport, labs).

## Tech Stack
- **React 18** + **Vite 5**
- **Recharts** for data visualization
- **Gradient Boosting ML Model** (predictions pre-computed)

## Deploy to Vercel

### Option 1: Via GitHub (Recommended)

1. Create a new GitHub repo
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
4. Vercel auto-detects Vite — just click **Deploy**

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

Output goes to `dist/` folder.
# Attendance-Predictor-System
