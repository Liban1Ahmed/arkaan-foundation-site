import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, BookOpen, Building2, Heart, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Youth Empowerment",
    description:
      "Creating a safe and welcoming space for young Muslims to connect, learn, and grow together.",
  },
  {
    icon: BookOpen,
    title: "Islamic Education",
    description:
      "Providing accessible Quranic and Islamic knowledge to strengthen faith and understanding.",
  },
  {
    icon: Building2,
    title: "Community Building",
    description:
      "Fostering brotherhood and sisterhood through regular gatherings and activities.",
  },
  {
    icon: Heart,
    title: "Spiritual Growth",
    description:
      "Supporting the spiritual journey of our youth through mentorship and guidance.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            About Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What is <span className="text-primary">Arkaan</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Arkaan (أركان) means "Pillars" in Arabic. Just as the five pillars
            form the foundation of Islam, Arkaan Foundation serves as a pillar
            of support for the Muslim youth in Manchester.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To empower young Muslims with the knowledge, skills, and
                    community support they need to thrive in their faith and
                    contribute positively to society. We aim to be a beacon of
                    light for the youth, guiding them towards a balanced Islamic
                    lifestyle.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10 border-secondary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/20">
                  <Sparkles className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To create a vibrant community of confident, knowledgeable,
                    and practicing young Muslims who are proud of their identity
                    and actively contribute to the betterment of their community
                    and the wider society.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What We Do */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">What We Do</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Through various programs and initiatives, we strive to make a
            positive impact on the lives of young Muslims.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50"
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <pillar.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{pillar.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
