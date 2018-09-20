
const 
    clients = require('./controller/apiClients');
    express = require('express'),
    exphps = require('express-handlebars');
    path = require('path');

const app = express();

app.engine('handlebars',exphps({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.static(path.join(__dirname, 'public')));

clients(app);

const PORT = 9001;
app.listen(PORT,()=>{
    console.log(`Server listen at door:${PORT}`);
});