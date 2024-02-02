const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        contents: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: `Users`,
                key: `id`
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: `Posts`,
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

module.exports = Comment;