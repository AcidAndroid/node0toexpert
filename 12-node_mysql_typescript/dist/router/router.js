"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/heroes', (req, resp) => {
    resp.json({
        ok: true,
        mensaje: "Hola Mundo"
    });
});
router.get('/heroes/:id', (req, resp) => {
    const id = req.params.id;
    resp.json({
        ok: true,
        mensaje: `Id enviado: ${id}`,
        id
    });
});
exports.default = router;
