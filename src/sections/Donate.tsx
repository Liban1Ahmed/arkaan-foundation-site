import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Repeat,
  Gift,
  Quote,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const donationAmounts = [10, 25, 50, 100, 250, 500];

const impactItems = [
  "Support free Quran classes for the community",
  "Fund youth programs and events",
  "Maintain and improve our facilities",
  "Provide resources for new Muslims",
  "Organize community iftars during Ramadan",
  "Sponsor youth on spiritual journeys",
];

export function Donate() {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);

  const handleDonate = (type: "monthly" | "onetime") => {
    const amount = customAmount || selectedAmount;
    if (!amount) {
      toast.error("Please select or enter a donation amount");
      return;
    }
    toast.success(
      `Thank you for your ${type === "monthly" ? "monthly" : "one-time"} donation of £${amount}! This is a demo - actual payment integration coming soon.`
    );
  };

  return (
    <section id="donate" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Heart className="h-4 w-4" />
            Support Our Mission
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Make a <span className="text-primary">Donation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your generous contributions help us continue serving the community
            and empowering our youth through Islamic education and programs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Hadith Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Quote className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Words of Wisdom</h3>
              </div>

              <blockquote className="text-lg md:text-xl leading-relaxed mb-6 text-foreground/90">
                "The Prophet ﷺ said:{' '}
                <span className="font-semibold text-primary">
                  'Charity does not decrease wealth'
                </span>
                . No servant spends in the cause of Allah except that Allah
                replaces it for him."
              </blockquote>

              <footer className="text-sm text-muted-foreground">
                — Sahih Muslim 2588
              </footer>

              <div className="mt-8 pt-6 border-t border-primary/20">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Your Impact
                </h4>
                <div className="space-y-3">
                  {impactItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation Form */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <Tabs defaultValue="monthly" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="monthly" className="gap-2">
                    <Repeat className="h-4 w-4" />
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger value="onetime" className="gap-2">
                    <Gift className="h-4 w-4" />
                    One-Time
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="monthly" className="space-y-6">
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Select Amount (Monthly)
                    </Label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={
                            selectedAmount === amount ? "default" : "outline"
                          }
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                          className="h-12"
                        >
                          £{amount}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        £
                      </span>
                      <Input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => handleDonate("monthly")}
                    className="w-full h-12 text-lg"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Donate Monthly
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Monthly donations help us plan and sustain our programs
                    throughout the year.
                  </p>
                </TabsContent>

                <TabsContent value="onetime" className="space-y-6">
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Select Amount (One-Time)
                    </Label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={
                            selectedAmount === amount ? "default" : "outline"
                          }
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                          className="h-12"
                        >
                          £{amount}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        £
                      </span>
                      <Input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => handleDonate("onetime")}
                    className="w-full h-12 text-lg"
                  >
                    <Gift className="mr-2 h-5 w-5" />
                    Donate Now
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Every contribution, no matter the size, makes a meaningful
                    difference.
                  </p>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-center text-muted-foreground">
                  Arkaan Foundation is a registered charity. All donations are
                  used transparently for community benefit.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
