const express=require('express');
const mongoose=require('mongoose');
const  cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
const port=3000;

app.use(cors());
app.use(bodyParser.json());
/////////////connected mongodb atals //////////////
const dbURI="mongodb+srv://erameshmca40:library@cluster0.xoge9bu.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log("connected to MongoDB atlas")
    })
    .catch((err)=>{
        console.error('error connecting to mongodb',err)
    })
//////////////////////////////

///////////new book entry/////////////////

const Bookschema=new mongoose.Schema({
    bookname:String,
    authorname:String,
    bookid:Number
});

const NewEntry= mongoose.model('NewEntry',Bookschema);

app.post('/newentry', async (req,res)=>{
    const {bookname,authorname,bookid}=req.body;

    try{
        const newEntry=new NewEntry({
            bookname,
            authorname,
            bookid
        })

        await newEntry.save();
        res.json({success:true})
    }catch(err){
        res.status(500).json({success:false,error:err.message});
    }
})
//////////////////////////////////////////////

//////////////Book Details///////////////////
app.get("/bookdetails", async (req, res) => {
    try {
        const bookdetails = await NewEntry.find();
        const checkedOutBooks = await Checkout.find({}, 'bookId'); // Fetch all checked-out books

        const availableBooks = bookdetails.map(book => {
            const isBookCheckedOut = checkedOutBooks.some(checkout => checkout.bookId === book.bookid);
            return { ...book.toObject(), available: !isBookCheckedOut };
        });

        res.json(availableBooks);
    } catch (error) {
        console.log('Error fetching book details:', error);
        res.status(500).json({ success: false, error: 'Error fetching book details' });
    }
});


//////////////////////////////////////////////

// Schema and Model for book checkout details
const CheckoutSchema = new mongoose.Schema({
    bookId: Number,
    userName: String,
    userEmail: String,
    userPhoneNumber: String,
    pickupDate: Date,
});

const Checkout = mongoose.model('Checkout', CheckoutSchema);

// Checkout endpoint
app.post('/checkout', async (req, res) => {
    const { bookid, name, email, phoneNumber, pickupDate } = req.body;

    try {
        const bookDetails = await NewEntry.findOne({ bookid });

        if (bookDetails) {
            const checkoutEntry = new Checkout({
                bookId: bookid,
                userName: name,
                userEmail: email,
                userPhoneNumber: phoneNumber,
                pickupDate: pickupDate,
            });

            await checkoutEntry.save();

            res.json({ success: true });
        } else {
            // Book not found in the database
            res.status(404).json({ success: false, message: 'Book not found!' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/////////////////checkoutsheet////////////////
app.get("/checkoutsheet", async (req,res)=>{
    try{
        const cosdetails=await Checkout.find();
        res.json(cosdetails)
    }catch(error){
        console.log("fetching error",error)
    }
})

//////////////bookreturn/////////////////////////
app.post('/returnbook', async (req, res) => {
    const { bookid } = req.body;

    try {
        const checkoutEntry = await Checkout.findOneAndDelete({ bookId: bookid });

        if (checkoutEntry) {
            res.json({ success: true, message: 'Book returned successfully!' });
        } else {
            res.status(404).json({ success: false, message: 'Book not found in checkout!' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})