import React,{Component} from 'react'
import ReactDom from 'react-dom'
class App extends Component
 {
     render(){
         return(<div>
             <h1>
               Hi, thats React Component!
             </h1>
         </div>
     )
 }
}
ReactDom.hydrate(<App/>,document.getElementById('root'))