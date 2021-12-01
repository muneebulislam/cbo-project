const express = require('express');
const path = require('path');
require('dotenv').config();

const {
    getHash,
    compareHash
} = require('./middlewares/auth');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const users = [];
app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const hashedPassword = await getHash(password);
        const user = {
            name: name,
            password: hashedPassword
        };
        users.push(user);
        //send to database
        res.status(201).send();
    } catch (err) {
        res.status(500).send();
    }

})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name == req.body.name);
    if (user == null) {
        return res.status(400).send("User not found")
    }

    try {
        if (await compareHash(req.body.password, user.password)) {
            res.send('Login succeed!')
        } else {
            res.send('Login filed!')
        }
    } catch {
        res.status(500).send();
    }
})






app.use(express.static(path.join(__dirname, 'pages')));

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
});