import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

interface Gyumolcs{
  id: number;
  nev: string;
  darab: number;
}

interface GyomolcsResponse{
  gyumolcs: Gyumolcs[];
}

interface State{
  gyumolcs: Gyumolcs[];
  nevInput: string;
  darabInput: number;
}



class App extends Component<{}, State>{
  
  constructor(props: {}){
    super(props);

    this.state = {
      nevInput: '',
      darabInput: 0,
      gyumolcs:[]
    }
  }
    async loadGyumolcsok() {
      let response = await fetch('http://localhost:3001/GyumolcsData');
      let data = await response.json() as Gyumolcs[];
      console.log(data);
      this.setState({
        gyumolcs: data, 
      })
    }

    componentDidMount() {
      this.loadGyumolcsok();
    }

    handleUpload = async () => {
      const { nevInput, darabInput } = this.state;
      if(nevInput.trim() === '' || darabInput < 1 ){
        return;
      }

      const dbData = {
          nev: nevInput,
          darab: darabInput
      }

      let response = await fetch('http://localhost:3001/GyumolcsData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dbData),
    });

    this.setState ({
      nevInput: '',
      darabInput:0,
    });

    await this.loadGyumolcsok();
    };

    render() {
      console.log(this.state);
      const {nevInput, darabInput} = this.state;
      return <div>
        <h2>Gyümölcs felvétele:</h2>
        Név: <input type="text" value={nevInput} onChange={e => this.setState({ nevInput: e.currentTarget.value})} /> <br />
        Darab: <input type="number" value={darabInput} onChange={e => this.setState({ darabInput: parseInt(e.currentTarget.value) })}/> <br />
        <button onClick={this.handleUpload}>Hozzáaddás</button> <br />
        <h2>Már felvett gyümölcsök:</h2>
      <table>
        <td>{
            this.state.gyumolcs.map(gyumolcs => 
              <tr>{gyumolcs.nev}</tr>
            )
          }</td>
          <td>{
            this.state.gyumolcs.map(gyumolcs => 
              <tr>{gyumolcs.darab} db</tr>
            )
          }</td>
          </table>  
      </div>
  
    }
}

export default App;
