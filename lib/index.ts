export const cacheKeys = {
  invoices: "invoices",
  invoice: (id?: string) => `invoice/${id}`,
};

export const tableNames = {
  invoice: "invoice",
};
