export const tableNames = {
  invoice: "invoice" as const,
  partner: "partner" as const,
  payment: "payment" as const,
  tax: "tax" as const,
  transaction: "transaction" as const,
};

export const viewNames = {
  revenue: "revenue_per_month" as const,
};

export const cacheKeys = {
  invoices: (condition?: Record<string, unknown>) => {
    return condition ? [tableNames.invoice, condition] : [tableNames.invoice];
  },
  invoice: (id?: string) => [tableNames.invoice, { id }],

  partners: [tableNames.partner],
  partner: (id?: string) => [tableNames.partner, { id }],

  payments: [tableNames.payment],
  payment: (id?: string) => [tableNames.payment, { id }],

  taxes: [tableNames.tax],
  tax: (id?: string) => [tableNames.tax, { id }],

  dashboardData: () => [viewNames.revenue],
};
