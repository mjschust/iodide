import { newNotebook } from '../state-prototypes'

function clearUserDefinedVars(userDefinedVarNames) {
  // remove user defined variables when loading/importing a new/saved NB
  userDefinedVarNames.forEach((varName) => {
    try {
      delete window[varName]
    } catch (e) {
      console.log(e)
    }
  })
}


const initialVariables = new Set(Object.keys(window)) // gives all global variables
initialVariables.add('__core-js_shared__')
initialVariables.add('Mousetrap')
initialVariables.add('CodeMirror')


const notebookReducer = (state = newNotebook(), action) => {
  let nextState
  // let title
  // let cells

  switch (action.type) {
    case 'NEW_NOTEBOOK':
      clearUserDefinedVars(state.userDefinedVarNames)
      return Object.assign(newNotebook())

    case 'CLEAR_VARIABLES': {
      clearUserDefinedVars(state.userDefinedVarNames)
      nextState = Object.assign({}, state)
      nextState.userDefinedVarNames = {}
      nextState.externalDependencies = []
      return nextState
    }

    case 'SET_VIEW_MODE': {
      const { viewMode } = action
      return Object.assign({}, state, { viewMode })
    }

    case 'CHANGE_MODE': {
      const { mode } = action
      return Object.assign({}, state, { mode })
    }

    case 'CHANGE_SIDE_PANE_MODE': {
      return Object.assign({}, state, { sidePaneMode: action.mode })
    }

    case 'CHANGE_SIDE_PANE_WIDTH': {
      const width = state.sidePaneWidth + action.widthShift
      return Object.assign({}, state, { sidePaneWidth: width })
    }

    case 'INCREMENT_EXECUTION_NUMBER': {
      let { executionNumber } = state
      executionNumber += 1
      return Object.assign({}, state, { executionNumber })
    }

    case 'APPEND_TO_EVAL_HISTORY': {
      const history = [...state.history]
      history.push({
        cellID: action.cellId,
        lastRan: new Date(),
        content: action.content,
      })
      console.warn(history)
      return Object.assign({}, state, { history })
    }

    case 'UPDATE_USER_VARIABLES': {
      const userDefinedVarNames = []
      Object.keys(window)
        .filter(g => !initialVariables.has(g))
        .forEach((g) => { userDefinedVarNames.push(g) })
      return Object.assign({}, state, { userDefinedVarNames })
    }

    case 'TEMPORARILY_SAVE_RUNNING_CELL_ID': {
      const { cellID } = action
      return Object.assign({}, state, { runningCellID: cellID })
    }

    case 'SAVE_ENVIRONMENT': {
      let newSavedEnvironment
      if (action.update) {
        newSavedEnvironment = Object
          .assign({}, state.savedEnvironment, action.updateObj)
      } else {
        newSavedEnvironment = action.updateObj
      }
      // console.log('update?', action.update, 'obj:', newSavedEnvironment)
      return Object.assign({}, state, { savedEnvironment: newSavedEnvironment })
    }

    case 'ENVIRONMENT_UPDATE_FROM_EDITOR': {
      return Object.assign({}, state, { savedEnvironment: action.savedEnvironment })
    }

    case 'ADD_LANGUAGE_TO_EVAL_FRAME': {
      const languages = Object.assign(
        {},
        state.languages,
        { [action.languageDefinition.languageId]: action.languageDefinition },
      )
      return Object.assign({}, state, { languages })
    }

    default: {
      return state
    }
  }
}

// export { getSavedNotebooks }

export default notebookReducer
