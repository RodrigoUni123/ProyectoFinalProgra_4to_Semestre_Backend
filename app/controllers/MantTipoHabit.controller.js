const db = require('../config/db.config.js');
const TipoHabitacion = db.Tipo_Habitaciones;

exports.create = (req, res) => {
    let tipoHabitacion = {};

    try {
        tipoHabitacion.tipo_habitacion = req.body.tipo_habitacion;
        tipoHabitacion.descripcion = req.body.descripcion;

        TipoHabitacion.create(tipoHabitacion).then(result => {
            res.status(200).json({
                message: "Tipo de habitación creado con éxito con id = " + result.id_tipoHabitacion,
                tipoHabitacion: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el tipo de habitación",
            error: error.message
        });
    }
}

exports.retrieveAllTiposHabitacion = async (req, res) => {
    try {
        const tiposHabitacion = await TipoHabitacion.findAll();
        res.status(200).json({
            message: "Tipos de habitación obtenidos con éxito",
            tiposHabitacion: tiposHabitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener los tipos de habitación",
            error: error.message
        });
    }
}

exports.getTipoHabitacionById = async (req, res) => {
    let tipoHabitacionId = req.params.id;
    try {
        const tipoHabitacion = await TipoHabitacion.findByPk(tipoHabitacionId);
        if (!tipoHabitacion) {
            return res.status(404).json({
                message: "No se encontró el tipo de habitación con id = " + tipoHabitacionId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Tipo de habitación obtenido con éxito con id = " + tipoHabitacionId,
            tipoHabitacion: tipoHabitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el tipo de habitación",
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let tipoHabitacionId = req.params.id;
        let tipoHabitacion = await TipoHabitacion.findByPk(tipoHabitacionId);

        if (!tipoHabitacion) {
            return res.status(404).json({
                message: "No se encontró el tipo de habitación con id = " + tipoHabitacionId,
                error: "404"
            });
        }

        let updatedObject = {
            tipo_habitacion: req.body.tipo_habitacion,
            descripcion: req.body.descripcion
        };
        
        let result = await TipoHabitacion.update(updatedObject, { returning: true, where: { id_tipoHabitacion: tipoHabitacionId } });

        if (!result) {
            return res.status(500).json({
                message: "Error al actualizar el tipo de habitación con id = " + tipoHabitacionId,
                error: "No se pudo actualizar",
            });
        }

        res.status(200).json({
            message: "Tipo de habitación actualizado con éxito con id = " + tipoHabitacionId,
            tipoHabitacion: updatedObject,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el tipo de habitación con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let tipoHabitacionId = req.params.id;
        let tipoHabitacion = await TipoHabitacion.findByPk(tipoHabitacionId);

        if (!tipoHabitacion) {
            return res.status(404).json({
                message: "No existe un tipo de habitación con id = " + tipoHabitacionId,
                error: "404",
            });
        }

        await tipoHabitacion.destroy();
        res.status(200).json({
            message: "Tipo de habitación eliminado con éxito con id = " + tipoHabitacionId,
            tipoHabitacion: tipoHabitacion,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el tipo de habitación con id = " + req.params.id,
            error: error.message,
        });
    }
}