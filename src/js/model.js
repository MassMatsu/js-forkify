import { async } from 'regenerator-runtime';
import {API_URL} from './config.js'
import {getJSON} from './helper.js' 


export const state = {
  recipe: {},
  search: {
    query: '',
    result: []
  }
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`)

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (error) {
    throw error
  }
};

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.result = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url
      }
    })

    console.log(state.search.result)
  } catch (error) {

  }
}