import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ohzvzhfskxamhsluxjxl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oenZ6aGZza3hhbWhzbHV4anhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2OTIxMzksImV4cCI6MjA4NjI2ODEzOX0.atDYpUEAOs-TCmOEjCCf3LA4hKVEa_ATeVGOtEXWmbs"
);
