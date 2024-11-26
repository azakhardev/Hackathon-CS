import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { MoonIcon, SunIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useTranslation } from "react-i18next";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark", //system
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export function ThemeSwitch() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleThemeToggle = () => {
    if (theme === "dark") {
      setIsDialogOpen(true);
    } else {
      setTheme("dark");
    }
  };

  const handleDialogAction = () => {
    setTheme("light");
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button variant="ghost" onClick={handleThemeToggle}>
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </Button>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("translation:alert:title")}</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {t("translation:alert:first_para")}
              </p>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {t("translation:alert:second_para")}
              </p>
              <p className="leading-7 [&:not(:first-child)]:mt-6 font-bold">
                {t("translation:alert:third_para")}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogAction}>
              {t("translation:alert:yes")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsDialogOpen(false)}>
              {t("translation:alert:no")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
