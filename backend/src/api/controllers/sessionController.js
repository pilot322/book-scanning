const Session = require('../models/Session');
const User = require('../models/User');

exports.startSession = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        //console.log(req.body)
        const session = await user.startSession(req.body.book, req.body.sessionType, req.body.startPage);
        res.status(201).send(session);
    } catch (error) {
        //console.error('Failed to start session:', error);
        res.status(400).send({ error: 'Failed to start session' });
    }
};

exports.stopSession = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const session = await user.endSession(req.body.stopPage);

        res.status(201).send({ status: session.status });
    } catch (error) {
        //console.error('Failed to start session:', error);
        res.status(400).send({ error: 'Failed to start session' });
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
