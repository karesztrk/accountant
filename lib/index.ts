export const tableNames = {
  invoice: "invoice" as const,
  partner: "partner" as const,
  payment: "payment" as const,
  tax: "tax" as const,
  transaction: "transaction" as const,
};

export const viewNames = {
  income: "income_per_month" as const,
  expense: "expense_per_month" as const,
};

export const cacheKeys = {
  invoices: (condition?: Record<string, unknown>) => {
    return condition ? [tableNames.invoice, condition] : [tableNames.invoice];
  },
  invoice: (id?: string) => (id ? [tableNames.invoice, { id }] : null),

  partners: [tableNames.partner],
  partner: (id?: string) => (id ? [tableNames.partner, { id }] : null),

  payments: [tableNames.payment],
  payment: (id?: string) => (id ? [tableNames.payment, { id }] : null),
  selectedPaymentId: () => "selectedPaymentId",

  taxes: [tableNames.tax],
  tax: (id?: string) => (id ? [tableNames.tax, { id }] : null),
  selecetdTaxId: () => "selecetdTaxId",

  dashboardData: () => [viewNames.income],

  finance: () => ["finance"],
};
