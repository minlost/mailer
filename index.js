const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
require("dotenv").config()

app.use(cors())

app.get("/send", (req, res) => {
  main()
})

async function main() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.LOGIN_G,
      pass: process.env.APP_PASS,
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "vaclav.wolf.vlcek@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  })

  console.log("Message sent: %s", info.messageId)
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}
main().catch(console.error)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
