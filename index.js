const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")

require("dotenv").config()

app.use(cors())
app.use(express.json())

app.post("/send", async (req, res) => {
  // main().catch(console.error)

  const data = req.body.emailData
  const { apartman, jmeno, prijmeni, pocet, email, tel, pDatum, oDatum } = data

  const main = async () => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.LOGIN_G,
        pass: process.env.APP_PASS,
      },
    })
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "dobra.nadeje@seznam.cz",
      subject: "Hello ✔",
      text: "Poptávka",
      html: `<b>Aparman - ${apartman}</b><br> 
      <b>Jmeno - ${jmeno}</b><br> 
      <b>Příjmení - ${prijmeni}</b><br> 
      <b>Pocet - ${pocet}</b><br> 
      <b>Email ${email}</b><br>
      <b>Tel - ${tel}</b><br>
      <b>Od - ${pDatum}</b><br>
      <b>Do ${oDatum}</b><br>`,
    })

    console.log("Message sent: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
  }
  try {
    await main()
    res.json("done")
  } catch (e) {
  } finally {
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
