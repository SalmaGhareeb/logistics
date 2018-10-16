const shipment = require('../model/shipment');
const express = require('express');

var router = express.Router();

router.get("/shipments", shipment.getShipments);
router.get("/shipments/seed", shipment.seeder);
router.put("/shipment/:id/update", shipment.updateShipmentStatus);


module.exports = router;