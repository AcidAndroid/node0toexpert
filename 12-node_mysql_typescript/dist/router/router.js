"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, resp) => {
    const id = req.params.id;
    const qry = 'select * from heroes';
    mysql_1.default.ejecutarQuery(qry, (err, heroes) => {
        if (err) {
            return resp.json({
                ok: false,
                error: err
            });
        }
        return resp.json({
            ok: true,
            heroes
        });
    });
});
router.get('/heroes/:id', (req, resp) => {
    const id = req.params.id;
    const qry = 'select * from heroes where idheroes=' + mysql_1.default.instance.cnn.escape(id);
    mysql_1.default.ejecutarQuery(qry, (err, heroes) => {
        if (err) {
            return resp.json({
                ok: false,
                error: err
            });
        }
        return resp.json({
            ok: true,
            heroes
        });
    });
});
exports.default = router;
