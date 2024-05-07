const Session = require('../models/Session');
const User = require('../models/User');
const Book = require('../models/Book');

exports.getUserSessionData = async (req, res) => {
    try {
        const session = await Session.findById(req.user.currentSession);
        if (!session) {
            return res.status(404).send({ error: 'No active session' });
        }

        const book = await Book.findById(session.book);

        console.log('MMMM', book.sessions)
        const last_session = await Session.findById(book.sessions.slice(-2));

        const startingPage = book.sessions.length > 1
            ? last_session.stopPage + 1
            : null;
        res.send({ barcode: book.barcode, title: book.title, startingPage, scanner: session.scannerId })
    } catch (error) {
        res.status(500).send(error);
    }

}

exports.startSession = async (req, res) => {
    try {
        console.log(req.body)
        const book = await Book.findOne({ barcode: req.body.barcode });

        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }

        if (book.status === 'scanning') {
            return res.status(409).send({ error: 'Book is already being scanned' });
        }

        const session = await req.user.startSession(req.body.barcode, req.body.sessionType, req.body.scannerId);
        book.status = 'scanning';
        book.save();

        res.status(201).send(session);
    } catch (error) {
        console.error('Failed to start session:', error);
        res.status(400).send({ error: 'Failed to start session' });
    }
};

exports.stopSession = async (req, res) => {
    try {
        const startingPage = req.body.startingFrame;
        const endingPage = req.body.endingFrame;

        if (!startingPage || !endingPage) {
            return res.status(400).send({ error: 'Starting and ending page are required' });
        }

        // finish the user's session, clear it from the user
        const session = await Session.findById(req.user.currentSession);
        if (!session) {
            return res.status(404).send({ error: 'No active session to stop' });
        }
        session.startPage = Number(startingPage);
        session.stopPage = Number(endingPage);
        session.status = 'finished';
        session.endTime = new Date();

        await session.save();

        await Book.updateOne({ _id: session.book }, { status: 'finished' });

        req.user.clearSession();

        res.send('Session successfully paused');
    } catch (error) {
        console.error('Failed to pause session:', error);
        res.status(400).send({ error: `Failed to pause session: ${error}` });
    }
};

exports.pauseSession = async (req, res) => {
    try {
        const startingPage = req.body.startingFrame;
        const endingPage = req.body.endingFrame;

        if (!startingPage || !endingPage) {
            return res.status(400).send({ error: 'Starting and ending page are required' });
        }

        // finish the user's session, clear it from the user
        const session = await Session.findById(req.user.currentSession);
        if (!session) {
            return res.status(404).send({ error: 'No active session to pause' });
        }
        session.startPage = Number(startingPage);
        session.stopPage = Number(endingPage);
        session.status = 'finished';
        session.endTime = new Date();

        await session.save();

        await Book.updateOne({ _id: session.book }, { status: 'paused' });

        req.user.clearSession();

        res.send('Session successfully paused');
    } catch (error) {
        console.error('Failed to pause session:', error);
        res.status(400).send({ error: `Failed to pause session: ${error}` });
    }
};

exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find();
        res.send(sessions);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).send();
        }
        res.send(session);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!session) {
            return res.status(404).send();
        }
        res.send(session);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).send();
        }
        res.send(session);
    } catch (error) {
        res.status(500).send(error);
    }
};
