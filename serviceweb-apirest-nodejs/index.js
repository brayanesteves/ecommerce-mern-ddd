const express    = require('express');
const dbConnect  = require('./configs/dbConnect');
const app        = express();
const dotenv     = require('dotenv').config;
const PORT       = process.env.PORT || 4000;
const authRouter                 = require('./routes/authRoute');
const productRouter              = require('./routes/productRoute');
const blogRouter                 = require('./routes/blogRoute');
const categoryRouter             = require('./routes/categoryRoute');
const blogCatRouter              = require('./routes/blogCatRoute');
const brandRouter                = require('./routes/brandRoute');
const bodyParser                 = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser               = require("cookie-parser");
const morgan                     = require('morgan');

dbConnect();
/*app.use('/', (req, res) => {
    res.send("Hello from server side");
});*/
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());

app.use(        '/api/user', authRouter);
app.use(     '/api/product', productRouter);
app.use(        '/api/blog', blogRouter);
app.use(    '/api/category', categoryRouter);
app.use('/api/blogcategory', blogCatRouter);
app.use(       '/api/brand', brandRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});