import { useState, useEffect } from "react";

export interface Activity {
  id: string;
  title: string;
  description: string;
  schedule: string;
  time: string;
  location: string;
  category: string;
  poster?: string;
  featured: boolean;
  createdAt: number;
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    title: "Youth Nights",
    description:
      "Join us every Saturday for an evening of brotherhood, learning, and fun activities. A perfect way to connect with other young Muslims and strengthen your faith.",
    schedule: "Every Saturday",
    time: "6:00 PM - 9:00 PM",
    location: "Masjid Salaam, Moss Side",
    category: "Weekly",
    featured: true,
    createdAt: Date.now(),
  },
  {
    id: "2",
    title: "Umrah Trip 2025",
    description:
      "Embark on a spiritual journey to the blessed cities of Makkah and Madinah. Join us for this life-changing experience in October 2025.",
    schedule: "October 2025",
    time: "10 Days",
    location: "Makkah & Madinah, Saudi Arabia",
    category: "Special",
    featured: true,
    createdAt: Date.now(),
  },
  {
    id: "3",
    title: "Ramadan Program",
    description:
      "Special nightly programs during Ramadan including Taraweeh prayers, iftars, and Islamic lectures for youth.",
    schedule: "Coming Soon",
    time: "After Maghrib",
    location: "Masjid Salaam",
    category: "Seasonal",
    featured: false,
    createdAt: Date.now(),
  },
  {
    id: "4",
    title: "Summer Camp",
    description:
      "A week-long summer camp filled with outdoor activities, Islamic workshops, team building exercises, and memorable experiences.",
    schedule: "July 2025",
    time: "Full Day",
    location: "TBD",
    category: "Annual",
    featured: false,
    createdAt: Date.now(),
  },
];

const STORAGE_KEY = "arkaan-activities";

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setActivities(parsed);
      } catch {
        setActivities(defaultActivities);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultActivities));
      }
    } else {
      setActivities(defaultActivities);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultActivities));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever activities change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    }
  }, [activities, isLoaded]);

  const addActivity = (activity: Omit<Activity, "id" | "createdAt">) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const updateActivity = (id: string, updates: Partial<Activity>) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity
      )
    );
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  const resetToDefault = () => {
    setActivities(defaultActivities);
  };

  return {
    activities,
    isLoaded,
    addActivity,
    updateActivity,
    deleteActivity,
    resetToDefault,
  };
}
