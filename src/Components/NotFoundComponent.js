import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'

function NotFoundComponent() {
	return (
		<div className="div-aligned">
			<img src="/logo200x100.png" alt="logo"></img>
			<h1>THIS PAGE DOES NOT EXIST - PLEASE VISIT OUR HOMEPAGE</h1>
			<Link to="/home"><Button type="button" label="Home" icon="pi pi-home" className="p-button-raised p-button-rounded" /></Link>
		</div>
	)
}

export default NotFoundComponent