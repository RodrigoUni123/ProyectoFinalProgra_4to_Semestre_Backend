module.exports = (sequelize, Sequelize) => {
	const Clientes = sequelize.define('cliente', {	
	  id_cliente: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
		nombres_cliente: {
        	type: Sequelize.STRING(80),
        	validate: {
          	is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        },
      },
		apellidos_cliente: {
			type: Sequelize.STRING(80),
        	validate: {
          	is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
			}
	},
		edad_cliente: {
			type: Sequelize.INTEGER,

	},
		fecha_nacimiento: {
			type: Sequelize.DATEONLY,

	},
		sexo: {
			type: Sequelize.STRING,

	},

		dpi: {
			type: Sequelize.STRING,
			allowNull: false,
	},

		correo_electronico: {
			type: Sequelize.STRING(150),
      		unique: true,

	},
	telefono: {
		type: Sequelize.INTEGER,

	},
		direccion: {
			type: Sequelize.STRING(100),

	},

    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Clientes;
}
