import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Aksi = db.define('Aksi',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  aksi_id: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hashtag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teks: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  freezeTableName: true,
}

);
   
export default Aksi;

(async () => {
    await db.sync();
  })();