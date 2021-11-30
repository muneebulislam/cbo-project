const express= require('express');

const app = express();
const PORT = process.env.PORT||8080;
app.use(express.json());
app.use(express.urlencoded({ extended:false}));








app.use(express.static(path.join(__dirname, 'pages')));
app.listen(PORT, () => console.log(`app is running on port: ${PORT}`));