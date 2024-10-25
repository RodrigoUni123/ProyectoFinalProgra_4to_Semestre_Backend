const db = require('../config/db.config.js');
const Factura = db.Facturas;

exports.create = async (req, res) => {
    let factura = {};

    try {
        factura.fecha = req.body.fecha;
        factura.nombre = req.body.nombre;
        factura.nit = req.body.nit;
        factura.direccion = req.body.direccion;
        factura.telefono = req.body.telefono;
        factura.total = req.body.total;

        const result = await Factura.create(factura);
        res.status(201).json({
            message: "Factura creada con éxito con id = " + result.id_factura,
            factura: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la factura",
            error: error.message
        });
    }
};

exports.retrieveAllFacturas = async (req, res) => {
    try {
        const facturas = await Factura.findAll();
        res.status(200).json({
            message: "Facturas obtenidas con éxito",
            facturas: facturas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener las facturas",
            error: error.message
        });
    }
};

exports.getFacturaById = async (req, res) => {
    let facturaId = req.params.id;
    try {
        const factura = await Factura.findByPk(facturaId);
        if (!factura) {
            return res.status(404).json({
                message: "No se encontró la factura con id = " + facturaId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Factura obtenida con éxito con id = " + facturaId,
            factura: factura
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener la factura",
            error: error.message
        });
    }
};

exports.updateById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            return res.status(404).json({
                message: "No se encontró la factura con id = " + facturaId,
                error: "404"
            });
        }

        let updatedObject = {
            fecha: req.body.fecha || factura.fecha,
            nombre: req.body.nombre || factura.nombre,
            nit: req.body.nit || factura.nit,
            direccion: req.body.direccion || factura.direccion,
            telefono: req.body.telefono || factura.telefono,
            total: req.body.total || factura.total
        };

        await Factura.update(updatedObject, { where: { id_factura: facturaId } });
        res.status(200).json({
            message: "Factura actualizada con éxito con id = " + facturaId,
            factura: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la factura con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            return res.status(404).json({
                message: "No existe una factura con id = " + facturaId,
                error: "404",
            });
        }
        await factura.destroy();
        res.status(200).json({
            message: "Factura eliminada con éxito con id = " + facturaId,
            factura: factura,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la factura con id = " + req.params.id,
            error: error.message,
        });
    }
};