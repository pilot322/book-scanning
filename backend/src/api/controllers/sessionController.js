const Session = require('../models/Session');

exports.createSession = async (req, res) => {
    try {
        const newSession = new Session(req.body);
        await newSession.save();
        res.status(201).send(newSession);
    } catch (error) {
        res.status(400).send(error);
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
