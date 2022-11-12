import { Group, Text } from "@mantine/core";
import { Dropzone, FileWithPath, PDF_MIME_TYPE } from "@mantine/dropzone";
import { data } from "components/currency-input/data";
import { FC, useState } from "react";
import { Photo, Upload, X } from "tabler-icons-react";
import { Invoice } from "types/client";

interface InvoiceDropAreaProps {
  onFinish?: (invoice: Invoice) => void;
}

const InvoiceDropArea: FC<InvoiceDropAreaProps> = ({ onFinish }) => {
  const [loading, setLoading] = useState(false);

  const onDrop = (files: FileWithPath[]) => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = () => {
      fetch("/api/pdf2json", {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: reader.result,
      })
        .then((response) => response.json())
        .then((response) => {
          if (response && Array.isArray(response) && response.length > 0) {
            const amount = Number(
              response[0][4].replace(/[^0-9.]+/g, "").replace(",", ""),
            );

            const invoiceNumber = response[0][12].replace("Invoice ", "");
            const issuedOn = new Date(
              response[0][13].replace("Issued on ", ""),
            );

            if (onFinish) {
              onFinish({
                amount,
                currency: data[0].value,
                invoice_number: invoiceNumber,
                issued_on: issuedOn,
                partner_id: "",
              });
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
  };

  return (
    <Dropzone
      onDrop={onDrop}
      maxSize={3 * 1024 ** 2}
      accept={PDF_MIME_TYPE}
      loading={loading}
    >
      <Group position="center" spacing="xl">
        <Dropzone.Accept>
          <Upload size={50} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <X size={50} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Photo size={50} />
        </Dropzone.Idle>

        <div>
          <Text size="md" align="center">
            Drag PDF invoice here or click to select files
          </Text>
          <Text size="xs" align="center" color="dimmed">
            Attach a single PDF file, that does not exceed 3MiB
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

export default InvoiceDropArea;
