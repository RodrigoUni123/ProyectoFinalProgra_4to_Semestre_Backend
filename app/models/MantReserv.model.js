module.exports = (sequelize, Sequelize) => {
  const Reservas = sequelize.define('reserva', {	
      id_reserva: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },

      nombres_reserva: {
          type: Sequelize.STRING(80),
          allowNull: false,
          validate: {
              is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/  // valida solo letras con acentos, la ñ, y espacios
          }
      },

      apellidos_reserva: {
          type: Sequelize.STRING(80),
          allowNull: false, 
          validate: {
              is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
          }
      },

      sexo: {
          type: Sequelize.STRING,
          allowNull: false
      },

      correo_electronico: {
          type: Sequelize.STRING(150),
          allowNull: false,
      },

      telefono: {
          type: Sequelize.INTEGER,

      },

      dpi: {
        type: Sequelize.STRING,
        allowNull: false,

    },

      tipo_habitacion: {
        type: Sequelize.STRING,
    },

      num_viajeros: {
          type: Sequelize.INTEGER,

      },

      fecha_entrada: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },

      fecha_salida: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },

      tipo_pago: {
          type: Sequelize.STRING,

      },

      copyrightby: {
          type: Sequelize.STRING,
          defaultValue: 'UMG Antigua'
      }
  });

  return Reservas;
}