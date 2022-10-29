import { Partner as ClientPartner } from "types/client";
import { PartnerInsert } from "types/database";

export const toRemotePartner = (
  userId: string,
  { name, address, vat, email }: ClientPartner,
  id?: number
): PartnerInsert => ({
  id,
  name,
  address,
  vat,
  email,
  user_id: userId,
});
