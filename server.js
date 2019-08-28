const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

const scraper = require('./scraper.js');

app.get('/',(req,res)=>{
    scraper.getTorrentList('lagaan 2001')
    .then((torrents)=>{
        res.json(torrents);
    },(error)=>{
        res.status(400).json({message : error});
    });
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});