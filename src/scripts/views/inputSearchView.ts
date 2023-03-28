import listNotesSearch from '../components/listNotesSearch';
import { querySelector } from '../utils/querySelectDOM';
import STORAGE_KEYS from '../constants/storageKeys';
import ElementHelpers from '../helpers/elementHelpers';
import EventHelpers from '../helpers/eventHelpers';

export default class InputSearchView {
  elementHelpers: ElementHelpers;

  eventHelpers: EventHelpers;

  constructor() {
    this.elementHelpers = new ElementHelpers();
    this.eventHelpers = new EventHelpers();
  }

  /**
   * @description function clear input search and render
   * tab note
   *
   * @param {function} renderTabs function render tab transmitted
   * from controller
   */
  clearSearch(renderTabs: () => void) {
    const clearElement = querySelector('.icon-close-cover')!;
    const iconClose = querySelector('.icon-close') as  HTMLElement;
    const handler = () => {
      const search = querySelector('.search') as HTMLInputElement;
      if (search.value && iconClose) {
        search.value = '';
        sessionStorage.setItem(STORAGE_KEYS.PAGE_NUMBER, '0');
        this.elementHelpers.removeMenuActive();
        this.elementHelpers.showMenuActive();
        renderTabs();
        iconClose.style.visibility = 'hidden';
      }
    };

    this.eventHelpers.addEvent(clearElement, 'click', handler);
  }

  /**
   * @description function search notes with
   * value of input entered and remove formElement
   *
   * @param {function} searchNote function transmitted
   * from controller
   */
  bindSearchNotes(renderTab: (inputValue: string) => void) {
    const formSearch = querySelector('.form-search') as HTMLFormElement;
    const iconSearch = querySelector('.icon-search-cover');

    const handler = (e: Event) => {
      e.preventDefault();
      const formData = new FormData(formSearch);
      const inputValue = formData.get('search') as string;
      const sectionWrapper = querySelector('.section-wrapper')!;

      sessionStorage.setItem(STORAGE_KEYS.PAGE_NUMBER, '0');
      sectionWrapper.innerHTML = '';
      sectionWrapper.appendChild(listNotesSearch());
      renderTab(inputValue);
    };

    this.eventHelpers.addEvent(formSearch, 'submit', handler);
    this.eventHelpers.addEvent(iconSearch!, 'click', handler);
  }

  /**
   * @description function show hide icon close in input search when focusing,
   * click out of input and input events
   */
  handleInputSearch() {
    const inputSearch = querySelector('.search')!;
    const formSearch = querySelector('.form-search')! as HTMLFormElement;
    // Change color input search when focusing
    const focusInputSearch = () => {
      this.elementHelpers.addClass(formSearch, 'focus-search');
      this.elementHelpers.removeClass(formSearch, 'blur-search');
    };

    // Change color input search when click out of input
    const blurInputSearch = () => {
      this.elementHelpers.addClass(formSearch, 'blur-search');
      this.elementHelpers.removeClass(formSearch, 'focus-search');
    };

    // If input have value, icon close input search will appear
    const showIconCloseInput = () => {
      const formData = new FormData(formSearch);
      const inputValue = formData.get('search');
      if (inputValue) {
        const iconClose = querySelector('.icon-close')!;
        iconClose.style.visibility = 'visible';
      }
    };

    this.eventHelpers.addEvent(inputSearch, 'focus', focusInputSearch);
    this.eventHelpers.addEvent(inputSearch, 'blur', blurInputSearch);
    this.eventHelpers.addEvent(inputSearch, 'input', showIconCloseInput);
  }
}
