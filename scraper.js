const request = require('request');
const cheerio = require('cheerio');

const proxyUrl = 'https://piratebay-proxylist.se/';

var torrentSearchUrl = '';
var quaryUrl = '';

module.exports.getTorrentList = (title)=>{
    return new Promise((resolve,reject)=>{
        getLatestAddress()
        .then((baseUrl)=>{
            quaryUrl = `https://${baseUrl}/s/?q=${title}&page=0&orderby=99`;
            request(quaryUrl,(error,response,html)=>{
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    var torrentArray = [];
                    $('#searchResult tbody tr').each(function(i, element) {
                        var children = $(element).children();
                        const torrentDetails = {
                            title : $(element).find('td div.detName a').text(),
                            details : $(element).find('td font.detDesc').text(),
                            seeders : $(children[2]).text(),
                            leechers : $(children[3]).text(),
                            torrentID : $(element).find('td div.detName a').attr('href').match(/torrent\/(.*)\//)[1]
                        }
                        torrentArray.push(torrentDetails);
                    });
                    resolve(torrentArray);
                }
                else{
                    reject('error occured');
                }
            });
        },(error)=>{
            console.log(erroe);
            reject('error occured');
        });
    });
}

module.exports.getTorrentDetails = (torrentID)=>{
    return new Promise((resolve,reject)=>{
        getLatestAddress()
        .then((baseUrl)=>{
            torrentSearchUrl = `https://${baseUrl}/torrent`;
            request(`${torrentSearchUrl}/${torrentID}`,(error,response,html)=>{
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const torrent = {
                        magnetLink : $('.download a').attr('href')
                    }
                    resolve(torrent);
                }
                else{
                    reject('error occured');
                }
            });
        });
    });
}

getLatestAddress = ()=>{
    return new Promise((resolve,reject)=>{
        request(`${proxyUrl}`,(error,response,html)=>{
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                var baseUrlArray = [];
                $('.proxies tbody tr').each(function(i, element) {
                    const baseUrl = $(element).find('td.url div.url-inner span.domain').text();
                    baseUrlArray.push(baseUrl);
                });
                resolve(baseUrlArray[0]);
            }
            else{
                reject('error occured');
            }
        });
    });
}