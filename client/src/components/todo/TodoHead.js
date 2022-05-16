import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const TodoHeadBlock = styled.div`
  	padding-top: 32px;
 	padding-left: 32px;
  	padding-right: 32px;
  	padding-bottom: 24px;
  	border-bottom: 1px solid #e9ecef;
	text-align: center;
  	h1 {
    	margin: 0;
    	font-size: 36px;
    	color: #343a40;
  	}
  	.day {
    margin-top: 20px;
    color: #868e96;
    font-size: 21px;
  	}
  	.logined {
    	color: #DBADFF;
    	font-size: 18px;
    	margin-top: 20px;
    	font-weight: bold;
  	}
`

const today = new Date()
const dateString = today.toLocaleDateString('ko-KR', {
	year: 'numeric',
	month: 'long',
	day: 'numeric'
})
const dayString = today.toLocaleDateString('ko-KR', { weekday: 'long' })

function TodoHead() {
	const [decoded, setDecoded] = useState("")
	const decoding = async () => {
		await axios.get('/api/users/decode').then(response => {
			setDecoded(response.data.decoded)
		})
	}
	useEffect(() => {
		decoding()
	}, [])
	return (
		<TodoHeadBlock>
			<h1>{ dateString }</h1>
			<div className='day'>{ dayString }</div>
			<div className='logined'>로그인된 계정 : { decoded }</div>
		</TodoHeadBlock>
	)
}

export default TodoHead