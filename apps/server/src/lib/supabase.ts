import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

console.log("Supabase URL:", process.env.SUPABASE_URL);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default supabase;