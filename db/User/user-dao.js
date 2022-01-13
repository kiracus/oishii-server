const userModel = require('./user-model');
const { ObjectId } = require('mongodb')

const findAllUsers = () =>
    userModel.find({isDeleted: false, role:{$not: {$regex: "^admin.*"}}},{
        usersFollowers: 0,
        __v: 0,
        bio: 0,
        location: 0,
        password: 0,
        dateOfBirth: 0,
        favRecipeList: 0,
        usersRecipe: 0
    
    }).sort({"$natural": -1});

const findUserById = (userId) =>
    userModel.find({id: userId});

const findByUsernameAndPassword = ({username, password}) =>
    userModel.findOne({username, password});

const findByUsername = ({username}) =>
    userModel.findOne({username});

const createUser = (user) =>
    userModel.create(user);

const updateUser = (user) =>
    userModel.updateOne({id: user.id}, {
        $set: user
    });

const removeFavRecipe = (userId, recipeID) =>
    userModel.updateOne({id: userId},
        { $pull: {favRecipeList: recipeID} });


const addFavRecipe = (id, recipeID) =>
    userModel.updateOne({id: id},
        {$push:
                {favRecipeList: {
                        $each: [recipeID],
                        $position :0}
                }});

const likeUser = (userID, otherUserID) =>
    userModel.updateOne({id: otherUserID},
        {$push:
                {usersFollowers: {
                        $each: [userID],
                        $position :0}
                }});

const unLikeUser = (userID, otherUserID) =>
    userModel.updateOne({id: otherUserID},
        { $pull: {usersFollowers: userID} });





const deleteUser = (userId) =>
    userModel.updateOne({id: userId},{
        $set: {isDeleted: true}
    });



const changeRoleToNormal = (userId) =>
    userModel.updateOne({id: userId},{
        $set: {role: "normal"}
    });


const changeRoleToEditor = (userId) =>
    userModel.updateOne({id: userId},{
        $set: {role: "editor"}
    });
    

const createRecipe = (username, recipeId ) =>
    userModel.updateOne({username: username},
    {$push:
            {usersRecipe: {
                    $each: [recipeId],
                    $position :0}
            }},
    {upsert: true});



const getRecipe = ( username, recipeID)=>
    userModel.find({username: username, usersRecipe: ObjectId(recipeID)});


const getUserInfo = (userID) =>
    userModel.find({id: userID},
        {
            usersFollowers: 0,
            __v: 0,
            bio: 0,
            location: 0,
            password: 0,
            dateOfBirth: 0,
            favRecipeList: 0,
            usersRecipe: 0
    
        });

const deleteRecipe =(username, recipeId) =>
    userModel.updateOne({username : username},
        { $pull: {usersRecipe: recipeId} });







module.exports = {
    findByUsername,
    findAllUsers,
    findUserById,
    findByUsernameAndPassword,
    createUser,
    updateUser,
    deleteUser,
    removeFavRecipe,
    addFavRecipe,
    createRecipe,
    getRecipe,
    getUserInfo,
    deleteRecipe,
    changeRoleToNormal,
    changeRoleToEditor,
    likeUser,
    unLikeUser
};