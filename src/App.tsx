import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Events } from "@/sections/Events";
import { Classes } from "@/sections/Classes";
import { Donate } from "@/sections/Donate";
import { Contact } from "@/sections/Contact";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="arkaan-theme">
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Events />
            <Classes />
            <Donate />
            <Contact />
          </main>
          <Footer />
          <Toaster position="top-center" richColors />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
