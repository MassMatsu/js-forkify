import * as model from './model.js'
import recipeView from './view/recipeView.js'

import icons from 'url:../img/icons.svg'; // for Parcel 2.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(error.message);
  }
};


['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe))

