import React, { Component } from "react"
import "../App.css"


class App extends Component {

  state = {
    textValue: '',
    zipCodes: []
  }

  changeHandler = (e) => {
    this.setState({
      textValue: e.target.value
    });
  }

  keyHandler = (e) => {
    if (e.key === 'Enter') {
      this.getZipCodes();
    }
  }

  getZipCodes = async () => {
    const city = this.state.textValue.toUpperCase();
    const request = await fetch(`http://ctp-zip-api.herokuapp.com/city/${city}`);
    const zipcodes = await request.json();

    this.setState({
      zipCodes: zipcodes
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <Search
            textValue={this.state.textValue}
            changeHandler={this.changeHandler}
            getZipCodes={this.getZipCodes}
            keyHandler={this.keyHandler}
          />
          <ZipcodeList zips={this.state.zipCodes} />
        </div>
      </div>
    );
  }
}

const Header = () => {
  return (
    <header>
      <h1>City Search</h1>
    </header>
  )
}

const Search = (props) => {
  return (
    <div className="search">
      <h2>Enter a city:</h2>
      <input
        placeholder="City Name..."
        value={props.textValue}
        onChange={props.changeHandler}
        onKeyPress={props.keyHandler}
        onFocus={(e) => e.target.placeholder=''}
        onBlur={(e) => e.target.placeholder='City Name...'}
      />
      <button onClick={props.getZipCodes}>Submit</button>
    </div>
  )
}

const ZipcodeList = (props) => {
  const zipList = props.zips.map(zip => <li key={zip}>{zip}</li>);
  return (
    <div class="zip-list">
      <ul>
        {zipList}
      </ul>
    </div>
  )
}

export default App;