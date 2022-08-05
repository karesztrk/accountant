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
  href: "/partners",
};

export const invoicesPage: NavbarPage = {
  icon: Receipt2,
  label: "Invoices",
  href: "/invoices",
};

export const paymentsPage: NavbarPage = {
  icon: Cash,
  label: "Payments",
  href: "/payments",
};

export const taxesPage: NavbarPage = {
  icon: ReceiptTax,
  label: "Taxes",
  href: "/taxes",
};

export const newPaymentPage: NavbarPage = {
  icon: Cash,
  label: "New Payment",
  href: "/payments/new",
};

export const newTaxPage: NavbarPage = {
  icon: Cash,
  label: "New Tax",
  href: "/taxes/new",
};

export const pages: NavbarPage[] = [
  homePage,
  partnersPage,
  invoicesPage,
  paymentsPage,
  taxesPage,
];
