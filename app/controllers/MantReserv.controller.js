const db = require('../config/db.config.js');
const Reservas = db.Reservas;

exports.create = async (req, res) => {
    let reserva = {};

    try {
        reserva.nombres_reserva = req.body.nombres_reserva;
        reserva.apellidos_reserva = req.body.apellidos_reserva;
        reserva.sexo = req.body.sexo;
        reserva.correo_electronico = req.body.correo_electronico;
        reserva.telefono = req.body.telefono;
        reserva.dpi = req.body.dpi;
        reserva.tipo_habitacion = req.body.tipo_habitacion;
        reserva.num_viajeros = req.body.num_viajeros;
        reserva.fecha_entrada = req.body.fecha_entrada;
        reserva.fecha_salida = req.body.fecha_salida;
        reserva.tipo_pago = req.body.tipo_pago;
        reserva.copyrightby = req.body.copyrightby;

        const result = await Reservas.create(reserva);
        res.status(201).json({
            message: "Reserva creada con éxito con id = " + result.id_reserva,
            reserva: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la reserva",
            error: error.message
        });
    }
};

exports.retrieveAllReservas = async (req, res) => {
    try {
        const reservas = await Reservas.findAll();
        res.status(200).json({
            message: "Reservas obtenidas con éxito",
            reservas: reservas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener las reservas",
            error: error.message
        });
    }
};

exports.getReservaById = async (req, res) => {
    let reservaId = req.params.id;
    try {
        const reserva = await Reservas.findByPk(reservaId);
        if (!reserva) {
            return res.status(404).json({
                message: "No se encontró la reserva con id = " + reservaId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Reserva obtenida con éxito con id = " + reservaId,
            reserva: reserva
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener la reserva",
            error: error.message
        });
    }
};

exports.updateById = async (req, res) => {
    try {
        let reservaId = req.params.id;
        let reserva = await Reservas.findByPk(reservaId);

        if (!reserva) {
            return res.status(404).json({
                message: "No se encontró la reserva con id = " + reservaId,
                error: "404"
            });
        }

        let updatedObject = {
            nombres_reserva: req.body.nombres_reserva || reserva.nombres_reserva,
            apellidos_reserva: req.body.apellidos_reserva || reserva.apellidos_reserva,
            sexo: req.body.sexo || reserva.sexo,
            correo_electronico: req.body.correo_electronico || reserva.correo_electronico,
            telefono: req.body.telefono || reserva.telefono,
            dpi: req.body.dpi || reserva.dpi,
            tipo_habitacion: req.body.tipo_habitacion || reserva.tipo_habitacion,
            num_viajeros: req.body.num_viajeros || reserva.num_viajeros,
            fecha_entrada: req.body.fecha_entrada || reserva.fecha_entrada,
            fecha_salida: req.body.fecha_salida || reserva.fecha_salida,
            tipo_pago: req.body.tipo_pago || reserva.tipo_pago,
            copyrightby: req.body.copyrightby || reserva.copyrightby
        };

        await Reservas.update(updatedObject, { where: { id_reserva: reservaId } });
        res.status(200).json({
            message: "Reserva actualizada con éxito con id = " + reservaId,
            reserva: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la reserva con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let reservaId = req.params.id;
        let reserva = await Reservas.findByPk(reservaId);

        if (!reserva) {
            return res.status(404).json({
                message: "No existe una reserva con id = " + reservaId,
                error: "404",
            });
        }
        await reserva.destroy();
        res.status(200).json({
            message: "Reserva eliminada con éxito con id = " + reservaId,
            reserva: reserva,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la reserva con id = " + req.params.id,
            error: error.message,
        });
    }
};