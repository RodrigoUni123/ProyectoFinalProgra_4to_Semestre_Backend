module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("facturas", {
        id_factura: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        nombre: {
            type: Sequelize.STRING(80),
        	validate: {
          	is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
			}
	    },
        nit: {
            type: Sequelize.STRING,
			allowNull: false,

	},
        direccion: {
            type: Sequelize.STRING(100),
            allowNull: true 
        },
        telefono: {
            type: Sequelize.INTEGER,

        },
        total: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });
    return Factura;
};