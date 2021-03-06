const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
var dir;
var destination;
async function compressimage(req, res, next) {
    if (req.files) {
        await req.files.map(file => {
            dir = file.destination + '/' + file.filename
            destination = file.destination
        })
    }
    console.log("dir", dir);
    const compress = await imagemin(['./uploaded/Sandwich/itemImage/*.jpg'], {
        destination: './uploaded/Sandwich/',
        plugins: [imageminJpegtran()]
    });
    console.log("compress", compress);
    next()
}

module.exports = compressimage