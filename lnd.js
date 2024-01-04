const LndGrpc = require("lnd-grpc");
const dotenv = require("dotenv");

dotenv.config();

const options = {
 host: process.env.HOST,
 cert: process.env.CERT,
 macaroon: process.env.MACAROON,
};

const lnd = new LndGrpc(options);

const connect = async () => {
 try {
   await lnd.connect();

   if (lnd.state !== "active") {
     throw new Error(
       "LND did not reach 'active' state within the expected time"
     );
   }

   console.log(`LND gRPC connection state: ${lnd.state}`);

   // Start the invoice event stream on successful connection
   // We want to always be listening for invoice events while the server is running
   invoiceEventStream();
 } catch (e) {
   console.log("error", e);
 }
};

const getBalance = async () => {
    const balance = await lnd.services.Lightning.walletBalance();
    return balance;
   };
   
   const getChannelBalance = async () => {
    const channelBalance = await lnd.services.Lightning.channelBalance();
    return channelBalance;
   };

   const createInvoice = async ({ value, memo }) => {
    const invoice = await lnd.services.Lightning.addInvoice({
      value: value,
      memo: memo,
    });
   
    // Save invoice to DB
   
    return invoice;
   };
   
   const payInvoice = async ({ payment_request }) => {
    const paidInvoice = await lnd.services.Lightning.sendPaymentSync({
      payment_request: payment_request,
    });
   
    return paidInvoice;
   };

   const invoiceEventStream = async () => {
    await lnd.services.Lightning.subscribeInvoices({
      add_index: 0,
      settle_index: 0,
    })
      .on("data", async (data) => {
            console.log('invoice change', data);
        if (data.settled) {
          // Check if the invoice exists in the database
          const existingInvoice = false;
   
          // If the invoice exists, update it in the database
          if (existingInvoice) {
            // update db
          } else {
          }
        }
      })
      .on("error", (err) => {
        console.log(err);
      });
   };   
   
   module.exports = {
    connect,
    getBalance,
    getChannelBalance,
    createInvoice,
    payInvoice,
    invoiceEventStream,
   };
   