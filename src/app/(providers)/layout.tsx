import { AuthProvider } from "@/context/auth.context";
import { createClient } from "@/supabase/server";
import React from "react";

async function ProvidersLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const me = user || null;

  return <AuthProvider initialMe={me}>{children}</AuthProvider>;
}

export default ProvidersLayout;
