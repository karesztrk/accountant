import { handleAuth } from "@supabase/auth-helpers-nextjs";

export default handleAuth({
  logout: { returnTo: "/" },
  // Keep the user logged in for a year.
  cookieOptions: { lifetime: 1 * 365 * 24 * 60 * 60 },
});
