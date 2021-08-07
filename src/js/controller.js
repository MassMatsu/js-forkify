import * as model from './model.js'
import recipeView from './view/recipeView.js'
import searchView from './view/searchView.js'
import resultsView from './view/resultsView.js'
import paginationView from './view/paginationView.js'
import bookmarksView from './view/bookmarksView.js'


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

    // update result view to mark selected search result
    resultsView.update(model.getSearchResultPage())
    bookmarksView.update(model.state.bookmarks)

    await model.loadRecipe(id)

    recipeView.render(model.state.recipe)
   
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner()

    const query = searchView.getQuery()
    if (!query) return

    await model.loadSearchResults(query)

    resultsView.render(model.getSearchResultPage(1))

    paginationView.render(model.state.search)
  } catch (error) {
    console.log(error)
  }
}

const controlPagination = function(goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
}


const controlServings = function(newServings) {

  // update the recipe servings
  model.updateServings(newServings)

  // update the recipe view
  //recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)

}

const controlAddBookmark = function() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)
  
  recipeView.update(model.state.recipe)

  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandleBookmark(controlAddBookmark)
}
init()

