const express = require('express');
const cors = require('cors');
const staffRoutes = require('./routes/staffRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use("/staff", staffRoutes);
app.use("/customer", customerRoutes);

app.use(express.static(__dirname + '/pages'));

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
});