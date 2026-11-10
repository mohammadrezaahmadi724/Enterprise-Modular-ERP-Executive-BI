'use client';

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 32, fontFamily: 'Helvetica' },
  title: { fontSize: 18, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
});

export function PayslipPdfButton({
  employeeName,
  netPay,
  tax,
  base,
}: {
  employeeName: string;
  netPay: number;
  tax: number;
  base: number;
}) {
  const Doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>فیش حقوق — {employeeName}</Text>
        <View style={styles.row}>
          <Text>پایه</Text>
          <Text>{base.toLocaleString('fa-IR')}</Text>
        </View>
        <View style={styles.row}>
          <Text>مالیات</Text>
          <Text>{tax.toLocaleString('fa-IR')}</Text>
        </View>
        <View style={styles.row}>
          <Text>خالص</Text>
          <Text>{netPay.toLocaleString('fa-IR')}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={Doc} fileName="payslip.pdf" className="text-sm underline">
      {({ loading }) => (loading ? 'آماده‌سازی PDF…' : 'دانلود PDF')}
    </PDFDownloadLink>
  );
}
