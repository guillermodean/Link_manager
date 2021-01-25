const express =require('express');
const links = require('../models/links');
const router = express.Router();
const Link = require('../models/links');

router.get('/',async (req,res)=>{
    const links = await Link.find();
    console.log(links);
    res.json(links);

});
router.get('/:id',async (req,res)=>{
    const link=await Link.findById(req.params.id);
    res.json(link)
})
router.post('/',async (req,res)=>{
    const{title,description,category,url,count}=(req.body);
    const link = new Link({
        title:title,
        description:description,
        category:category,
        url:url,
        count:count
    })
    await link.save();
    res.json({status:'tarea guradada'});
})

router.put('/:id',async  (req,res)=>{
    const {title,description,category,url,count} =req.body;
    const newLink= {title,description,category,url,count};
    await Link.findByIdAndUpdate(req.params.id,newLink);
    res.json({status:"tarea actualizada"});
})

router.delete('/:id', async (req,res)=>{
    await Link.findByIdAndDelete(req.params.id);
    res.json({status:"tarea eliminada"});
})
module.exports = router;