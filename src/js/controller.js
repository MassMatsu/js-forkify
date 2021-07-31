import * as model from './model.js'
import recipeView from './view/recipeView.js'
import searchView from './view/searchView.js'

import icons from 'url:../img/icons.svg'; // for Parcel 2.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return
    
    recipeView.renderSpinner();

    await model.loadRecipe(id)

    recipeView.render(model.state.recipe)
   
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    const query = searchView.getQuery()
    if (!query) return

    await model.loadSearchResults(query)
  } catch (error) {
    console.log(error)
  }
}

//controlSearchResults()

console.log()

const init = function() {
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
}
init()

