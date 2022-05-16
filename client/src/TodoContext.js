import React, { useReducer, createContext, useContext, useEffect } from 'react'
import axios from 'axios'

const initialTodos = []

function todoReducer(state, action) {
	switch(action.type) {
		case 'CREATE' :
			return state.concat(action.todo)
		case 'TOGGLE' :
			return state.map(todo => 
				todo.id === action.id ? { ...todo, done: !todo.done } : todo)
		case 'REMOVE' :
			return state.filter(todo => todo.id !== action.id)
		case 'UPDATE' :
			return [ ...state, ...action.payload ]
		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}

const TodoStateContext = createContext()
const TodoDispatchContext = createContext()

export function TodoProvider({ children }) {
	const [state, dispatch] = useReducer(todoReducer, initialTodos)
	
	useEffect(() => {
    	const fetchData = async () => {
      		const result = await axios.get('/api/todos/get_todo')
			dispatch({
				type: 'UPDATE',
				payload: result.data
			})
    	}
    	fetchData()
  	}, [])
	
	
	
	return (
		<TodoStateContext.Provider value={ state }>
			<TodoDispatchContext.Provider value={ dispatch }>
				{ children }
			</TodoDispatchContext.Provider>
		</TodoStateContext.Provider>
	)
}

export function useTodoState() {
	const context = useContext(TodoStateContext)
  	if (!context) { throw new Error('Cannot find TodoProvider') }
  	return context
}

export function useTodoDispatch() {
	const context = useContext(TodoDispatchContext)
  	if (!context) { throw new Error('Cannot find TodoProvider') }
  	return context
}