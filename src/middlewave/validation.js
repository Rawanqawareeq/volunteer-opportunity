export const validation = (schema)=>{
    return (req,res,next)=>{
        let filterData = {};
        if(req.file){
            filterData = {image:req.file,...req.body,...req.params,...req.query};
        }
        else if(req.files){
            filterData = {...req.files,...req.body,...req.params,...req.query};
        }else{
            filterData = {...req.body,...req.params,...req.query};
        }
        const {error} = schema.validate(filterData,{abortEarly:false});
        const errorMessage = [];
        if(error){
            error.details.forEach(error => {
                const key = error.context.key;
                errorMessage.push({[key]:error.message});
            });
          return res.status(400).json({errors:errorMessage});
        }
        next();
    }
}