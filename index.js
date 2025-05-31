import  express from 'express';
import initApp from './src/app.router.js';
const app = express();
initApp(app,express);
const PORT =   4000; 
app.listen(PORT, (error) => {
    console.log(`servier is running ... ${PORT}`); 
});