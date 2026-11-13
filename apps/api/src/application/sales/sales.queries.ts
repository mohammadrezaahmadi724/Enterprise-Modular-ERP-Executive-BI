import {
  getInvoice,
  getOrder,
  getQuote,
  getReturn,
  getSalesFulfillmentOverview,
  listInvoices,
  listOrders,
  listQuotes,
  listReturns,
  salesDocSource,
} from '../../modules/sales/sales.service';

export const listSalesOrdersQuery = listOrders;
export const getSalesOrderQuery = getOrder;
export const listSalesQuotesQuery = listQuotes;
export const getSalesQuoteQuery = getQuote;
export const listSalesInvoicesQuery = listInvoices;
export const getSalesInvoiceQuery = getInvoice;
export const listSalesReturnsQuery = listReturns;
export const getSalesReturnQuery = getReturn;
export const salesFulfillmentOverviewQuery = getSalesFulfillmentOverview;
export const salesDocumentSourceQuery = salesDocSource;
