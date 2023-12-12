import './bookentry.css'
import {useFormik} from 'formik';
import axios from 'axios'
export default function BookEntry(){

    const  Formik=useFormik({
        initialValues:{
            bookname:"",
            authorname:"",
            bookid:""
        },
        onSubmit:(values)=>{
            alert("new enty book successfulled");
            axios.post("http://localhost:3000/newentry",{
                bookname:values.bookname,
                authorname:values.authorname,
                bookid:values.bookid
            })
        },
        validate:(values)=>{
            let errors={};
            if(!values.bookname) errors.bookname="Required"
            if(!values.authorname) errors.authorname="Required"
            if(!values.bookid) errors.bookid="Required";
            return errors
        }
    })


    return(<>
    <div className='app'>
    <div className="insidebody">
        <h1>New Book Entry</h1>
        <form id="form" onSubmit={Formik.handleSubmit}>
            <div className='line4'>
                Book Name:<br/>
                <input type="text" className='bookid' id="bookname" onChange={Formik.handleChange} values={Formik.values.bookname} />
                {Formik.errors.bookname?<div style={{color:"red"}}>{Formik.errors.bookname}</div>:null}

            </div><div className='line4'>
                Author Name:<br/>
                <input type="text" className='bookid' id="authorname" onChange={Formik.handleChange} values={Formik.values.authorname} />
                {Formik.errors.authorname?<div style={{color:"red"}}>{Formik.errors.authorname}</div>:null}

            </div>
            <div className='line4'>
                Book id Number:<br/>
                <input type="text" className='bookid' id="bookid" onChange={Formik.handleChange} values={Formik.values.bookid} />
                {Formik.errors.bookid?<div style={{color:"red"}}>{Formik.errors.bookid}</div>:null}

            </div><br/>
       
        <button type="submit" className='submit' disabled={!Formik.isValid}>Submit</button>
        </form>
        </div>
        </div>
    </>)
}