const express = require('express');
const validate = require('../../middlewares/validate');
const { branchController } = require('../../controllers/superAdmin')

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.resdb);
    res.status(200).send(req.resdb)
});

module.exports = router;