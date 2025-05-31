import cors  from 'cors'
import connectDB from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js';
import organizationRouter from './modules/organization/organization.router.js';
import activityRouter from './modules/activity/activity.router.js';
import applicationRouter from './modules/application/application.router.js';
const initApp = async(app,express)=>{
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.status(200).json({massege:"welcome"})
    });
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use('/organization',organizationRouter);
    app.use('/activity',activityRouter);
    app.use('/application',applicationRouter);
    app.use('*',(req,res)=>{
        return res.status(404).json({massege:"Page not found"})
    });
}
export default initApp;