export const tableNames = {
  invoice: "invoice" as const,
  partner: "partner" as const,
  payment: "payment" as const,
};

export const cacheKeys = {
  invoices: tableNames.invoice,
  invoice: (id?: string) => [id, tableNames.invoice],

  partners: tableNames.partner,
  partner: (id?: string) => [id, tableNames.partner],

  payments: tableNames.payment,
  payment: (id?: string) => [id, tableNames.payment],
};
