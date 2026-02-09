import { Button } from "@/components/ui/button";
import { ChevronDown, Users, BookOpen } from "lucide-react";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/logo.png"
            alt="Arkaan Foundation"
            className="h-32 w-auto md:h-48 lg:h-56 rounded-2xl shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-4 font-medium tracking-wide uppercase">
          Islamic Youth Community
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Building <span className="text-primary">Strong Foundations</span>
          <br />
          For Our Youth
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Arkaan Foundation is dedicated to empowering young Muslims through
          education, community engagement, and spiritual growth in Manchester.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("#events")}
            className="bg-primary hover:bg-primary/90 text-white px-8"
          >
            <Users className="mr-2 h-5 w-5" />
            Join Our Events
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#classes")}
            className="border-primary text-primary hover:bg-primary/10 px-8"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Explore Classes
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scrollToSection("#about")}
          className="rounded-full"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </Button>
      </div>
    </section>
  );
}
