var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    //let nombre = req.query.nombre;
    req.db.query("SELECT * FROM finca", (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.get("/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("SELECT * FROM finca WHERE idfinca = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Error en consulta" });
        } else {
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.status(404).send({ msg: "Finca no encontrada" });
            }
        }
    });
});

router.get("/usr/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("SELECT * FROM finca WHERE idusr = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Error en consulta" });
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                res.status(404).send({ msg: "Finca no encontrada" });
            }
        }
    });
});

router.post("/", (req, res, next) => {
    let body = req.body;
    req.db.query("INSERT INTO finca SET ?", body, (err, result) => {
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
    req.db.query("UPDATE finca SET ? WHERE idfinca = ?", [body, id], (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

router.delete("/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("DELETE FROM finca WHERE idfinca = ?", [id], (err, result)=>{
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

module.exports = router;