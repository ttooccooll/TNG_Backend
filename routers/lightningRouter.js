const router = require("express").Router();
const authenticate = require("../routers/middleware/authenticate");
const authenticateAdmin = require("../routers/middleware/authenticateAdmin");
const Invoice = require("../db/models/invoice.js");

const {
    getBalance,
    createInvoice,
    getChannelBalance,
    payInvoice,
   } = require("../lnd.js");


// GET the onchain balance
router.get("/balance", (req, res) => {
    getBalance()
      .then((balance) => {
        res.status(200).json(balance);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
   });

   // GET the lightning wallet balance
router.get("/channelbalance", (req, res) => {
    getChannelBalance()
      .then((channelBalance) => {
        res.status(200).json(channelBalance);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
   });   

// GET all invoices from the database
router.get("/invoices", (req, res) => {
  // Call the 'findAll' method from our Invoice model. This method retrieves all invoice records from the database.
  Invoice.findAll()
    .then((invoices) => {
      // If the promise resolves (i.e., the operation was successful), we send back a response with a status of 200 (OK)
      // and the list of invoices retrieved from the database.
      res.status(200).json(invoices);
    })
    .catch((err) => {
      // If the promise is rejected (i.e., the operation fails), we send back a response with a status of 500 (Internal Server Error)
      // and the error that occurred. This might be due to a database issue, a network issue, etc.
      res.status(500).json(err);
    });
 }); 

// POST required info to create an invoice
router.post("/invoice", authenticate, (req, res) => {
  // The 'authenticate' middleware function is called before the main handler.
  // This function checks if the user making the request is authenticated.
 
  // Extract 'value', 'memo', and 'user_id' properties from the body of the incoming request.
  const { value, memo, user_id } = req.body;
  // Call the 'createInvoice' function, passing the extracted properties as an object.
  // This function creates a new invoice record in the database.
  createInvoice({ value, memo, user_id })
    .then((invoice) => {
      // If the promise resolves (i.e., the operation was successful), we send back a response with a status of 200 (OK)
      // and the invoice object retrieved from the database.
      res.status(200).json(invoice);
    })
    .catch((err) => {
      // If the promise is rejected (i.e., the operation fails), we send back a response with a status of 500 (Internal Server Error)
      // and the error that occurred. This could be due to a database issue, a network issue, etc.
      res.status(500).json(err);
    });
 }); 
   
// POST an invoice to pay
router.post("/pay", authenticateAdmin, async (req, res) => {
    const { payment_request } = req.body;
   
    const pay = await payInvoice({ payment_request });
   
    if (pay.payment_error) {
      res.status(500).json(pay.payment_error);
    }
   
    if (pay?.payment_route) {
      // Save to DB
   
      res.status(200).json(pay);
    }
   });   
   
   // export our router so we can initiate it in index.js
   module.exports = router;