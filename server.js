const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

const scraper = require('./scraper.js');

app.get('/:title',(req,res)=>{
    scraper.getTorrentList(req.params.title)
    .then((torrents)=>{
        res.json(torrents);
    },(error)=>{
        res.status(400).json({message : error});
    });
});

app.get('/getTorrent/:id',(req,res)=>{
    scraper.getTorrentDetails(req.params.id)
    .then((torrent)=>{
        res.json(torrent);
    },(error)=>{
        res.status(400).json({message : error});
    });
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});