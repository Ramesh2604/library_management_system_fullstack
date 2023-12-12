import './bookentry.css';
import { useFormik } from 'formik';
import axios from 'axios';

export default function BookReturn() {
    const formik = useFormik({
        initialValues: {
            bookid: '',
        },
        onSubmit: async (values) => {
            console.log('Form submitted with values:', values);
            try {
                const response = await axios.post('http://localhost:3000/returnbook', {
                    bookid: values.bookid,
                });

                if (response.data.success) {
                    alert('Book returned successfully!');
                    // Handle any UI updates here upon successful return
                } else {
                    alert('Failed to return book: ' + response.data.message);
                }
            } catch (error) {
                alert('Error returning book: ' + error.message);
            }
        },
        validate: (values) => {
            let errors = {};
            if (!values.bookid) errors.bookid = 'Required';
            return errors;
        },
    });

    return (
        <>
            <div className='app'>
                <div className='insidebody'>
                    <h1>Return Book</h1>
                    <form id='form' onSubmit={formik.handleSubmit}>
                        <div className='line4'>
                            Book ID Number:<br />
                            <input
                                type='text'
                                className='bookid'
                                id='bookid'
                                onChange={formik.handleChange}
                                value={formik.values.bookid}
                            />
                            {formik.errors.bookid ? (
                                <div style={{ color: 'red' }}>{formik.errors.bookid}</div>
                            ) : null}
                        </div>
                        <br />
                        <button type='submit' className='submit' >
                            Return Book
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
