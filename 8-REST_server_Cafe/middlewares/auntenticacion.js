/**
 * Middelware para Verificaciones 
 * 
 */
/**
 * Json Web Token
 */
const jwt = require('../node_modules/jsonwebtoken');



/**
 * Verificacion  del token
 */
let verificaToken = (req, res, next) => {

    let token = req.get('token');


    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido',
                    err
                }
            });
        }

        req.usuario = decoded.usuario;
        // console.log('Variable usuario en req:', decoded);
        next();

    });



};


/**
 * Verificacion  del token para imagen
 */
let verificaTokenImg = (req, res, next) => {
        let token = req.query.token

        jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'Token no válido',
                        err
                    }
                });
            }

            req.usuario = decoded.usuario;
            // console.log('Variable usuario en req:', decoded);
            next();

        });


    }
    /**
     * Verificacion del rol adecuado para operaciones(ADMIN_ROLE)
     */
let verificaRole = (req, res, next) => {

    let role = req.usuario

    if (role.role == "ADMIN_ROLE") {
        next()
        return
    }

    return res.json({
            ok: false,
            err: {
                message: "El usuario es no administador; es:" + role.role
            }
        })
        // next()
}


module.exports = { verificaToken, verificaRole, verificaTokenImg }