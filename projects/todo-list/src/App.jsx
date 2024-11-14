import React, { useState } from 'react'
import './App.css'
import imagem from './assets/icon.webp'

export default function Vai() {
	
	const [list, setList] = useState([])
	const [item, setItem] = useState("")
	
	function addTask(form) {
		form.preventDefault()
		setList([...list, {text: item, complete: false}])
		setItem("")
	}
	
	function deleteThis(index) {
		const listUp = [...list]
		listUp.splice(index, 1)
		setList(listUp)
	}
	
	function deleteAll() {
		setList([])
	}
	
	return (
		<>
		    <h1>Lista de Tarefas</h1>
		    <form onSubmit={addTask}>
		        <input
		            type="text"
		            id="create-input"
		            placeholder="Adicione algo"
		            onChange={(e) => {setItem(e.target.value)}}
		            value={item}
		        />
		        <input
		            type="submit"
		            id="create-btn"
		            value="Criar"
		        />
		    </form>
		    <div id="list">
		    	<h2>Tarefas</h2>
		    	<section id="tasks">
		    		{
		    			list.length < 1
		    			? <img className="img" src={imagem}/>
		    			: list.map((item, index) => (
		    			
		    				<article
		    				    key={index}
		    				    onClick={(e) => {e.target.classList.toggle("done")}}
		    				>
		    					<span>{item.text}</span>
		    					<button onClick={() => {deleteThis(index)}}>Apagar</button>
		    				</article>
		    		    
		    			))
		    		}
		    	</section>
		    	{
		    	    list.length < 2
		    	    ?  console.log("nada a exibir")
		    	    :
		    		<button
		    			id="erase-all"
		    			onClick={() => {deleteAll()}}
		    		>Apagar todos</button>
		    	}
		    </div>
		</>
	)
}