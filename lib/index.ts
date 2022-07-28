export const cacheKeys = {
  invoices: "invoices",
  invoice: (id?: string) => `invoice/${id}`,

  partners: "partners",
  partner: (id?: string) => `partner/${id}`,
};

export const tableNames = {
  invoice: "invoice",
  partner: "partner",
};
