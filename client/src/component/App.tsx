import * as Raven from 'raven-js';
import * as React from 'react';
import { connect } from 'react-redux';
import '../css/App.css';
// import logo from '../images/logo.svg';
import DisplayTable from './DisplayTable';
import Search from './Search';

interface OwnState {
  searchText: string;
}

class App extends React.Component<{}, OwnState> {
  constructor(props: any) {
    super(props);

    this.state = {
       searchText: null,
    };
  }

  public componentDidCatch(error: any, errorInfo: any) {
    // this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
  }
  
  public render() {
    const { searchText } = this.state;
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
          
        </p> */}
        <Search searchText={searchText} onClick={this.setSearchText}/>
        <DisplayTable searchText={searchText}/>
      </div>
    );
  }

  private setSearchText = (searchText: string):any => {
    this.setState({
      searchText
    });
  }

}

const mapStateToProps = (state: any) => {
  return {
    ...state,
  }
}

// export default App;
export default connect(mapStateToProps, null)(App);