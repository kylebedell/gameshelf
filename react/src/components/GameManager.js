import React, {Component} from 'react';
import GameForm from './GameForm';
import GameList from './GameList';

class GameManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      selectedGame: '',
      data: []
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleAddGameClick = this.handleAddGameClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleChange(event) {
    let newName = event.target.value;
    this.setState({ name: newName });
  }

  handleRadioChange(event) {
    let game = event.target.value;
    this.setState({ selectedGame: game });
  }

  handleAddGameClick(event){
    event.preventDefault();
    if(this.state.selectedGame == ''){
      $('.alert').append ('<h2>Please select a game to add</h2>');
    } else  {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: '/api/v1/boardgamegeek/game',
        data: JSON.stringify({'game': { 'name': this.state.selectedGame }})
      })
      .done(data => {
        $('.games').append ('<li>' + data.game.name + ' (' + data.game.year + ')' + '</li>');
        $('.alert').append ('<h2>Game added successfully</h2>');
      });
    }
  }

  handleSearchClick(event){
    event.preventDefault();
    if(this.state.name == ''){
      $('.alert').append ('<h2>Please enter something in the search field</h2>');
    } else  {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: '/api/v1/boardgamegeek/search',
        data: JSON.stringify({'games': { 'name': this.state.name }})
      })
      .done(data => {
        this.setState( {data: data.games} );
      });
    }
  }

  render() {
    return (
      <div>
      <GameForm
      handleSearchClick={this.handleSearchClick}
      handleChange={this.handleChange}
      name={this.state.name}
      />
      <GameList
        data={this.state.data}
        handleAddGameClick={this.handleAddGameClick}
        handleRadioChange={this.handleRadioChange}
      />
      </div>
    )
  }
}

export default GameManager;