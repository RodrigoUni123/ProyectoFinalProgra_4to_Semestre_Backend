module.exports = (sequelize, Sequelize) => {
    const Prod_Servicios = sequelize.define('prod_servicio', {	
        id_prodServ: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nombre_prodServicio: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },

        descripcion_prodServicio: {
            type: Sequelize.STRING, 
            allowNull: true,       
        },

        categoria: {
            type: Sequelize.STRING,
            allowNull: false, 
        },

        modelo: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        proveedor: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },

        precio: {
            type: Sequelize.STRING,
            allowNull: false 
        },

        descuento: {
            type: Sequelize.STRING,  
            allowNull: true 
        },

        cant_disponible: {
            type: Sequelize.INTEGER,
            allowNull: false, 

        },

        estado_prodServicio: {
            type: Sequelize.STRING,
            allowNull: false
        },

        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'UMG Antigua'
        }
    });

    return Prod_Servicios;
};