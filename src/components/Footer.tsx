import { Heart } from "lucide-react";

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Classes", href: "#classes" },
  { name: "Donate", href: "#donate" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <img
              src="/logo.png"
              alt="Arkaan Foundation"
              className="h-16 w-auto mx-auto md:mx-0 mb-4"
            />
            <p className="text-sm text-muted-foreground">
              Building strong foundations for the Muslim youth of Manchester.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground mb-1">
              <a
                href="mailto:Admin@arkaan.co.uk"
                className="hover:text-primary transition-colors"
              >
                Admin@arkaan.co.uk
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              40 Raby St, Moss Side, Manchester M16 7DJ
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Arkaan Foundation. All rights
              reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" />{" "}
              for the Ummah
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
