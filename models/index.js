const User = require(`./User`);
const Post = require(`./Post`);
const Comment = require(`./Comment`);

// Post to User associations
Post.belongsTo(User, {
    onDelete: "CASCADE",
    foreignKey: "user_id"
});
User.hasMany(Post);

// Comment to User associations
Comment.belongsTo(User, {
    onDelete:"CASCADE",
    foreignKey: "user_id"
});
User.hasMany(Comment);

module.exports = {
    User,
    Post,
    Comment
}