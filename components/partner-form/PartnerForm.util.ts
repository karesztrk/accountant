import { Partner } from "types/client";

export const toRemotePartner = (
  userId: string,
  { name, address, vat, email }: Partner,
  id?: number
) => ({
  id,
  name,
  address,
  vat,
  email,
  user_id: userId,
});
