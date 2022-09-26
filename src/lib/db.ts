import {createClient} from "@supabase/supabase-js";
import {VITE_APP_SUPABASE_URL, VITE_APP_SUPABASE_ANON_KEY} from '$env/static/private';

export const supabase = createClient(
    VITE_APP_SUPABASE_URL,
    VITE_APP_SUPABASE_ANON_KEY
)