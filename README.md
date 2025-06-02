
</head>
<body>

  <h1>📊 VeriGPT Dokümantasyonu</h1>
  <p><strong>VeriGPT</strong>, CSV ve Excel verilerini analiz etmek, görselleştirmek ve anlamlandırmak için tasarlanmış açık kaynaklı bir yapay zeka platformudur.</p>
  <p><strong>Son Güncelleme:</strong> Haziran 2025 &nbsp;|&nbsp; <strong>Sürüm:</strong> v1.0.0</p>

  <hr />

  <h2>📌 VeriGPT Nedir?</h2>
  <p>
    VeriGPT, veri analizi sürecini sadeleştiren açık kaynaklı bir <strong>yapay zeka</strong> uygulamasıdır.
    Kullanıcılar veri dosyalarını (CSV, Excel) yükleyerek verileri yapay zeka ile analiz edebilir ve otomatik grafiklerle görselleştirebilir.
  </p>
  <p>
    <strong>Gemini AI</strong> motoru sayesinde doğal dilde sorularla veri hakkında içgörüler elde etmek mümkündür.
  </p>

  <h3>📁 Desteklenen Dosya Türleri</h3>
  <ul>
    <li>CSV (.csv)</li>
    <li>Microsoft Excel (.xlsx, .xls)</li>
  </ul>

  <hr />

  <h2>✨ Temel Özellikler</h2>
  <ul>
    <li><strong>Veri Yükleme ve Önizleme:</strong> Sürükle-bırak ile kolay yükleme, akıllı sütun tanıma, önizleme.</li>
    <li><strong>Yapay Zeka Destekli Sohbet:</strong> Verilere doğal dil ile soru sorabilme.</li>
    <li><strong>Otomatik Görselleştirme:</strong> Çizgi, çubuk, pasta ve dağılım grafiklerini otomatik oluşturma ve özelleştirme.</li>
    <li><strong>Tarayıcıda Çalışma:</strong> Tüm analizler kullanıcı cihazında gerçekleştirilir; veri gizliliği korunur.</li>
  </ul>

  <hr />

  <h2>🚀 Hızlı Başlangıç</h2>

  <h3>🌐 Web Üzerinden Kullanım</h3>
  <ol>
    <li>Ana sayfada <strong>"Hemen Deneyin"</strong> butonuna tıklayın.</li>
    <li>CSV/Excel dosyanızı yükleyin.</li>
    <li>Önizleme sonrası sohbet veya grafik bölümüne geçin.</li>
  </ol>

  # Yerel Kurulum
  <pre><code># Repository'yi klonlayın
git clone https://github.com/Veri-GPT/Veri-GPT
cd verigpt

# Bağımlılıkları yükleyin
npm install

# Uygulamayı başlatın
npm run dev</code></pre>
  <p><strong>Not:</strong> Uygulama <code>http://localhost:5173</code> adresinde çalışacaktır.</p>

  <hr />

  <section id="api-integration">
  <h2>🔌 API Entegrasyonu (Gemini AI)</h2>
  <p>
    <strong>VeriGPT</strong>, yapay zeka destekli veri analizi için
    <a href="https://ai.google.dev/" target="_blank">Gemini API</a> kullanmaktadır. Sistemi çalıştırabilmek için API anahtarınızı projenize entegre etmeniz gerekmektedir.
  </p>

  <h3>1. Gemini API Anahtarını Alın</h3>
  <p>
    Google AI platformu üzerinden ücretsiz şekilde Gemini API anahtarınızı alabilirsiniz: <br />
    👉 <a href="https://makersuite.google.com/app/apikey" target="_blank">https://makersuite.google.com/app/apikey</a>
  </p>

  <h3>2. API Anahtarınızı Projeye Ekleyin</h3>
  <p>
    Anahtarınızı aldıktan sonra, proje dizininde yer alan <code>src/main.tsx</code> dosyasını açın ve 
    <strong>14. satırdaki</strong> <code>"YOUR API KEY"</code> ifadesinin yerine kendi anahtarınızı yapıştırın:
  </p>

  <pre><code class="language-ts">
const model = genAI.getGenerativeModel({ model: "gemini-pro", apiKey: "YOUR API KEY" });
  </code></pre>

  <p>
    ✔️ Artık VeriGPT yapay zeka destekli analiz için hazır!
  </p>
</section>


  <h2>🔧 Sistem Gereksinimleri</h2>
  <ul>
    <li><strong>Node.js:</strong> 16.x veya üzeri</li>
    <li><strong>npm:</strong> 8.x veya yarn 1.22.x</li>
    <li><strong>Web tarayıcısı:</strong> Chrome, Firefox, Safari, Edge</li>
  </ul>

  <hr />

  <h2>🧠 Teknoloji Yığını (Tech Stack)</h2>
  <ul>
    <li><strong>Frontend:</strong> React 18, TypeScript, Vite</li>
    <li><strong>UI:</strong> Tailwind CSS, shadcn/ui</li>
    <li><strong>AI:</strong> Gemini API (natural language processing)</li>
    <li><strong>Ekstra:</strong> CSV/Excel Parser, Chart.js</li>
  </ul>

  <hr />

  <h2>💻 Geliştirici Kılavuzu</h2>
  <p>Proje yapısı aşağıdaki gibidir:</p>
  <pre><code>verigpt/
src/
├── components/      # Yeniden kullanılabilir UI bileşenleri
├── pages/           # Sayfa bileşenleri (routing)
├── hooks/           # Özel React hook'ları
├── lib/             # Yardımcı kütüphaneler
└── types/           # TypeScript tür tanımları
</code></pre>
  <p><code>.env</code> dosyasını <code>.env.local</code> olarak kopyalayıp gerekli API anahtarlarını girin.</p>

  <hr />

  <h2>🤝 Katkıda Bulunma</h2>
  <ol>
    <li>Repository'yi fork edin</li>
    <li>Yeni bir branch oluşturun (<code>git checkout -b yeni-ozellik</code>)</li>
    <li>Değişikliklerinizi yapın ve commitleyin</li>
    <li>Pull request gönderin</li>
  </ol>

  <hr />

  <h2>📚 Sıkça Sorulan Sorular (SSS)</h2>
  <h4>VeriGPT ücretsiz mi?</h4>
  <p>Evet, tamamen açık kaynaklı ve ücretsizdir. MIT lisansı altındadır.</p>

  <h4>Ne kadar büyük veri yükleyebilirim?</h4>
  <p>Web sürümünde maksimum 10MB dosya yüklenebilir. Daha büyük veriler için yerel kurulum önerilir.</p>

  <h4>Verilerim güvenli mi?</h4>
  <p>Evet. Tüm analiz işlemleri tarayıcınızda yapılır, veriler sunucuya gönderilmez veya saklanmaz.</p>

  <h4>Kendi projemde kullanabilir miyim?</h4>
  <p>Evet. Eğitim ve araştırma amaçlı kullanabilirsiniz. Ticari kullanım için lisans koşullarına bakınız.</p>

  <hr />

  <h2>🪪 Lisans</h2>
  <p>Bu proje <strong>MIT Lisansı</strong> altında sunulmaktadır. Detaylar için <code>LICENSE</code> dosyasına göz atabilirsiniz.</p>
  <p><strong>⚠️ Not:</strong> Yalnızca eğitim ve araştırma amaçlı kullanım içindir. Ticari kullanım yasaktır.</p>

  <hr />

  <h2>📬 İletişim</h2>
  <p>Destek ve öneriler için: <a href="mailto:irfansemihdogru@outlook.com">irfansemihdogru@outlook.com</a></p>
  <p>Proje Sahibi: <strong>İrfan Semih Doğru</strong></p>

</body>
</html>
