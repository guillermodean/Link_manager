import React, { Component } from 'react';



class App extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            description:'',
            category:'',
            url:'',
            count:0,
            links:[],
            _id:''
        };
        this.addlink=this.addlink.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    addlink(e){
       if(this.state._id) {
           fetch(`/api/lins/${this.state._id}`, {
               method:'PUT',
               body: JSON.stringify(this.state),
               headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
               }
           })
           .then( res => res.json())
           .then(data => console.log (data))
       }
       else {
        fetch('/api/links', {
            method:'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html:'Enlace guardada'})  //M-> MAterialize, toast-> manda un mensaje por pantalla
                this.setState({title:'',description:'',category:'',url:'',count:0});
                this.fetchlinks();
            })
            .catch(err => console.error(err));
       }

        e.preventDefault();
    }
    componentDidMount(){
        this.fetchlinks();
    }
    fetchlinks(){
        fetch('api/links')   //por defecto envia un GET
            .then(res => res.json())
            .then(data => 
                {
                this.setState({links:data});
                console.log(this.state.links)}
            )
    }
    handleChange(e) {
        const {name,value} = e.target;
        this.setState({
            [name]:value
        });

    }
    deleteLink(id){
        if(confirm (' Estas seguro de querer eliminar el enlace')) {
            fetch('api/links/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
    
            })
            .then (res=> res.json())
            .then (data=> {
                console.log (data);
                M.toast({html:'Ling elminiada'});
                
                this.fetchlinks();
            });
        }
    }
    updateLink(id) {
        fetch(`/api/links/${id}`)
            .then(res=>res.json())
            .then(data=>{
                 console.log(data)
                 this.setState({
                     title:data.title,
                     description:data.description,
                     category:data.category,
                     url:data.url,
                     _id:data._id
                 })
            });
    }
    countLink (id){

    }
    
    render() {
        return (
            <div>
                {/*navigation*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a href="/" className="brand-logo">Lista links</a>

                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addlink}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="link" value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} className="materialize-textarea" placeholder="link Description" value={this.state.description} ></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="category" onChange={this.handleChange} type="text" placeholder="Categoria" value={this.state.category} />
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="url" onChange={this.handleChange} type="text" placeholder="URL" value={this.state.url} />
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Descripcion</th>
                                        <th>Categoria</th>
                                        <th>url</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.links.map(link =>{
                                            return (
                                                <tr key={link._id}>
                                                    <td>{link.title}</td>
                                                    <td>{link.description}</td>
                                                    <td>{link.category}</td>
                                                    <td>
                                                        <a href={link.url} className="btn light-blue darken-4" onClick={()=>this.countLink(link._id)} >Ir</a></td>
                                                        <td>
                                                            <button className="btn light-blue darken-4" onClick={()=>this.updateLink(link._id)}>
                                                                <i className="material-icons">edit</i>
                                                            </button>
                                                            <button className="btn red darken-4" style={{marginTop: '3px'}} onClick={()=>this.deleteLink(link._id)}>
                                                                <i className="material-icons">delete</i>
                                                            </button>
                                                        </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App