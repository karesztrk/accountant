import { handleAuth } from "@supabase/auth-helpers-nextjs";
import { loginPage } from "components/navbar/pages";

export default handleAuth({
  logout: { returnTo: loginPage.href },
  // Keep the user logged in for a year.
  cookieOptions: { lifetime: 1 * 365 * 24 * 60 * 60 },
});
