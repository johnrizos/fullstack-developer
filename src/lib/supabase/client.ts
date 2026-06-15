"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True only when both env vars are present at build time. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Single browser client. The anon key is meant to be public — data is protected
 * by Row Level Security policies on the database, not by hiding the key.
 *
 * `null` when env vars are missing, so the app falls back to localStorage-only mode.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    })
  : null;
