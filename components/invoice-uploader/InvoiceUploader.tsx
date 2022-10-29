import { Center, Loader } from "@mantine/core";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Invoice } from "types/client";

const InvoiceDropArea = dynamic(
  () => import("components/invoice-parser/InvoiceDropArea"),
  {
    suspense: true,
  }
);

const InvoiceUploader = () => {
  const [parsedInvoice, setParsedInvoice] = useState<Invoice>();

  return parsedInvoice ? (
    <InvoiceForm invoice={parsedInvoice} />
  ) : (
    <Suspense
      fallback={
        <Center>
          <Loader />
        </Center>
      }
    >
      <InvoiceDropArea onFinish={setParsedInvoice} />
    </Suspense>
  );
};

export default InvoiceUploader;
