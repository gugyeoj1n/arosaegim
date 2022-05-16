import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { MdAdd } from 'react-icons/md'
import { useTodoDispatch } from '../../TodoContext'
import axios from 'axios'
import { Cookies } from 'react-cookie'

const CircleButton = styled.button`
  	background: #DBADFF;
  	&:hover {
    	background: #E8CCFF;
  	}
  	&:active {
    	background: #CD8CFF;
  	}

 	z-index: 5;
  	cursor: pointer;
  	width: 60px;
  	height: 60px;
  	display: block;
  	align-items: center;
  	justify-content: center;
  	font-size: 60px;
	position: relative;
  	left: 50%;
  	bottom: 0px;
  	transform: translate(-50%, 50%);
  	color: white;
  	border-radius: 50%;
  	border: none;
  	outline: none;
  	display: flex;
  	align-items: center;
  	justify-content: center;

  	transition: 0.125s all ease-in;
  	${props =>
    	props.open &&
    	css`
      		background: #ff6b6b;
      		&:hover {
        		background: #ff8787;
      		}
      		&:active {
        		background: #fa5252;
      		}
      		transform: translate(-50%, 50%) rotate(45deg);
    	`}
`;

const InsertFormPositioner = styled.div`
  	width: 100%;
  	bottom: 0;
  	left: 0;
`;

const InsertForm = styled.form`
  	background: #f8f9fa;
  	padding-top: 32px;
	padding-left: 32px;
	padding-right: 32px;
  	border-bottom-left-radius: 16px;
  	border-bottom-right-radius: 16px;
  	border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  	padding: 12px;
  	border-radius: 4px;
  	border: 1px solid #dee2e6;
  	width: 100%;
  	outline: none;
  	font-size: 18px;
  	box-sizing: border-box;
`;

function TodoCreate() {
	const [open, setOpen] = useState(false)
	const [text, setText] = useState("")
	
	const cookies = new Cookies()

	const dispatch = useTodoDispatch()
	
	const onToggle = () => setOpen(!open)
	const onChange = (e) => setText(e.target.value)
	
	const today = new Date()
	
	const onSubmit = async (e) => {
		let id = 0
		let userName = ""
		e.preventDefault()
		const isLogin = cookies.get('login_token')
		await axios.post('/api/users/get_name', { login_token: isLogin }).then(response => {
			userName = response.data.user.userName
		})
		await axios.get('/api/todos/get_todo').then(response => {
			id = response.data.length
		})
		dispatch({
			type: 'CREATE',
			todo: {
				text: text,
				done: false,
				id: id,
				userName: userName
			}
		})
		axios.post('/api/todos/post_todo', {
			date: `${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`,
			done: false,
			text: text,
			id: id,
			userName: userName
		}).then(response => console.log(response))
		setText('')
		setOpen(false)
	}
	
	return (
		<div>
			{ open && (
				<InsertFormPositioner>
					<InsertForm onSubmit={ onSubmit }>
						<Input autoFocus placeholder="할 일을 입력 후 Enter 를 누르세요" onChange={ onChange } value={ text }/>
					</InsertForm>
				</InsertFormPositioner>
			)}
			<CircleButton onClick={ onToggle } open={ open }>
				<MdAdd />
			</CircleButton>
		</div>
	)
}

export default React.memo(TodoCreate)