const shipmentService = require('../service/shipmentService');

const connection = require("../config/connection.js");

const db = connection();

/**
 * 
 * @param {Array} data 
 */
const seeder = (req, res) => {
    let query = "SELECT count(*) as shipments FROM shipments";

    db.query(query, (err, result) => {
        if (err) {
            res.status(500);
            res.json({
                'error': 'Something wrong happend!!!'
            });
            return;
        }

        if (result[0].shipments == 0) {
            shipmentService.fetch().then((shipments) => {
                insert(shipments.tasks).then(() => {
                    res.status(200);
                    res.json({
                        'message': 'Shipments added'
                    });
                }, () => {
                    res.status(500);
                    res.json({
                        'error': 'Something wrong happend!!'
                    });

                    return;
                });
            }, (err) => {
                res.status(500);
                res.json({
                    'error': 'Something wrong happend!'
                });
                return;
            });
            return;
        }
        res.status(200);
        res.json({
            'message': 'Shipments already seeded'
        });
    });
};

/**
 * 
 * @param {Array} data 
 */
const insert = (data) => {
    let values = [];
    const query = 'INSERT INTO shipments (courier,delivery_date, started_at, finished_at, description, shipment_status, driver_comment, pickup_location, delivery_location, driver_name) VALUES ?'

    for (var i = 0; i < data.length; i++) {
        values.push([
            data[i].courier,
            new Date(data[i].deliveryDate),
            new Date(data[i].startedAt),
            new Date(data[i].finishedAt),
            data[i].description,
            data[i].status,
            data[i].driverComment,
            data[i].fromLocation,
            data[i].toLocation,
            data[i].driverName
        ]);
    }

    return new Promise((resolve, reject) => {
        db.query(query, [values], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result.affectedRows);
        });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getShipments = (req, res) => {
    let query = "SELECT * FROM shipments";
    db.query(query, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                'error': 'Something wrong happend while getting shipments'
            });
            return;
        }
        res.status(200);
        res.json(rows);

    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
var updateShipmentStatus = (req, res) => {
    let shipmentId = req.params.id;

    let query = "SELECT `shipment_status` FROM shipments where id= ?";

    db.query(query, [shipmentId], (err, result) => {
        if (err) {
            res.status(500);
            res.json({
                'error': 'Something wrong happend while updating'
            });
        } else if (result.length == 0) {
            res.status(400);
            res.json({
                'error': 'Shipment not found!'
            });
        } else if (result[0].shipment_status !== 'pending') {
            res.status(400);
            res.json({
                'error': 'you cannot update ' + result[0].shipment_status + ' shipments'
            });
        }
    });

    updateStatus('done', shipmentId).then(() => {
        res.status(200);

        res.json({
            'error': 'Shipment updated successfully'
        });


    }, (err) => {
        res.status(500);
        res.json({
            'error': err
        });

    });
};

/**
 * 
 * @param {String} status 
 * @param {Integer} id 
 */
const updateStatus = (status, id) => {

    let updateQuery = "UPDATE shipments SET shipment_status= ? WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.query(updateQuery, [status, id], (err, result) => {
            if (err) {
                reject();
            }
            resolve(result);
        });
    });

};

module.exports = {
    seeder,
    updateShipmentStatus,
    getShipments
};