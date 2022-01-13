const MenuDao = require('./menu-dao')
const recipeDao = require("../UserRecipes/recipe-dao");
const userDao = require("../User/user-dao");





module.exports = (app) => {
    
    const getMenuDetail = (req, res) =>
        MenuDao.getMenuDetail(req.body.menuId)
            .then(menuDetail => res.json(menuDetail[0]));
    
 
    
    const addToMenu = (req, res) =>{
        const menuId = req.body.menuId;
        const recipeId = req.body.recipeId;
        console.log("________");
        console.log(typeof recipeId)
        
        MenuDao.addToMenu(menuId, recipeId)
        // MenuDao.addToMenu(1, 241775)
            .then(status => {
                console.log(`add ${recipeId} to ${menuId} -----`)
                // console.log("add 241775 to 1 ---")
                res.sendStatus(200)
                
            });
    };
    
    
    
    const deleteRecipeFromMenu = (req, res) =>{
        const recipeId = req.body.recipeId;
        console.log("in deleteRecipe", recipeId, "from ", req.body.menuId);
        MenuDao.deleteRecipe(req.body.menuId, recipeId)
            .then(status => {
                // delete from recent recipeList
                    console.log("API recipe deleted");
                    res.sendStatus(200);
                })
    }
    
    
    
    app.post("/db/menu/getMenuDetail", getMenuDetail);
    app.post("/db/menu/addToMenu", addToMenu);
    app.delete("/db/menu/deleteRecipeFromMenu", deleteRecipeFromMenu);
    
    
    
    
}
