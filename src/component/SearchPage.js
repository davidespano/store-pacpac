import React, {Component} from "react";


class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = { searchName: null }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }

    submitHandler = (e) =>{
        e.preventDefault()
    }

    render() {
        return (

            <div id={'searchInput'} className="input-group">
                <form onSubmit={this.submitHandler.bind(this)}>
                    <input type="text" className="form-control" placeholder="Search this blog"
                           name="searchName"
                            id="wordToSearch"/>
                    <div className="input-group-append">
                    </div>
                </form>
            </div>

        );
    }
}

export default SearchPage;
