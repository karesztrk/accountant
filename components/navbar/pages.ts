import { Receipt2, Home2, Users, Cash, Icon } from "tabler-icons-react";

interface Page {
  icon: Icon;
  label: string;
  href: string;
}

export const homePage: Page = { icon: Home2, label: "Home", href: "/" };

export const partnersPage: Page = {
  icon: Users,
  label: "Partners",
  href: "/partners",
};

export const invoicesPage: Page = {
  icon: Receipt2,
  label: "Invoices",
  href: "/invoices",
};

export const paymentsPage: Page = {
  icon: Cash,
  label: "Payments",
  href: "/payments",
};

export const newPaymentPage: Page = {
  icon: Cash,
  label: "New Payment",
  href: "/payments/new",
};

export const pages: Page[] = [
  homePage,
  partnersPage,
  invoicesPage,
  paymentsPage,
];
