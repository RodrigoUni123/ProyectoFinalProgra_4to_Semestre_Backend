module.exports = (sequelize, Sequelize) => {
    const Empleados = sequelize.define('empleado', {	
        id_empleado: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nombres_empleado: {
            type: Sequelize.STRING(80),
            allowNull: false,
            validate: {
                is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/  
            },
        },

        apellidos_empleado: {
            type: Sequelize.STRING(80),
            allowNull: false,
            validate: {
                is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
            }
        },

        puesto_laboral: {
            type: Sequelize.STRING(60),
            allowNull: false,
        },

        experiencia_Laboral: {
            type: Sequelize.STRING,
            allowNull: true
        },

        edad_empleado: {
            type: Sequelize.INTEGER,
        },

        dpi: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        fecha_contratacionEmpleado: {
            type: Sequelize.DATEONLY,
            allowNull: false 
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

        direccion: {
            type: Sequelize.STRING(100),
            allowNull: true  
        },

        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'UMG Antigua'
        }
    });

    return Empleados;
}