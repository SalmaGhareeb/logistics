
const express = require('express');
const shipment = require('../model/shipment');


var router = express.Router();

router.get("/shipments", shipment.getShipments);
router.get("/shipments/seed", shipment.seeder);
router.put("/shipment/:id/update", shipment.updateShipmentStatus);


module.exports = router;