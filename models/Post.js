const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: `Users`,
                key: `id`
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue("created_at").toLocaleDateString();
            }
        }
    },
    {
        sequelize
    }
)

module.exports = Post;