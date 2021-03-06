import View from './View.js'
import previewView from './previewView.js'

import icons from 'url:../../img/icons.svg'; // for Parcel 2.


class ResultsView extends View {
  _parentElement = document.querySelector('.results')
  _errorMessage = 'No recipe found for your query! please try again'

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('')
  }

  // _generateMarkupPreview(data) {
  //   const id = window.location.hash.slice(1)
  //   return `
  //     <li class="preview">
  //       <a class="preview__link ${data.id === id ? 'preview__link--active' : ''}"  href="#${data.id}">
  //         <figure class="preview__fig">
  //           <img src="${data.image}" alt="${data.title}" />
  //         </figure>
  //         <div class="preview__data">
  //           <h4 class="preview__title">${data.title}</h4>
  //           <p class="preview__publisher">${data.publisher}</p>
  //         </div>
  //       </a>
  //     </li>
  //   `
  // }
}

export default new ResultsView()