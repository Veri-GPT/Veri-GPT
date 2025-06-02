
import { createContext, useContext, useEffect, useState } from "react";

/**
 * Tema sistemi türleri
 * Uygulama artık sadece koyu tema kullanır
 */
type Theme = "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Başlangıç durumu - her zaman koyu tema
const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Tema sağlayıcı bileşeni
 * Uygulamada sadece koyu tema kullanımını sağlar
 */
export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "veri-gpt-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  // Tema uygulama etkisi - her zaman koyu temayı ayarlar
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Önceki tema sınıflarını temizle
    root.classList.remove("light", "dark");
    
    // Her zaman koyu temayı uygula
    root.classList.add("dark");
  }, []);

  // Tema değeri - her zaman koyu tema döndürür
  const value = {
    theme: "dark" as Theme,
    setTheme: (newTheme: Theme) => {
      // Tema değişimi devre dışı - her zaman koyu tema kalır
      localStorage.setItem(storageKey, "dark");
      setTheme("dark");
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Tema hook'u
 * Bileşenlerde tema bilgisine erişim sağlar
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
