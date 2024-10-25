const db = require('../config/db.config.js');
const Cliente = db.Clientes;

exports.create = async (req, res) => {
    let cliente = {};

    try {
        cliente.nombres_cliente = req.body.nombres_cliente;
        cliente.apellidos_cliente = req.body.apellidos_cliente;
        cliente.edad_cliente = req.body.edad_cliente;
        cliente.dpi = req.body.dpi;
        cliente.fecha_nacimiento = req.body.fecha_nacimiento;
        cliente.sexo = req.body.sexo;
        cliente.correo_electronico = req.body.correo_electronico;
        cliente.telefono = req.body.telefono;
        cliente.direccion = req.body.direccion;

        const result = await Cliente.create(cliente);
        res.status(201).json({
            message: "Cliente creado con éxito con id = " + result.id_cliente,
            cliente: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el cliente",
            error: error.message
        });
    }
}

exports.retrieveAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json({
            message: "Clientes obtenidos con éxito",
            clientes: clientes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener los clientes",
            error: error.message
        });
    }
}

exports.getClienteById = async (req, res) => {
    let clienteId = req.params.id;
    try {
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({
                message: "No se encontró el cliente con id = " + clienteId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Cliente obtenido con éxito con id = " + clienteId,
            cliente: cliente
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el cliente",
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                message: "No se encontró el cliente con id = " + clienteId,
                error: "404"
            });
        }

        let updatedObject = {
            nombres_cliente: req.body.nombres_cliente || cliente.nombres_cliente,
            apellidos_cliente: req.body.apellidos_cliente || cliente.apellidos_cliente,
            edad_cliente: req.body.edad_cliente || cliente.edad_cliente,
            dpi: req.body.dpi || cliente.dpi,
            fecha_nacimiento: req.body.fecha_nacimiento || cliente.fecha_nacimiento,
            sexo: req.body.sexo || cliente.sexo,
            correo_electronico: req.body.correo_electronico || cliente.correo_electronico,
            telefono: req.body.telefono || cliente.telefono,
            direccion: req.body.direccion || cliente.direccion
        };

        await Cliente.update(updatedObject, { where: { id_cliente: clienteId } });
        res.status(200).json({
            message: "Cliente actualizado con éxito con id = " + clienteId,
            cliente: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el cliente con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                message: "No existe un cliente con id = " + clienteId,
                error: "404",
            });
        }
        await cliente.destroy();
        res.status(200).json({
            message: "Cliente eliminado con éxito con id = " + clienteId,
            cliente: cliente,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente con id = " + req.params.id,
            error: error.message,
        });
    }
}