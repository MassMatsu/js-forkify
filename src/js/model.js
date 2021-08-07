import { async } from 'regenerator-runtime';
import {API_URL, RESULTS_PER_PAGE} from './config.js'
import {getJSON} from './helper.js' 


export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1
  },
  bookmarks: [],
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

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) 
      state.recipe.bookmarked = true
      else
      state.recipe.bookmarked = false

    console.log(state.recipe);
  } catch (error) {
    throw error
  }
};

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url
      }
    })

    state.search.page = 1

    console.log(state.search.results)
  } catch (error) {

  }
}

export const getSearchResultPage = function(page = state.search.page) {
  state.search.page = page

  const start = (page - 1) * state.search.resultsPerPage
  const end = page * state.search.resultsPerPage

  return state.search.results.slice(start, end)
}

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings
  })

  state.recipe.servings = newServings
};

const persistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}


export const addBookmark = function(recipe) {
  state.bookmarks.push(recipe)

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true

  persistBookmarks()
}

export const deleteBookmark = function(id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id)
  state.bookmarks.splice(index, 1)

  if (id === state.recipe.id) state.recipe.bookmarked = false
} 

const init = function() {
  const storage = localStorage.getItem('bookmarks')
  if (storage) state.bookmarks = JSON.parse(storage)
}
init()
// console.log(state.bookmarks)

const clearBookmarks = function() {
  localStorage.clear('bookmarks')
}



