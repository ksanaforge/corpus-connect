const React=require("react");
const E=React.createElement;
const {openCorpus}=require("ksana-corpus-lib");
const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("./article");
const renderHead=function({cm,start,end,target}){
	return cm.markText(start,end,{className:"head head"+target})
}

const decorators={
	'head':renderHead
}

class MainScreen extends React.Component {
	constructor(props){
		super(props);
		this.state={cor:null,address:"2p1.0101",
			article:{},rawlines:[],selection:0};
	}
	componentWillMount(){
		openCorpus(this.props.corpus,(err,cor)=>{
			this.setState({cor});
		});
	}
	showtext(){
		return JSON.stringify(this.state.cor.meta);
	}
	fetchArticle(){
		const cor=this.state.cor;
		fetchArticle(cor,this.state.address,{},res=>{
			this.setState(res);
		});
	}
	setAddress(e){
		this.setState({address:e.target.value});
	}
	setSelection({selectionText,corpus,caretText,ranges}) {
		this.setState({selection:ranges[0]});
	}
	render (){
		if (!this.state.cor) {
			return E("div",{},"loading....");
		}
		const range=this.state.cor.stringify(this.state.selection);
		return E("div",{},
			E("input",{value:this.state.address,onChange:this.setAddress.bind(this)}),
			E("button",{onClick:this.fetchArticle.bind(this)},"fetch"),
			E("div",{},range),

			E(CorpusView,{
				cor:this.state.cor,
				decorators,
				fields:this.state.fields,
				setSelection:this.setSelection.bind(this),
				article:this.state.article,
				rawlines:this.state.rawlines,
				address:this.state.article.startH
			})
		);
	}
}
module.exports=MainScreen;