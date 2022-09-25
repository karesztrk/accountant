import {
  Receipt2,
  Home2,
  Users,
  Cash,
  Icon,
  ReceiptTax,
} from "tabler-icons-react";

interface Page {
  label: string;
  href: string;
}

interface NavbarPage extends Page {
  icon: Icon;
}

export const homePage: NavbarPage = { icon: Home2, label: "Home", href: "/" };

export const loginPage = { label: "Login", href: "/login" };

export const partnersPage: NavbarPage = {
  icon: Users,
  label: "Partners",
  href: "/partner",
};

export const newPartnerPage: NavbarPage = {
  icon: Cash,
  label: "New Tax",
  href: "/partner/new",
};

export const financePage: NavbarPage = {
  icon: Cash,
  label: "Finance",
  href: "/finance",
};

export const invoicesPage: NavbarPage = {
  icon: Receipt2,
  label: "Invoices",
  href: "/finance/invoice",
};

export const paymentsPage: NavbarPage = {
  icon: Cash,
  label: "Payments",
  href: "/finance/payment",
};

export const taxesPage: NavbarPage = {
  icon: ReceiptTax,
  label: "Taxes",
  href: "/finance/tax",
};

export const newInvoicePage: NavbarPage = {
  icon: Cash,
  label: "New Invoice",
  href: "/finance/invoice/new",
};

export const newPaymentPage: NavbarPage = {
  icon: Cash,
  label: "New Payment",
  href: "/finance/payment/new",
};

export const newTaxPage: NavbarPage = {
  icon: Cash,
  label: "New Tax",
  href: "/finance/tax/new",
};

export const pages: NavbarPage[] = [homePage, partnersPage, financePage];
