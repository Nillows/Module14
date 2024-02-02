const sequelize = require(`../config/connection`);
const {User, Post, Comment} = require(`../models`);

const userData = [
    {
        username:`Nillows`,
        password: 'password'
    },
    {
        username:`Scott`,
        password: `password`
    }
]

const postData = [{
    title: "Hello World",
    contents: "What did you expect?",
    user_id: 1
}]

const commentData = [{
    contents: "How original!",
    user_id: 2,
    post_id: 1
}]

const johnnyApple = async()=>{
    await sequelize.sync({force:true});

    const dbUsers = await User.bulkCreate(userData,{
        individualHooks: true
    });
    console.table(dbUsers.map(user=>user.toJSON()));

    const dbPost = await Post.bulkCreate(postData);
    console.table(dbPost.map(post=>post.toJSON()));

    const dbComment = await Comment.bulkCreate(commentData);
    console.table(dbComment.map(comment=>comment.toJSON()));

    await dbUsers[0].addPost(1);

    await dbUsers[1].addComment(1);

    process.exit(0);
}

johnnyApple();