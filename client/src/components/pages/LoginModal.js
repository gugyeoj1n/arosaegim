import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Block = styled.div`
`

const Head = styled.div`
	padding-top: 30px;
	width: 100%;
	heigth: 55%;
	font-size: 30px;
	text-align: center;
`

const LoginDescription = styled.div`
	padding-top: 15px;
	padding-left: 35px;
	padding-right: 35px;
	padding-bottom: 30px;
	font-size: 15px;
	color: gray;
	text-align: center;
`

const InputBlock = styled.div`
	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
`

const Input = styled.input`
	padding-top: 10px;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 10px;
	margin-top: 7px;
	margin-bottom: 7px;
	text-align: center;
	width: 20%;
	font-size: 15px;
	border-radius: 10px;
	border: none;
	outline: none;
	background: #EEEEEE;
`

function LoginModal(props) {
	const [Name, setName] = useState("")
	const [Password, setPassword] = useState("")
	
	const onNameHandler = (e) => {
		setName(e.currentTarget.value)
	}
	
	const onPasswordHandler = (e) => {
		setPassword(e.currentTarget.value)
	}
	
	const onSubmitHandler = (e) => {
		e.preventDefault()
		axios.post('/api/users/login', { userName: Name, password: Password }).then(response => {
			if(response.data.loginSuccess) {
				console.log("LOGIN SUCCESS")
				props.setLogin(false)
				props.setMainIsOpen(true)
			}
		})
	}
	
	return (
		<Block>
			<Head>
				로그인하세요!
			</Head>
			<LoginDescription>
				계정 이름과 비밀번호를 입력하세요. 계정이 없을 시 자동으로 생성돼요. 입력된 그대로 계정이 만들어지니 오타에 주의하세요!
			</LoginDescription>
			<form onSubmit={ onSubmitHandler }>
				<InputBlock>
					<Input type="text" value={ Name } onChange={ onNameHandler } placeholder="이름"/>
					<Input type="password" value={ Password } onChange={ onPasswordHandler } placeholder="비밀번호"/>
					<input type="submit" style={{ display: 'none' }}/>
				</InputBlock>
			</form>
		</Block>
	)
}

export default LoginModal