import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

  // LOAD FROM DATABASE
  useEffect(() => {
    fetchActivities();

    const channel = supabase
      .channel("activities")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activities" },
        () => fetchActivities()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchActivities() {
    const { data } = await supabase
      .from("activities")
      .select("*")
      .order("createdAt", { ascending: false });

    setActivities(data || []);
    setIsLoaded(true);
  }

  // ADD
  async function addActivity(activity: Omit<Activity, "id" | "createdAt">) {
  console.log("ADDING ACTIVITY", activity);

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

  const { data, error } = await supabase
    .from("activities")
    .insert(payload)
    .select();

  console.log("INSERT RESULT", data, error);

  if (error) throw error;
}


  // UPDATE
  async function updateActivity(id: string, updates: Partial<Activity>) {
    await supabase.from("activities").update(updates).eq("id", id);
  }

  // DELETE
  async function deleteActivity(id: string) {
    await supabase.from("activities").delete().eq("id", id);
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
