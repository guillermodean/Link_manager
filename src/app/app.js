import React, { Component } from 'react';



class App extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            Description:'',
            Category:'',
            URL:'',
            count:0+1
        };
        this.addlink=this.addlink.bind(this);
    }
    addlink(e){
        console.log(this.state);
        e.preventDefault();
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
                                                <input type="text" placeholder="link" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" placeholder="link Description" ></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Categoria" />
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="URL" />
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App