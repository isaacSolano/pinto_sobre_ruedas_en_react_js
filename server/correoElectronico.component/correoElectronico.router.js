let express = require('express'),
    nodemailer = require('nodemailer'),
    router = express.Router();

const correoElectronico = (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pinto.sobre.ruedas@gmail.com',
            pass: 'React012',
        }
    });

    let mailOptions = {
        from : 'pinto.sobre.ruedas@gmail.com',
        to: req.body.dest,
        subject: req.body.asunto,
        text: `Su contrasena temporal es ${req.body.inf}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            res.json(false)
            res.json(err)
        }else{
            res.json(true)
        }
    });

}

router.route('/enviarCorreo')
    .post( (req, res) => {
        correoElectronico(req, res);
    });

module.exports = router;