import { Partner as ClientPartner } from "types/client";
import { Partner } from "types/database";

export const toRemotePartner = (
  userId: string,
  { name, address, vat, email }: ClientPartner,
  id?: number
): Partner => ({
  id,
  name,
  address,
  vat,
  email,
  user_id: userId,
});
