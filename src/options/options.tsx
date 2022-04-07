import React from 'react'
import * as ReactDOM from 'react-dom';


const firstname = <div><p>Hello</p></div>

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(firstname, root);