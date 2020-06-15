import React, {Component} from "react";
import axios from "axios";


class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            descrizione: '',
            url: '',
            codiceGioco: '',
            anteprima: [],
            genere:'',
            types:[],
            loading: true,
            game: [],
            post: true,
            userName: '',
            uuid: '',
            user: null,
            id: null,
            fileName: 'Choose file'
        }
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


     getCookie(c_name){
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                let c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    submitHandler = (e) =>{
        this.state.url = this.state.url.split(' ').join('')
        let file = this.state.anteprima
        e.preventDefault()


        if(this.state.post){

            let data = {
                nome: this.state.nome,
                descrizione: this.state.descrizione,
                url: this.state.url,
                codiceGioco: this.state.codiceGioco,
                genere: this.state.genere,
                sviluppatore: this.state.user[0]
            }
            axios.post('http://localhost:1337/giocos', data)
                .then(res => {
                    console.log(this.state)
                    Array.from(this.state.anteprima).forEach(file =>
                    {
                        let refId = res.data.id
                        let dataImage = new FormData();
                        dataImage.append('files', file);
                        dataImage.append('refId', refId);
                        dataImage.append('ref', 'gioco');
                        dataImage.append('field', 'anteprima');
                        console.log(dataImage)
                        axios.post('http://localhost:1337/upload', dataImage)
                            .then( res => {
                                alert("Gioco aggiunto")
                                window.location = "http://localhost:8000/Home"
                            })
                            .catch(error =>{
                                    console.log(error);
                            });

                    }
                    );



                })
                .catch(error =>{
                    console.log(error);
                })


        }
        if(this.state.post === false){

            let data = {
                nome: this.state.nome,
                descrizione: this.state.descrizione,
                url: this.state.url,
                codiceGioco: this.state.codiceGioco,
                genere: this.state.genere
            }

            axios.put('http://localhost:1337/giocos/'+this.state.id, data)
                .then(res => {
                    console.log(res);
                    Array.from(this.state.anteprima).forEach(file =>
                    {
                        let refId = res.data.id
                        let dataImage = new FormData();
                        dataImage.append('files', file);
                        dataImage.append('refId', refId);
                        dataImage.append('ref', 'gioco');
                        dataImage.append('field', 'anteprima');
                        console.log(dataImage)

                        axios.post('http://localhost:1337/upload', dataImage)
                                .then( res => {
                                    alert("Gioco modificato")
                                    window.location = "http://localhost:8000/Home"
                                })
                                    .catch(error =>{
                                        console.log(error);
                                    });
                                });

                })
                .catch(error =>{
                    console.log(error);
                })

        }

    }

    handlefile(e) {
        let file = e.target.files

        this.setState({anteprima: file})

        this.setState({fileName: null})

        let fileName = ""

        Array.from(e.target.files).map((file) =>
        {
             fileName = fileName + " " + file.name
            this.setState({fileName: fileName})
        });

    }






    onClickHandler = (e) =>{
        e.preventDefault()

        const data = new FormData();
        data.append('files', this.state.foto)
        axios.post('http://localhost:1337/upload', data)
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
    }

    async componentDidMount() {
        let response = await fetch("http://localhost:1337/generes");
        if (!response.ok) {
            return
        }
        let types = await response.json()
        this.setState({ loading: false, types: types })

        this.state.uuid = this.getCookie('uuidToken')
        this.state.userName = this.getCookie('usernameToken')

        let response2 = await fetch("http://localhost:1337/sviluppatores?uuid="+this.state.uuid);
        let user = await response2.json()
        if(user.length === 0){
            let data = {
                nome: this.state.userName,
                uuid: this.state.uuid
            }

            axios.post('http://localhost:1337/sviluppatores', data)
                .then(res => {
                    this.state.user = res.data;
                })
                .catch(error =>{
                    console.log(error);
                })



        }else{
            this.state.user = user
        }

        const gameValues = new URLSearchParams(window.location.search);
        //let nome = gameValues.get('gameName');
        let gameName = gameValues.get('gameName');
        const codiceGame = gameValues.get('gameId');
        let response3 = await fetch("http://localhost:1337/giocos?codiceGioco="+codiceGame);
        let games = await response3.json()
        this.setState({game: games })

        if(this.state.game.length === 0){
        }else{
            this.state.post = false;
            this.state.game.map((game)=>{this.state.id = game.id})
        }

    }


    render() {

        let {url, foto, genere, descrizione} = this.state
        let nome;
        const gameValues = new URLSearchParams(window.location.search);
        //let nome = gameValues.get('gameName');
        let gameName = gameValues.get('gameName');
        const codiceGame = gameValues.get('gameId');
        this.state.codiceGioco = codiceGame;
        this.state.url = "PacPac/" + this.state.nome


        return (
            <div id={'addgame-post'} className="form-struct">
                <form id={'form-add-game'} onSubmit={this.submitHandler}>
                    <div id={'content-form-add'}>
                        <div id={'input-name'} className="form-group">
                            <label htmlFor="inputAddress">Nome Gioco</label>
                                <input type="text" className="form-control" id="inputAddress"
                                                placeholder="Pac Pac game" name="nome" value={nome}
                                                required minLength="4" maxLength="64" size="10"
                                                onChange={this.changeHandler}
                                                defaultValue={gameName}/>

                        </div>
                        <div>
                            <label>Anteprima gioco</label>
                        </div>
                        <div>

                            <div className="custom-file">
                                <input type="file" multiple className="custom-file-input" id="customFile" onChange={(e)=>this.handlefile(e)}/>
                                    <label id="FilesName" className="custom-file-label" htmlFor="customFile">{this.state.fileName}</label>
                            </div>


                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Descrizione gioco</label>
                                <textarea  className="form-control" id="textarea"
                                           name="descrizione" value={descrizione}
                                           onChange={this.changeHandler}
                                           rows="3" placeholder={"La descrizione del tuo gioco"}/>
                            </div>


                            <div id={'input-category'} >
                                <div id={'input-category-second'}>
                                    <label htmlFor="inputState">Genere</label>
                                    <select id="inputState" className="form-control" name="genere"
                                            onChange={this.changeHandler}
                                            required>
                                        <option name="genere" value={genere} onChange={this.changeHandler}> Seleziona
                                            categoria
                                        </option>
                                        {this.state.types.map(option => (
                                            <option key={option.id} value={option.id}>{option.tipologia}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div id={'input-url'} className="form-group">
                            <label id="UrlGioco" htmlFor="inputAddress2">Url gioco</label>
                            <br/>
                            {!codiceGame && <h4 className="urlgame">PacPac/{this.state.nome}</h4>}
                            {codiceGame && gameName &&
                            <h4 className="urlgame">PacPac/{this.state.nome.split(' ').join('')}</h4>}
                        </div>
                        {!this.state.post &&
                            <div id={'button-add-game'}>
                                <button type="submit" className="btn btn-primary">Modifica il gioco</button>
                            </div>
                        }
                        {this.state.post &&
                        <div id={'button-add-game'}>
                            <button type="submit" className="btn btn-primary">Aggiungi il gioco</button>
                        </div>
                        }
                    </div>


                </form>

            </div>


        )
    }

}

export default PostForm;