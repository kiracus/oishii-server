const model = require('./allRecipe-model');


const findAllRecipes = () => model.find().sort({"$natural": -1}).limit(4);

const addRecipeAndFollower = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.find({id: id});

const addFollower = (id, userID) =>
    model.updateOne({"id": id},
        {$push:
                {followers: {
                        $each: [userID],
                        $position :0}
                }},
        {upsert: true});
    



const removeFollower = (id, userID) =>
    model.updateOne({ "id": id },
        { $pull: { followers: userID } });

const getFollowers = (id) =>
    model.find({ "id": id });


module.exports = {
    findAllRecipes,
    addRecipeAndFollower,
    findRecipeById,
    addFollower,
    removeFollower,
    getFollowers
};