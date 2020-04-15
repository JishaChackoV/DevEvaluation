import React, { Component }  from 'react';
import axios from 'axios';

class PageComponent extends Component{
   constructor(props){
       super(props);
           this.state={
                datas:null,
                pageNo:0,
           }
   }
   componentDidMount(){
    this.getData()
    setInterval(this.getData, 10000);
   }

   getData=()=>{
    axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0")
    .then(res => {
     const persons = res.data;
     this.setState({ datas:persons });
   })
   this.setState({pageNo:++this.state.pageNo})
   }
    render(){
        
        const { datas } =this.state;
        console.log("th",datas)
        return(
        <> 
        <tr style={{border:"solid"}}>
            <th>Title </th>
            <th> URL</th>
            <th>created_at</th>
            <th>author</th>
        </tr>
    {(datas!==null)&&datas.hits.map((e)=> <tr>
            <td>{e.title}</td>
            <td>{e.url}</td>
            <td>{e.created_at}</td>
            <td>{e.author}</td>
     </tr>)}
    { <div >Page:{this.state.pageNo}</div>}
        </>)
    }
}
export default PageComponent