const React=require("react");
const E=React.createElement;
const CView=require("./cview");
const styles={
	container:{display:"flex"},
	leftpanel:{flex:3},
	rightpanel:{flex:2}
}
class Main extends React.Component {
	render(){
		return E("div",{style:styles.container},
			E("div",{style:styles.leftpanel},
				E(CView,{corpus:"yinshun"})
			),

			E("div",{style:styles.rightpanel},
				E(CView,{corpus:"taisho"})
			)

		)
	}
}
module.exports=Main;