const config = require('../config/config.js');
const db = require('../config/db.config.js');
const Usuario = db.usuario;



exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.nombres_apellidos = req.body.nombres_apellidos;
        usuario.area = req.body.area;
        usuario.password = req.body.password;

        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado con éxito con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
}

exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarios => {
            res.status(200).json({
                message: "Usuarios obtenidos con éxito",
                usuarios: usuarios
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los usuarios",
                error: error
            });
        });
}

exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            res.status(200).json({
                message: "Usuario obtenido con éxito con id = " + usuarioId,
                usuario: usuario
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el usuario",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombres_apellidos: req.body.nombres_apellidos,
                area: req.body.area,
                password: req.body.password
            }
            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el usuario con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Usuario actualizado con éxito con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe un usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con éxito con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
}

exports.login = async (req, res) => {
    const { nombres_apellidos, password } = req.body;

    // aqui va a ver si es keneth 
    if (nombres_apellidos === config.adminUser.nombres_apellidos && password === config.adminUser.password) {
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            usuario: config.adminUser,
            role: "Administrador"
        });
    }

    // luego aqui va a verificar el usuario en la base de datos
    const usuario = await Usuario.findOne({ where: { nombres_apellidos, password } });
    if (!usuario) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.status(200).json({
        message: "Inicio de sesión exitoso",
        usuario: usuario,
        role: usuario.area
    });
};