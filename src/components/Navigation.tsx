import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme/ModeToggle";
import { AdminLogin } from "./AdminLogin";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Classes", href: "#classes" },
  { name: "Donate", href: "#donate" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 md:h-24">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="flex items-center gap-3"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src="/logo.png"
                alt="Arkaan Foundation"
                className="h-14 w-auto md:h-16"
              />
            </a>
          </div>

          {/* Center: Decorative Text */}
          <div className="hidden xl:flex flex-1 items-center justify-center px-8">
            <div className="text-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent tracking-wider whitespace-nowrap">
                ARKAAN FOUNDATION
              </span>
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-1"></div>
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="flex items-center gap-1 ml-auto">
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium hover:text-primary"
                >
                  {link.name}
                </Button>
              ))}
            </div>
            <div className="ml-2">
              <ModeToggle />
            </div>
            <div className="hidden md:block ml-2">
              <AdminLogin />
            </div>
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  onClick={() => scrollToSection(link.href)}
                  className="justify-start text-left"
                >
                  {link.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
