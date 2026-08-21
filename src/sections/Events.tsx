import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActivityManager } from "@/components/ActivityManager";
import { useActivities } from "@/hooks/useActivities";
import { useIsAdmin } from "@/contexts/AuthContext";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  Sparkles,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

const iconMap: Record<string, React.ElementType> = {
  Weekly: Users,
  Special: Star,
  Seasonal: Sparkles,
  Annual: Calendar,
  Monthly: Calendar,
  Other: Calendar,
};

const colorMap: Record<string, string> = {
  Weekly: "bg-blue-500",
  Special: "bg-amber-500",
  Seasonal: "bg-emerald-500",
  Annual: "bg-purple-500",
  Monthly: "bg-rose-500",
  Other: "bg-gray-500",
};

export function Events() {
  const {
    activities,
    isLoaded,
    addActivity,
    updateActivity,
    deleteActivity,
    resetToDefault,
  } = useActivities();

  const isAdmin = useIsAdmin();

  const [selectedEvent, setSelectedEvent] = useState<(typeof activities)[0] | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showManager, setShowManager] = useState(false);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      `Thank you ${formData.name}! You've successfully registered for ${selectedEvent?.title}. We'll contact you soon with more details.`
    );
    setFormData({ name: "", email: "", phone: "" });
    setSelectedEvent(null);
  };

  const getIcon = (category: string) => iconMap[category] || Calendar;
  const getColor = (category: string) => colorMap[category] || "bg-gray-500";

  // Get all posters from activities with posters
  const allPosters = activities
    .filter((a) => a.poster)
    .map((a) => ({ poster: a.poster!, title: a.title, id: a.id }));

  const nextPoster = () => {
    setCurrentPosterIndex((prev) =>
      prev === allPosters.length - 1 ? 0 : prev + 1
    );
  };

  const prevPoster = () => {
    setCurrentPosterIndex((prev) =>
      prev === 0 ? allPosters.length - 1 : prev - 1
    );
  };

  if (!isLoaded) {
    return (
      <section id="events">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">Loading activities...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="events">
      {/* FULL SCREEN POSTER GALLERY - TOP SECTION */}
      {allPosters.length > 0 ? (
        <div className="relative w-full h-screen bg-black">
          {/* Full Screen Poster Image */}
          <div className="absolute inset-0">
            <img
              src={allPosters[currentPosterIndex].poster}
              alt={allPosters[currentPosterIndex].title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Poster Navigation */}
          {allPosters.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg bg-white/20 hover:bg-white/40 backdrop-blur-sm border-0"
                onClick={prevPoster}
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg bg-white/20 hover:bg-white/40 backdrop-blur-sm border-0"
                onClick={nextPoster}
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </Button>
            </>
          )}

          {/* Poster Info - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {allPosters[currentPosterIndex].title}
              </h2>

              {/* Dots Indicator */}
              {allPosters.length > 1 && (
                <div className="flex gap-3 mt-6">
                  {allPosters.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPosterIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentPosterIndex
                          ? "w-8 bg-primary"
                          : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Scroll Down Indicator */}
              <div className="mt-8 flex items-center gap-2 text-white/70 animate-bounce">
                <span className="text-sm">Scroll down for event details</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Poster Counter */}
          <div className="absolute top-24 right-8 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white text-sm font-medium">
              {currentPosterIndex + 1} / {allPosters.length}
            </span>
          </div>
        </div>
      ) : (
        /* No Posters - Show placeholder */
        <div className="relative w-full h-[60vh] bg-muted flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-muted-foreground mb-2">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground">
              {isAdmin ? "Add posters to showcase your events" : "Check back soon for event posters"}
            </p>
          </div>
        </div>
      )}

      {/* EVENT DETAILS & SIGNUP SECTION - BELOW */}
      <div className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calendar className="h-4 w-4" />
              Event Details
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Sign Up For <span className="text-primary">Our Events</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our activities and register to join us. We look forward to seeing you!
            </p>
          </div>

          {/* Admin Controls - Only visible to logged-in admins */}
          {isAdmin && (
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowManager(!showManager)}
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  {showManager ? "Hide" : "Manage"} Activities
                </Button>
              </div>

              {showManager && (
                <Card className="border-2 border-primary/20">
                  <CardContent className="p-6">
                    <ActivityManager
                      activities={activities}
                      onAdd={addActivity}
                      onUpdate={updateActivity}
                      onDelete={deleteActivity}
                      onReset={resetToDefault}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Featured Activities */}
          {activities.filter((a) => a.featured).length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {activities
                .filter((a) => a.featured)
                .map((activity) => {
                  const Icon = getIcon(activity.category);
                  const color = getColor(activity.category);
                  return (
                    <Card
                      key={activity.id}
                      className="overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all duration-300"
                    >
                      {/* Small Poster Thumbnail if exists */}
                      {activity.poster && (
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={activity.poster}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <Badge
                            variant="secondary"
                            className="absolute top-3 right-3 bg-primary text-white"
                          >
                            {activity.category}
                          </Badge>
                        </div>
                      )}

                      {!activity.poster && (
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                              <Icon
                                className={`h-6 w-6 ${color.replace("bg-", "text-")}`}
                              />
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary"
                            >
                              {activity.category}
                            </Badge>
                          </div>
                        </CardHeader>
                      )}

                      <CardContent className={activity.poster ? "pt-4" : ""}>
                        <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {activity.description}
                        </p>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{activity.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{activity.location}</span>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full"
                              onClick={() => setSelectedEvent(activity)}
                            >
                              Sign Up Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Sign Up for {activity.title}</DialogTitle>
                              <DialogDescription>
                                Fill in your details below and we'll contact you with
                                more information.
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSignup} className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                  id="name"
                                  placeholder="Enter your full name"
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                  }
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="Enter your email"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  placeholder="Enter your phone number"
                                  value={formData.phone}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      phone: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              <Button type="submit" className="w-full">
                                Complete Registration
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          )}

          {/* Other Activities */}
          {activities.filter((a) => !a.featured).length > 0 && (
            <div className="grid sm:grid-cols-2 gap-6">
              {activities
                .filter((a) => !a.featured)
                .map((activity) => {
                  const Icon = getIcon(activity.category);
                  const color = getColor(activity.category);
                  return (
                    <Card
                      key={activity.id}
                      className="hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      {activity.poster && (
                        <div className="h-32 overflow-hidden">
                          <img
                            src={activity.poster}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {!activity.poster && (
                            <div
                              className={`p-3 rounded-xl ${color} bg-opacity-10 shrink-0`}
                            >
                              <Icon
                                className={`h-5 w-5 ${color.replace("bg-", "text-")}`}
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{activity.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {activity.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {activity.description}
                            </p>
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {activity.schedule}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          )}

          {activities.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No activities yet.
                {isAdmin && " Click 'Manage Activities' to add some!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
