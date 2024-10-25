const db = require('../config/db.config.js');
const TipoProdServ = db.tipoProdServicio;

exports.create = (req, res) => {
    let tipoProdServ = {};

    try {
        tipoProdServ.productos = req.body.productos;
        tipoProdServ.servicios = req.body.servicios;

        TipoProdServ.create(tipoProdServ).then(result => {
            res.status(200).json({
                message: "Tipo de producto-servicio creado con éxito con id = " + result.id_tipoProdServ,
                tipoProdServ: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el tipo de producto-servicio",
            error: error.message
        });
    }
}

exports.retrieveAllTiposProdServ = async (req, res) => {
    try {
        const tiposProdServ = await TipoProdServ.findAll();
        res.status(200).json({
            message: "Tipos de producto-servicio obtenidos con éxito",
            tiposProdServ: tiposProdServ
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener los tipos de producto-servicio",
            error: error.message
        });
    }
}

exports.getTipoProdServById = async (req, res) => {
    let tipoProdServId = req.params.id;
    try {
        const tipoProdServ = await TipoProdServ.findByPk(tipoProdServId);
        if (!tipoProdServ) {
            return res.status(404).json({
                message: "No se encontró el tipo de producto-servicio con id = " + tipoProdServId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Tipo de producto-servicio obtenido con éxito con id = " + tipoProdServId,
            tipoProdServ: tipoProdServ
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el tipo de producto-servicio",
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let tipoProdServId = req.params.id;
        let tipoProdServ = await TipoProdServ.findByPk(tipoProdServId);

        if (!tipoProdServ) {
            return res.status(404).json({
                message: "No se encontró el tipo de producto-servicio con id = " + tipoProdServId,
                error: "404"
            });
        }

        let updatedObject = {
            productos: req.body.productos,
            servicios: req.body.servicios
        };
        
        let result = await TipoProdServ.update(updatedObject, { returning: true, where: { id_tipoProdServ: tipoProdServId } });

        if (!result) {
            return res.status(500).json({
                message: "Error al actualizar el tipo de producto-servicio con id = " + tipoProdServId,
                error: "No se pudo actualizar",
            });
        }

        res.status(200).json({
            message: "Tipo de producto-servicio actualizado con éxito con id = " + tipoProdServId,
            tipoProdServ: updatedObject,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el tipo de producto-servicio con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let tipoProdServId = req.params.id;
        let tipoProdServ = await TipoProdServ.findByPk(tipoProdServId);

        if (!tipoProdServ) {
            return res.status(404).json({
                message: "No existe un tipo de producto-servicio con id = " + tipoProdServId,
                error: "404",
            });
        }

        await tipoProdServ.destroy();
        res.status(200).json({
            message: "Tipo de producto-servicio eliminado con éxito con id = " + tipoProdServId,
            tipoProdServ: tipoProdServ,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el tipo de producto-servicio con id = " + req.params.id,
            error: error.message,
        });
    }
}