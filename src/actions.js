const actions = {
  importNotebook(newState) {
    return {
      type: 'IMPORT_NOTEBOOK',
      newState,
    }
  },
  exportNotebook(exportAsReport = false) {
    return {
      type: 'EXPORT_NOTEBOOK',
      exportAsReport,
    }
  },
  saveNotebook(title = undefined, autosave = false) {
    return {
      type: 'SAVE_NOTEBOOK',
      title,
      autosave,
    }
  },
  loadNotebook(title) {
    return {
      type: 'LOAD_NOTEBOOK',
      title,
    }
  },
  deleteNotebook(title) {
    return {
      type: 'DELETE_NOTEBOOK',
      title,
    }
  },
  newNotebook() {
    return {
      type: 'NEW_NOTEBOOK',
    }
  },
  clearVariables() {
    return {
      type: 'CLEAR_VARIABLES',
    }
  },
  changePageTitle(title) {
    return {
      type: 'CHANGE_PAGE_TITLE',
      title,
    }
  },
  changeMode(mode) {
    return {
      type: 'CHANGE_MODE',
      mode,
    }
  },
  setViewMode(viewMode) {
    return {
      type: 'SET_VIEW_MODE',
      viewMode,
    }
  },
  updateInputContent(text) {
    return {
      type: 'UPDATE_INPUT_CONTENT',
      content: text,
    }
  },
  changeCellType(cellType, language = 'js') {
    return {
      type: 'CHANGE_CELL_TYPE',
      cellType,
      language,
    }
  },
  evaluateCell(cellId) {
    return {
      type: 'EVALUATE_CELL',
      cellId,
    }
  },
  setCellRowCollapsedState(viewMode, rowType, rowOverflow, cellId) {
    return {
      type: 'SET_CELL_ROW_COLLAPSE_STATE',
      viewMode,
      rowType,
      rowOverflow,
      cellId,
    }
  },
  markCellNotRendered() {
    return {
      type: 'MARK_CELL_NOT_RENDERED',
    }
  },
  cellUp() {
    return {
      type: 'CELL_UP',
    }
  },
  cellDown() {
    return {
      type: 'CELL_DOWN',
    }
  },
  insertCell(cellType, direction) {
    return {
      type: 'INSERT_CELL',
      cellType,
      direction,
    }
  },
  addCell(cellType) {
    return {
      type: 'ADD_CELL',
      cellType,
    }
  },
  selectCell(cellID, scrollToCell = false) {
    return {
      type: 'SELECT_CELL',
      id: cellID,
      scrollToCell,
    }
  },
  deleteCell() {
    return {
      type: 'DELETE_CELL',
    }
  },
  changeElementType(elementType) {
    return {
      type: 'CHANGE_ELEMENT_TYPE',
      elementType,
    }
  },
  changeDOMElementID(elemID) {
    return {
      type: 'CHANGE_DOM_ELEMENT_ID',
      elemID,
    }
  },
  changeSidePaneMode(mode) {
    return {
      type: 'CHANGE_SIDE_PANE_MODE',
      mode,
    }
  },
  addLanguage(languageId, evaluate, displayName, codeMirrorMode, keybinding) {
    return {
      type: 'ADD_LANGUAGE',
      languageDefinition: {
        languageId,
        evaluate,
        displayName,
        codeMirrorMode,
        keybinding,
      },
    }
  },
}

export default actions
