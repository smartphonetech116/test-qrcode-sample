import logo from './logo.svg';
import './App.css';
import ScannerComponent from './ScannerComponent';
import Hello from './Hello';
// import QrReader from 'react-qr-reader2'

function App() {

  const startScanner = () => {
    
  }
  const handleBarcode = data => {
    console.log(data)
  }


  return (
    <div className="App">
      <Hello />
      {/* <div>Test</div>
      <ScannerComponent
        started={startScanner}
        onResult={handleBarcode}
        showButtons={false}
      /> */}

      {/* <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
