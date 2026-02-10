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
    await supabase.from("activities").insert([
      {
        ...activity,
        createdAt: new Date().toISOString(),
      },
    ]);
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
