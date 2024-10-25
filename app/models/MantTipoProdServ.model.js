module.exports = (sequelize, Sequelize) => {
    const TipoProdServ = sequelize.define("tipoProdServicio", {
        id_tipoProdServ: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productos: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        servicios: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return TipoProdServ;
};