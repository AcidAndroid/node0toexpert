/**
 * Middelware para erificacion del token
 * 
 */
/**
 * Json Web Token
 */
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('token')


    jwt.verify(token, process.env.SEED_TOKEN, (err, docoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        console.log('Resutlado de decoded', docoded);
        req.usuario = docoded.usuario
        next()

    })

    // res.json({
    //     token
    // })

}

module.exports = { verificaToken }