const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require(`body-parser`)
const nodeMailer = require(`nodemailer`)
const cors = require('cors')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//setting the view engine
app.set('view engine', 'ejs')

//using public folder
app.use(express.static('public'))

//setting up the nodeMailer
//step1 create a Transport
const receiver_Email = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.Email_Address,
        pass: process.env.Pass_Token
    }
})

//step2 verifing the email and pass
receiver_Email.verify((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Email verified successfully!')
    }
})

//step3 creating the post route
app.post('/sendContactMail', (req, res) => {

    const name = req.body.firstName+" "+ req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;


    const mail = {
        from: `sadwelkar.7harshraj13@gmail.com`,
        to: `sadwelkar.7harshraj13@gmail.com`,
        subject: "NodeMailer-Portfolio",

        html: `<h1>Hello, Boss</h1>
                <h4>NodeMailer at your service!</h4>
                <h4>I have recieved a new response from our nodemailer service api</h4>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Message: ${message}</p>
                <h4>Enjoy your day Sir, it's my pleasure working for you.</h4>
                <h6>Have a fantastic day</h6>`
    };

    receiver_Email.sendMail(mail, (err) => {
        if (err) {
            res.json(err)
        } else {
            res.json({ code: 200, status: "Message Sent" });
        }
    })
    //console.log(name,msg,phone)
    //res.redirect('/')
})
app.get('/', (req, res) => {
    res.render('Home')
})
const header = "\nHappy Hacking"
app.listen(port, () => {
    console.log(`server live ${header}`)
})