import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  MapPin,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const classSchedule = [
  {
    day: "Monday",
    time: "7:30 PM",
    type: "Quran Reading & Tajweed",
    level: "All Levels",
  },
  {
    day: "Thursday",
    time: "7:30 PM",
    type: "Quran Reading & Tajweed",
    level: "All Levels",
  },
];

const benefits = [
  "Free for all participants",
  "Qualified and experienced teachers",
  "Separate classes for brothers and sisters",
  "Progress tracking and certificates",
  "Friendly and supportive learning environment",
  "All ages welcome (children & adults)",
];

export function Classes() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="classes" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            Our Classes
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Free <span className="text-primary">Quran Classes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our weekly Quran classes designed to help you improve your
            recitation, understand Tajweed rules, and deepen your connection
            with the Book of Allah.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Class Info Card */}
          <Card className="border-2 border-primary/20 overflow-hidden">
            <div className="h-2 bg-primary" />
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Quran Classes</h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    FREE
                  </Badge>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Schedule</p>
                    <p className="text-muted-foreground">
                      Every Monday & Thursday
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-muted-foreground">7:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">
                      Masjid Salaam
                      <br />
                      40 Raby St, Moss Side
                      <br />
                      Manchester M16 7DJ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Who Can Join</p>
                    <p className="text-muted-foreground">
                      All ages welcome - Brothers & Sisters (separate classes)
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={scrollToContact} className="w-full">
                Register for Classes
              </Button>
            </CardContent>
          </Card>

          {/* Schedule & Benefits */}
          <div className="space-y-6">
            {/* Weekly Schedule */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Weekly Schedule
                </h4>
                <div className="space-y-3">
                  {classSchedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {item.day.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{item.day}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">{item.time}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.level}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  What You Get
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center max-w-3xl mx-auto">
          <blockquote className="text-lg md:text-xl italic text-muted-foreground border-l-4 border-primary pl-6">
            "The best of you are those who learn the Quran and teach it."
            <footer className="text-sm mt-2 not-italic">
              — Prophet Muhammad ﷺ (Sahih al-Bukhari)
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
