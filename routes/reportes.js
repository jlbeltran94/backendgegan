var express = require('express');
var router = express.Router();



router.get("/", (req, res, next) => {
    //let nombre = req.query.nombre;
    req.db.query("SELECT * FROM reporte", (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.get("/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("SELECT * FROM reporte WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Error en consulta" });
        } else {
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.status(404).send({ msg: "reporte no encontrado" });
            }
        }
    });
});



router.get("/idfinca/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("SELECT * FROM reporte WHERE id_finca = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Error en consulta" });
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                res.status(404).send({ msg: "Reporte no encontrado" });
            }
        }
    });
});

router.get("/idfinca/:id/tipo/:tipo", (req, res, next) => {
    let id = req.params.id;
    let tipo = req.params.tipo
    req.db.query("SELECT * FROM reporte WHERE id_finca = ? AND tipo = ?", [id, tipo], (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Error en consulta" });
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                res.status(404).send({ msg: "Reporte no encontrado" });
            }
        }
    });
});

router.post("/", (req, res, next) => {
    let body = req.body;
    req.db.query("INSERT INTO reporte SET ?", body, (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

router.put("/:id", (req, res, next) => {
    let body = req.body;
    let id = req.params.id;
    req.db.query("UPDATE reporte SET ? WHERE id = ?", [body, id], (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

router.delete("/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("DELETE FROM reporte WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

module.exports = router;