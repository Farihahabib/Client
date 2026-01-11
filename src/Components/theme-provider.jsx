import { createContext } from "preact"
import { useContext, useEffect, useState } from "preact/hooks"

const initialState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem(storageKey)) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes first
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      console.log('Applied system theme:', systemTheme, 'Root classes:', root.className)
      return
    }

    // Apply the selected theme
    root.classList.add(theme)
    console.log('Applied theme:', theme, 'Root classes:', root.className)
    
    // Force a repaint to ensure theme is applied
    requestAnimationFrame(() => {
      document.body.style.display = 'none'
      document.body.offsetHeight // Trigger reflow
      document.body.style.display = ''
    })
  }, [theme])

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}