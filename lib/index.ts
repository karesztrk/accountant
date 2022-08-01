export const cacheKeys = {
  invoices: "invoices",
  invoice: (id?: string) => `invoice/${id}`,

  partners: "partners",
  partner: (id?: string) => `partner/${id}`,

  payments: "payments",
  payment: (id?: string) => `payment/${id}`,
};

export const tableNames = {
  invoice: "invoice",
  partner: "partner",
  payment: "payment",
};
