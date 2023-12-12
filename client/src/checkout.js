import React from 'react';
import './checkout.css';

export default function Checkout() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookId = document.querySelector('.bookid').value;
        const name = document.querySelector('.name').value;
        const email = document.querySelector('.email').value;
        const phoneNumber = document.querySelector('.phonenumber').value;
        const pickupDate = document.querySelector('.date').value;

        try {
            const response = await fetch('http://localhost:3000/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookid: bookId,
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    pickupDate: pickupDate,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Book checked out successfully!');
            } else {
                alert('Book not found! Please check the book ID.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error scenarios
        }
    };

    return (
        <>
            <div className='app'>
                <div className='body'>
                    <h1>Book Checkout Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='line4'>
                            <p>Book ID Number:</p><br/>
                            <input type='text' className='bookid' />
                        </div><br/>

                        {/* User details */}
                        <div className='line1'>
                            <div className='space1'>
                                Name:<br/>
                                <input type="text" className='name' />
                            </div>
                            <div className='space2'>
                                Email:<br />
                                <input type="email" className='email' placeholder="example@gmail.com" />
                            </div>
                        </div>
                        <div className='line2'>
                            <div className='space3'>
                                PhoneNumber:<br/>
                                <input type="text" className='phonenumber' placeholder="000-000-0000" />
                            </div>
                            <div className='space4'>
                                Pick up date:<br/>
                                <input type="date" className='date' />
                            </div>
                        </div>

                        <button type='submit' className='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
