export const tableNames = {
  invoice: "invoice",
  partner: "partner",
  payment: "payment",
};

export const cacheKeys = {
  invoices: tableNames.invoice,
  invoice: (id?: string) => [id, tableNames.invoice],

  partners: tableNames.partner,
  partner: (id?: string) => [id, tableNames.partner],

  payments: tableNames.payment,
  payment: (id?: string) => [id, tableNames.payment],
};
