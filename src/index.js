const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const MainScreen=require("./main")

const Main=function(){
	ReactDOM.render(E(MainScreen,{}),
	 document.getElementById('root'))	
}

Main();