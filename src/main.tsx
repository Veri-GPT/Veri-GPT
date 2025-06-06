import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * Uygulama başlatma ve konfigürasyon dosyası
 * React uygulamasını DOM'a bağlar
 */

// React uygulamasını başlat
createRoot(document.getElementById("root")!).render(<App />);
