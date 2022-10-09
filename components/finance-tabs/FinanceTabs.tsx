import { Modal, Tabs, TabsValue } from "@mantine/core";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import InvoiceTable from "components/invoice-table/InvoiceTable";
import InvoiceUploader from "components/invoice-uploader/InvoiceUploader";
import { uploadInvoicePage } from "components/navbar/pages";
import PaymentForm from "components/payment-form/PaymentForm";
import PaymentTable from "components/payment-table/PaymentTable";
import TaxForm from "components/tax-form/TaxForm";
import TaxTable from "components/tax-table/TaxTable";
import useFinance from "hooks/finance/use-finance";
import { useRouter } from "next/router";
import { Cash, Receipt2, ReceiptTax } from "tabler-icons-react";

const invoiceTab = "invoice";
const paymentTab = "payment";
const taxTab = "tax";

const defaultTab = invoiceTab;

const FinanceTabs = () => {
  const { data, mutate } = useFinance();

  const router = useRouter();

  const [activeTab = invoiceTab] =
    router.query.path && router.query.path.length > 0
      ? (router.query.path as string[])
      : [defaultTab];

  const onTabChange = (value: TabsValue) =>
    router.push(`/finance/${value}`, undefined, { shallow: true });

  const onClose = () => {
    mutate({ opened: false });
  };

  const renderForm = () => {
    switch (activeTab) {
      case invoiceTab:
        return router.asPath === uploadInvoicePage.href ? (
          <InvoiceUploader />
        ) : (
          <InvoiceForm />
        );
      case taxTab:
        return <TaxForm />;
      case paymentTab:
        return <PaymentForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <Tabs value={activeTab} onTabChange={onTabChange}>
        <Tabs.List grow>
          <Tabs.Tab value={invoiceTab} icon={<Receipt2 size={20} />}>
            Invoices
          </Tabs.Tab>
          <Tabs.Tab value={paymentTab} icon={<Cash size={20} />}>
            Payments
          </Tabs.Tab>
          <Tabs.Tab value={taxTab} icon={<ReceiptTax size={20} />}>
            Taxes
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={invoiceTab} pt="xl">
          <InvoiceTable />
        </Tabs.Panel>

        <Tabs.Panel value={paymentTab} pt="xl">
          <PaymentTable />
        </Tabs.Panel>

        <Tabs.Panel value={taxTab} pt="xl">
          <TaxTable />
        </Tabs.Panel>
      </Tabs>
      <Modal
        opened={data!.opened}
        onClose={onClose}
        title={`Edit ${activeTab}`}
      >
        {renderForm()}
      </Modal>
    </>
  );
};

export default FinanceTabs;
