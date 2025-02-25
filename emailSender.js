// //GMAIL 
// // refresh token: 1//04D0nbs8JzoMJCgYIARAAGAQSNwF-L9IrHyIiK4XbcewqsFiHJptpTSMPi-St1xKymb1aeNefBYrMm-aFaZ93xy8CZL40ckVSiXI
// //ID client: 210539226424-gelr874t0394ae6e5jkogj3dppk5ng17.apps.googleusercontent.com
// //secret client: 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

const express = require("express");
const cors = require("cors")

const emailHelper = require("./helpers/emailHelper");
const airtableHelper = require("./helpers/airtableHelper");
const addGiver = airtableHelper.addGiver;
const getGivers = airtableHelper.getGivers;

const expressApp = express();

expressApp.use(cors({ 
  origin: "*" 
}));

//Middleware
expressApp.use(express.json());

//Routes
expressApp.post("/send-email", async (req, res) => {
  const { to, subject, text} = req.body;

  try{
    let info = await emailHelper(to, subject, text);
    res.status(200).send(`Email sent: ${info.response}`);
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

//Start the server
const port = process.env.PORT || 4000;

expressApp.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

expressApp.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});

//air Table
expressApp.post("/new-airtable-record", async (req, res)=>{
  var gName = req.body.gName;
  var gMail = req.body.gMail;
  var gAmount = req.body.gAmount;
  var gCode = req.body.gCode;
  var gWish = req.body.gWish;
 
  try{
    let recordId = await addGiver (gName, gMail, gAmount, gCode, gWish);
    res.status(200).send(`Giver added correctly, it ID:${recordId}`);
  } catch (error) {
    const statusCode = error.status || 500;
    const errorMessage = error.message || "An unexpected error occurred";
    res.status(statusCode).send(errorMessage)
  }
})

//get list
expressApp.get("/get-airtable-records", async (req, res) => {
  try {
    const givers = await getGivers();
    res.json({givers})
  } catch (error) {
    const statusCode = error.status || 500;
    const errorMessage = error.message || "An unexpected error occurred";
    res.status(statusCode).send(errorMessage)
  }
});

//mercado pago

// const mercadoPago = require("mercadopago");

// mercadoPago.configure({
//   access_token: "APP_USR-433692830981120-010210-a50847a4885782c08915089140b44535-238002637"
// });

// async function generarLinkPago() {
//   const preference = await mercadoPago.preferences.create({
//     items: [
//       {
//         title: "Pago libre",
//         quantity: 1,
//         unit_price: 0, // El usuario define el monto
//         currency_id: "ARS",
//       },
//     ],
//     back_urls: {
//       success: "https://https://marto-golden-goose.netlify.app/success",
//       failure: "https://https://marto-golden-goose.netlify.app/failure",
//     },
//     auto_return: "approved"
//   });
//   return preference.body.init_point;
// }

//genera el link y lo muestra en la consola
//generarLinkPago().then((url) => console.log("Paga aquí:", url));

//////
//expressApp.post("/mpwebhook", async (req, res) => {
//  const payment = req.body
//  console.log("llega info de mercado pago")
//})