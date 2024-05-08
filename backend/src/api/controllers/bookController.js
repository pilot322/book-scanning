const Book = require('../models/Book');
const User = require('../models/User');
const ActionLog = require('../models/ActionLog');
const Session = require('../models/Session');

exports.receiveBatches = async (req, res) => {
    // req.body is an array of objects with the following structure:
    // {title: string, barcode: string}

    console.log('Attempting to receive books:', req.body, 'from', req.username);

    const reqbooks = req.body.books;

    const user = await User.findByUsername(req.username);
    const userid = user._id;
    console.log(userid)

    if (!Array.isArray(reqbooks) || reqbooks.length === 0) {
        console.error('Failed to receive books: Invalid request body');
        return res.status(400).send({ error: 'Invalid request body' });
    };

    try {
        const books = reqbooks.map(book => ({
            title: book.title,
            barcode: book.barcode,
            receiver: userid,
            receivedDate: new Date(),  // Explicitly set the received date to now
            status: 'received'  // Ensure status is set to 'received' when created
        }));

        const newBooks = await Book.insertMany(books);
        console.log('New books created successfully:', newBooks);

        res.status(201).send(newBooks);

    }
    catch (error) {
        console.error('Error receiving books:', error);
        if (error.code === 11000) {
            console.error('Duplicate barcode error:', error.message);
            return res.status(409).send({ error: 'Barcode must be unique' });
        }
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


exports.createBook = async (req, res) => {
    const { title, barcode } = req.body;
    // console.log('Attempting to create a new book with title:', title, 'and barcode:', barcode, 'from', req.user.userId);

    if (!title || !barcode) {
        // console.error('Failed to create book: Missing required fields');
        return res.status(400).send({ error: 'Missing required fields' });
    }


    try {
        const newBook = new Book({
            title,
            barcode,
            receiver: req.user.userId,
            receivedDate: new Date(),  // Explicitly set the received date to now
            status: 'received'  // Ensure status is set to 'received' when created
        });

        await newBook.save();
        //  console.log('New book created successfully:', newBook);

        await ActionLog.createAction({
            user: req.user.userId,
            actionType: 'RECEIVE_BOOK',
            description: `Book created with ID: ${newBook._id}`,
            onModel: 'Book',
            target: newBook._id
        });
        // console.log('Logged action for new book creation.');

        res.status(201).send(newBook);
    } catch (error) {
        // console.error('Error creating book:', error);
        if (error.code === 11000) {
            //  console.error('Duplicate barcode error:', error.message);
            return res.status(409).send({ error: 'Barcode must be unique' });
        }
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.filterBooks = async (req, res) => {
    try {
        console.log('filter', req.body)
        const { date, isReceived, isScanning, isPaused, isFinished } = req.body;
        let query = {};

        // Add date filtering if date is provided
        // if (date) {
        //     query.receivedDate = { $gte: date }; // $gte is "greater than or equal to"
        // }

        // Add status filtering based on flags
        let statusConditions = [];
        if (isReceived) statusConditions.push('received');
        if (isScanning) statusConditions.push('scanning');
        if (isPaused) statusConditions.push('paused');
        if (isFinished) statusConditions.push('finished');

        if (statusConditions.length > 0) {
            query.status = { $in: statusConditions }; // $in selects the documents where the value of a field equals any value in the specified array
        }


        const books = query.status ? await Book.find(query) : null;
        res.send(books);
    } catch (error) {
        console.error("Failed to filter books:", error);
        res.status(500).send({ message: "Internal server error", error });
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = await Book.findOne({ barcode: req.params.barcode });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        const bookdata = { barcode: book.barcode, title: book.title, status: book.status, receivedDate: book.receivedDate };
        const receiver = await User.findById(book.receiver);
        bookdata.receiver = receiver.username;
        const sessions = [];

        console.log(book.sessions);
        for (let i = 0; i < book.sessions.length; i++) {
            const session = book.sessions[i];
            const sessiondata = {};
            const sessionobj = await Session.findById(session);

            sessiondata.sessionType = sessionobj?.sessionType;
            sessiondata.status = sessionobj?.status;
            sessiondata.scannerId = sessionobj?.scannerId;
            sessiondata.startTime = sessionobj?.startTime;
            sessiondata.endTime = sessionobj?.endTime;
            sessiondata.startPage = sessionobj?.startPage;
            sessiondata.stopPage = sessionobj?.stopPage;

            const user = await User.findById(sessionobj.user);
            sessiondata.username = user.username;
            sessions.push(sessiondata);
        }

        console.log('bitchass', sessions)
        bookdata.sessionData = sessions;
        res.send(bookdata);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate({ barcode: req.params.barcode }, req.body, { new: true, runValidators: true });
        await ActionLog.createAction({
            user: req.user.userId,
            actionType: 'UPDATE_BOOK',
            description: `Book updated. Changed: ${req.body}`,
            onModel: 'Book',
            target: book._id
        });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        // console.log('trying to delete the book')
        // console.log(req.params.barcode)
        const book = await Book.deleteOne({ barcode: req.params.barcode })
        //console.log('delete: ', book)
        if (!book || book.deletedCount === 0) {
            return res.status(404).send('Book not found');
        }
        res.send({ message: 'Book deleted successfully' });
    } catch (error) {

        res.status(500).send(error);
    }
};
