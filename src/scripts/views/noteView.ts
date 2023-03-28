import iconPin from 'assets/icons/icon-pin.svg';
import iconColorBoard from 'assets/icons/icon-color-board.svg';
import iconColorTrash from 'assets/icons/icon-trash.svg';
import Note from 'interfaces/note';
import Menu from 'constants/menu';

/**
 * @class noteView
 * @description manage view of a note
 */
export default class NoteView {
  noteItem: Note;

  constructor(noteItem: Note) {
    this.noteItem = noteItem;
  }

  /**
   * @description function create a note
   *
   * @param {Number} tab note of trash transmitted from view
   *
   * @returns {Element} noteElement is a element note
   */
  renderNote(tab: number): Element {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    const note = this.noteItem;
    if (note.id) {
      noteElement.setAttribute('id', note.id);
    }

    noteElement.innerHTML = `
      <div class="note-content" data-id="${note.id}">
        <p class="note-title">${note.title}</p>
        <p class="note-description">${note.description}</p>
        <p class="note-empty ${
          !note.title && !note.description ? '' : 'hide'
        }">Empty note</p>
      </div>
      <div class="note-utilities" data-id="${note.id}">
        <div class="note-btn">
          ${
            tab === Menu.TRASH_NOTES
              ? `<button class="btn btn-delete" type="button" data-id="${note.id}">Delete</button>`
              : `<figure class="item-utilities icon-delete" data-id="${note.id}">
            <img src="${iconColorTrash}" alt="icon trash" data-id="${note.id}">
          </figure>`
          }
          
        </div>
      </div>`;
    return noteElement;
  }

  /**
   * @description function create a note form
   *
   * @returns {Element} formElement
   */
  renderNoteForm(): Element {
    const formElement = document.createElement('div');
    formElement.setAttribute('class', 'overlay');
    const note = this.noteItem;

    formElement.innerHTML = `
      <form class="form-note note-form-overlay" id="${note.id}">
        <div class="form-title">
          <div class="form-group">
            <textarea name="title" class="input-note note-title" rows="1" placeholder="Title">${note.title}</textarea>
            <figure class="icon-pin-cover">
              <img src="${iconPin}" alt="icon pin" hidden>
            </figure>
          </div>
        </div>
        <div class="form-group">
          <textarea name="description" class="input-note note-description" rows="1" placeholder="Take a note...">${note.description}</textarea>
        </div>
        <div class="form-utilities">
          <div class="form-group">
            <div class="item-utilities">
              <img src="${iconColorBoard}" alt="icon color board" hidden>
            </div>
            <div class="form-buttons">
              <button class="btn btn-delete-form" type="button" data-id="${note.id}">Delete</button>
              <button class="btn btn-close" type="submit" data-id="${note.id}">Close</button>
            </div>
          </div>
        </div>
      </form>`;
    return formElement;
  }
}
