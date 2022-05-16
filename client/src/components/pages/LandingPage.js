import React, { useState } from 'react'
import './LandingPage.css'
import Modal from 'react-modal'
import LoginModal from './LoginModal'
import { Cookies } from 'react-cookie'
import MainModal from './MainModal'
import TodoTemplate from '../todo/TodoTemplate'
import TodoHead from '../todo/TodoHead'
import TodoList from '../todo/TodoList'
import TodoCreate from '../todo/TodoCreate'
import { TodoProvider } from '../../TodoContext'

const cookies = new Cookies()

function LandingPage() {
	const [login, setLogin] = useState(false)
	const [mainIsOpen, setMainIsOpen] = useState(false)
	
	
	const loginToMain = () => {
		const isLogin = cookies.get('login_token')
		isLogin ? setMainIsOpen(true) : setLogin(true)
	}
	
	window.onbeforeunload = (e) => {
		const test = cookies.get('login_token')
		if(test) cookies.remove('login_token')
		e.returnValue = ''
	}
	
	return (
		<div className='all'>
			<div className='title'>아로새김</div>
			<div className='mean'>아로새기다 : 마음속에 또렷이 기억하여 두다.</div>
			<div className='desc'>아래 버튼을 눌러 계정에 액세스하세요. 로그아웃은 새로고침으로 할 수 있어요.<br/><br/>할 일은 등록 24시간 후 없어져요.</div>
			<button className='todoOpenButton' onClick= {() => loginToMain() }>오늘의 할 일</button>
			<Modal ariaHideApp={ false } isOpen={ login } onRequestClose={ () => setLogin(false) } style={{
				overlay: { background: '#BEBEBE' },
				content: { borderRadius: '30px', width: ' 20%', height: '30%', position: 'absolute', left: '50%', top: '50%', transform:`translate(-50%, -50%)` }
			}}>
				<LoginModal setLogin={ setLogin } setMainIsOpen={ setMainIsOpen }/>
			</Modal>
			<MainModal open={ mainIsOpen } />
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
		</div>
		
	)
}

export default LandingPage