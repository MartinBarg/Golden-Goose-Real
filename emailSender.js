// //GMAIL 
// // refresh token: 1//04D0nbs8JzoMJCgYIARAAGAQSNwF-L9IrHyIiK4XbcewqsFiHJptpTSMPi-St1xKymb1aeNefBYrMm-aFaZ93xy8CZL40ckVSiXI
// //ID client: 210539226424-gelr874t0394ae6e5jkogj3dppk5ng17.apps.googleusercontent.com
// //secret client: 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

const express = require("express");
const cors = require("cors")

const emailHelper = require("./helpers/emailHelper");

const expressApp = express();

expressApp.use(cors());
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