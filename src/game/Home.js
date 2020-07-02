import React, {Component} from "react";
import Slider from "../SliderComponent";
import FilterHome from "../SearchItems";
import settings from "../settings";


class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            game: [],
            type: [],
            word: "",
            selectType: "",
            filterTypeActive: false,
            filterGameActive: false
        }

    }


    async componentDidMount() {
        let response = await fetch(settings.api + "giocos");
        let games = await response.json();
        this.setState({game: games });
        let secondResponse = await fetch(settings.api + "generes");
        let types = await secondResponse.json();
        this.setState({type: types })

    }

    setWord(obj){
        document.addEventListener("DOMContentLoaded", function (event) {
            let words = document.getElementById('wordToSearch');
            words.addEventListener("input", function (){
                obj.setState({word: words.value})
            });

        });
    }

    setType(obj){
        document.addEventListener("DOMContentLoaded", function (event) {
            let type = document.getElementById('inputStateNav');
            type.addEventListener("input", function (){
                obj.setState({selectType: type.value})
            });

        });
    }


    render() {
        {this.setWord(this)}
        {this.setType(this)}
        this.state.filterTypeActive = false
        this.state.filterGameActive = false
        if(this.state.selectType !== "" && this.state.selectType!== "Seleziona categoria"){
            return(
                <div className="searchStruct">
                    <h5 className="avvisoSearch">{this.state.selectType}</h5>
                    <FilterHome>
                        {this.state.game.map((game) =>{
                            if(game.genere.tipologia.toLocaleLowerCase().indexOf(this.state.selectType.toLocaleLowerCase()) !== -1){
                                return (
                                    <div>
                                        <FilterHome.ItemSearch game={game} key={game.id}>item1</FilterHome.ItemSearch>
                                        {this.state.filterTypeActive = true}
                                    </div>

                                )
                            }
                        })}
                    </FilterHome>
                    {!this.state.filterTypeActive &&
                            <div className="typeNotFound">
                                <h6>Nessun gioco trovato per la categoria selezionata :(</h6>
                            </div>
                    }
                </div>
            );

        }
        if(this.state.word === ""){
            return (
                    <div className="central-struct">
                    {this.state.type.map(type => {
                        if (type.giochi.length !== 0) {
                            return(
                                <div key={type.id} className="row">
                                    <div className="typeName">
                                        <h4>{type.tipologia}</h4>
                                    </div>
                                    <Slider>
                                        {type.giochi.map((game) =>
                                            <Slider.Item game={game} key={game.id}>item1</Slider.Item>)
                                        }
                                    </Slider>
                                </div>);
                        }
                    })}
                </div>
        );
        }else{
            return (
                <div id="SearchItem" className="searchStruct">
                    <h5 className="avvisoSearch">Risultati della ricerca:</h5>
                    <FilterHome>
                        {this.state.game.map((game) =>{
                            if(game.nome.toLocaleLowerCase().indexOf(this.state.word.toLocaleLowerCase()) !== -1){
                                return (
                                    <div>
                                        <FilterHome.ItemSearch game={game} key={game.id}>item1</FilterHome.ItemSearch>
                                        {this.state.filterGameActive = true}
                                    </div>
                                )
                            }
                        })}
                    </FilterHome>
                    {console.log(this.state.filterGameActive)}
                    {!this.state.filterGameActive &&
                    <div className="typeNotFound">
                        <h6>Nessun gioco trovato :(</h6>
                    </div>
                    }
                </div>

            );
        }
    }

}


export default Home;
