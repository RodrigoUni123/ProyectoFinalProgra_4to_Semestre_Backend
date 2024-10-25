const db = require('../config/db.config.js');
const ProdServicios = db.Prod_Servicios;

exports.create = async (req, res) => {
    let prodServicio = {};

    try {
        prodServicio.nombre_prodServicio = req.body.nombre_prodServicio;
        prodServicio.descripcion_prodServicio = req.body.descripcion_prodServicio;
        prodServicio.categoria = req.body.categoria;
        prodServicio.modelo = req.body.modelo;
        prodServicio.proveedor = req.body.proveedor;
        prodServicio.precio = req.body.precio;
        prodServicio.descuento = req.body.descuento;
        prodServicio.cant_disponible = req.body.cant_disponible;
        prodServicio.estado_prodServicio = req.body.estado_prodServicio;
        prodServicio.copyrightby = req.body.copyrightby;

        const result = await ProdServicios.create(prodServicio);
        res.status(201).json({
            message: "Producto-Servicio creado con éxito con id = " + result.id_prodServ,
            prodServicio: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto-servicio",
            error: error.message
        });
    }
};

exports.retrieveAllProdServicios = async (req, res) => {
    try {
        const prodServicios = await ProdServicios.findAll();
        res.status(200).json({
            message: "Productos-Servicios obtenidos con éxito",
            prodServicios: prodServicios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener los productos-servicios",
            error: error.message
        });
    }
};

exports.getProdServicioById = async (req, res) => {
    let prodServicioId = req.params.id;
    try {
        const prodServicio = await ProdServicios.findByPk(prodServicioId);
        if (!prodServicio) {
            return res.status(404).json({
                message: "No se encontró el producto-servicio con id = " + prodServicioId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Producto-Servicio obtenido con éxito con id = " + prodServicioId,
            prodServicio: prodServicio
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el producto-servicio",
            error: error.message
        });
    }
};

exports.updateById = async (req, res) => {
    try {
        let prodServicioId = req.params.id;
        let prodServicio = await ProdServicios.findByPk(prodServicioId);

        if (!prodServicio) {
            return res.status(404).json({
                message: "No se encontró el producto-servicio con id = " + prodServicioId,
                error: "404"
            });
        }

        let updatedObject = {
            nombre_prodServicio: req.body.nombre_prodServicio || prodServicio.nombre_prodServicio,
            descripcion_prodServicio: req.body.descripcion_prodServicio || prodServicio.descripcion_prodServicio,
            categoria: req.body.categoria || prodServicio.categoria,
            modelo: req.body.modelo || prodServicio.modelo,
            proveedor: req.body.proveedor || prodServicio.proveedor,
            precio: req.body.precio || prodServicio.precio,
            descuento: req.body.descuento || prodServicio.descuento,
            cant_disponible: req.body.cant_disponible || prodServicio.cant_disponible,
            estado_prodServicio: req.body.estado_prodServicio || prodServicio.estado_prodServicio,
            copyrightby: req.body.copyrightby || prodServicio.copyrightby
        };

        await ProdServicios.update(updatedObject, { where: { id_prodServ: prodServicioId } });
        res.status(200).json({
            message: "Producto-Servicio actualizado con éxito con id = " + prodServicioId,
            prodServicio: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto-servicio con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let prodServicioId = req.params.id;
        let prodServicio = await ProdServicios.findByPk(prodServicioId);

        if (!prodServicio) {
            return res.status(404).json({
                message: "No existe un producto-servicio con id = " + prodServicioId,
                error: "404",
            });
        }
        await prodServicio.destroy();
        res.status(200).json({
            message: "Producto-Servicio eliminado con éxito con id = " + prodServicioId,
            prodServicio: prodServicio,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el producto-servicio con id = " + req.params.id,
            error: error.message,
        });
    }
};