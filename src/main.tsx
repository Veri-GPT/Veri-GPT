
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * Uygulama başlatma ve konfigürasyon dosyası
 * React uygulamasını DOM'a bağlar ve temel ayarları yapar
 */

// Gemini API anahtarını ayarla (eğer .env dosyasında yoksa)
if (!localStorage.getItem('geminiApiKey') && !import.meta.env.VITE_GEMINI_API_KEY) {
  // Geliştirme için varsayılan anahtar
  localStorage.setItem('geminiApiKey', 'YOU APİ KEY');
}

// React uygulamasını başlat
createRoot(document.getElementById("root")!).render(<App />);
