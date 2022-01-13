const model = require('./menu-model');




const getMenuDetail = (menuId) => model.find({id: menuId}).limit(4);

const addToMenu = (menuId, recipeId) =>
    model.updateOne({ "id": menuId },
        {
            $push:
                {
                    recipeList: {
                        $each: [recipeId],
                        $position: 0
                    }
                }
        },
        { upsert: true });


const deleteRecipe = (menuId, recipeId) =>
    model.updateOne({ id: menuId },
        { $pull: { recipeList: recipeId } })
;





module.exports = {
    getMenuDetail,
    addToMenu,
    deleteRecipe,
    
}