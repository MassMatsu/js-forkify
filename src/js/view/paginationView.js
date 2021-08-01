import View from './View.js';

import icons from 'url:../../img/icons.svg'; // for Parcel 2.

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return

      const goToPage = +btn.dataset.goto

      handler(goToPage);
    });
  }

  _generateButton(btnType) {
    const curPage = this._data.page;
    const prevBtn = `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        curPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `
    const nextBtn = `
      <button class="btn--inline pagination__btn--next" data-goto="${
        curPage + 1
      }">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    return btnType === 'prev' ? prevBtn : btnType === 'next' ? nextBtn : prevBtn + nextBtn
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return this._generateButton('next')
    }

    if (curPage === numPages && numPages > 1) {
      return this._generateButton('prev')
    }

    if (curPage < numPages) {
      return this._generateButton('both')
    }

    return '';
  }
}

export default new PaginationView();
