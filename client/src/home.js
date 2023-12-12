import logoimg from './images/logo.png'
import './App.css';
import { FileEarmarkCheck ,Grid3x3,Stack,DatabaseFillAdd,DatabaseFillCheck} from 'react-bootstrap-icons';


function Home() {
  return (
    <div className="App">
      <img src={logoimg} />
      <h1>Book Byte library</h1>
      <div className='bodybox'>
      <div className='headbox1'>
      <a href='#/checkout' className='box1' style={{textDecoration:"none",color:"black"}}>
        <FileEarmarkCheck color='white' size={30} />
        <h2>Check Out Book</h2>
      </a>
      <a href='#/checkoutsheet' className='box2' style={{textDecoration:"none",color:"black"}}>
        <Grid3x3 color='white' size={30} />
        <h2>Checkout Sheet</h2>
        </a>
      </div>
      <div className='headbox2'>
      <a href='#/bookdetails' className='box1' style={{textDecoration:"none",color:"black"}}>
        <Stack color='white' size={30} />
        <h2>Book Details</h2>
      </a>
      <a href='#/bookreturn' className='box2' style={{textDecoration:"none",color:"black"}}>
        <DatabaseFillCheck color='white' size={30} />
        <h2>Book Return</h2>
        </a>
      </div>
      <div className='headbox3'>
      <a href='#/bookentry' className='box4' style={{textDecoration:"none",color:"black"}}>
        <DatabaseFillAdd color='white' size={30} />
        <h2>New Book Entry</h2>
        </a>
      </div>
      </div>
    </div>
  );
}

export default Home;
