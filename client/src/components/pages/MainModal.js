import React, { useState } from 'react'
import Modal from 'react-modal'
import TodoTemplate from '../todo/TodoTemplate'
import TodoHead from '../todo/TodoHead'
import TodoList from '../todo/TodoList'
import TodoCreate from '../todo/TodoCreate'
import { TodoProvider } from '../../TodoContext'

function MainModal() {
	const [mainIsOpen, setMainIsOpen] = useState(false)
	
	return (
		<Modal ariaHideApp={ false } isOpen={ mainIsOpen } onRequestClose={ () => setMainIsOpen(false) } style={{
			overlay: { background: '#7B7B7B' },
			content: { borderRadius: '20px', width: '27%', height: '83%', position: 'absolute', left: '50%', top: '50%', transform:`translate(-50%, -50%)` }
		}}>
        	<TodoProvider>
				<TodoTemplate>
					<TodoHead />
					<TodoList />
					<TodoCreate />
				</TodoTemplate>
			</TodoProvider>
      	</Modal>
	)
}

export default MainModal