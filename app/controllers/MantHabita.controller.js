const db = require('../config/db.config.js');
const Habitaciones = db.Habitaciones;

exports.create = async (req, res) => {
    let habitacion = {};

    try {
        habitacion.disponibilidad = req.body.disponibilidad;
        habitacion.numero_camas = req.body.numero_camas;
        habitacion.precio_noche = req.body.precio_noche;
        habitacion.descuento = req.body.descuento;
        habitacion.piso_delaHabitacion = req.body.piso_delaHabitacion;
        habitacion.copyrightby = req.body.copyrightby;

        const result = await Habitaciones.create(habitacion);
        res.status(201).json({
            message: "Habitación creada con éxito con id = " + result.id_habitacion,
            habitacion: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la habitación",
            error: error.message
        });
    }
};

exports.retrieveAllHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitaciones.findAll();
        res.status(200).json({
            message: "Habitaciones obtenidas con éxito",
            habitaciones: habitaciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener las habitaciones",
            error: error.message
        });
    }
};

exports.getHabitacionById = async (req, res) => {
    let habitacionId = req.params.id;
    try {
        const habitacion = await Habitaciones.findByPk(habitacionId);
        if (!habitacion) {
            return res.status(404).json({
                message: "No se encontró la habitación con id = " + habitacionId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Habitación obtenida con éxito con id = " + habitacionId,
            habitacion: habitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener la habitación",
            error: error.message
        });
    }
};

exports.updateById = async (req, res) => {
    try {
        let habitacionId = req.params.id;
        let habitacion = await Habitaciones.findByPk(habitacionId);

        if (!habitacion) {
            return res.status(404).json({
                message: "No se encontró la habitación con id = " + habitacionId,
                error: "404"
            });
        }

        let updatedObject = {
            disponibilidad: req.body.disponibilidad || habitacion.disponibilidad,
            numero_camas: req.body.numero_camas || habitacion.numero_camas,
            precio_noche: req.body.precio_noche || habitacion.precio_noche,
            descuento: req.body.descuento || habitacion.descuento,
            piso_delaHabitacion: req.body.piso_delaHabitacion || habitacion.piso_delaHabitacion,
            copyrightby: req.body.copyrightby || habitacion.copyrightby
        };

        await Habitaciones.update(updatedObject, { where: { id_habitacion: habitacionId } });
        res.status(200).json({
            message: "Habitación actualizada con éxito con id = " + habitacionId,
            habitacion: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la habitación con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let habitacionId = req.params.id;
        let habitacion = await Habitaciones.findByPk(habitacionId);

        if (!habitacion) {
            return res.status(404).json({
                message: "No existe una habitación con id = " + habitacionId,
                error: "404",
            });
        }
        await habitacion.destroy();
        res.status(200).json({
            message: "Habitación eliminada con éxito con id = " + habitacionId,
            habitacion: habitacion,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la habitación con id = " + req.params.id,
            error: error.message,
        });
    }
};