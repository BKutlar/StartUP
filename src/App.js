/* eslint-disable react/style-prop-object */
import logo from './logo.svg';
import './App.css';
import Filter from './component/Filter';
import NewFilter from './component/NewFilter';

function App() {
  return (
    <>
      
        <div className="colortop">
          <img src="Collecty'form.png" alt='' className="logo" />
          <h1>Club</h1>
          <img src='avatar.png' alt='' className='logos' />
        </div>
      

      {/* <Filter /> */}
      <NewFilter />
    </>
  );
}

export default App;
