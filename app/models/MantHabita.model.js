module.exports = (sequelize, Sequelize) => {
    const Habitaciones = sequelize.define('habitacion', {	
        id_habitacion: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        disponibilidad: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        numero_camas: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        precio_noche: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        descuento: {
            type: Sequelize.STRING, 
            allowNull: true
        },

        piso_delaHabitacion: {
            type: Sequelize.INTEGER,

        },

        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'UMG Antigua'
        }
    });

    return Habitaciones;
}