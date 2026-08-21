import { useEffect, useState } from "react";
import { api } from "@/lib/api";

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
  createdAt: string;
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  async function fetchActivities() {
    const { data } = await api.get("/site/activities");
    setActivities(data || []);
    setIsLoaded(true);
  }

  async function addActivity(activity: Omit<Activity, "id" | "createdAt">) {
    const payload = {
      title: activity.title,
      description: activity.description,
      schedule: activity.schedule ?? "",
      time: activity.time ?? "",
      location: activity.location ?? "",
      category: activity.category ?? "Weekly",
      poster: activity.poster ?? null,
      featured: !!activity.featured,
    };

    await api.post("/site/activities", payload);
    await fetchActivities();
  }

  async function updateActivity(id: string, updates: Partial<Activity>) {
    await api.put(`/site/activities/${id}`, updates);
    await fetchActivities();
  }

  async function deleteActivity(id: string) {
    await api.delete(`/site/activities/${id}`);
    await fetchActivities();
  }

  function resetToDefault() {}

  return {
    activities,
    isLoaded,
    addActivity,
    updateActivity,
    deleteActivity,
    resetToDefault,
  };
}