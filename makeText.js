/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const { MarkovMachine } = require('./markov');


function useFileOrUrl(arg){
    const source = process.argv[3];

    if (arg === 'file') readFile(source);
    else if (arg ==='url') readUrl(source);
    else {
        console.log('Error: Enter a valid input type, either "file" or "url".');
        process.exit(1);
    }
}

function readFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.log('Error reading', process.argv[3]);
            console.log(err);
            process.exit(1);
        }
        else callMarkovMakeText(data);
    });
}

async function readUrl(url) {
    try {
        const html = await axios.get(url);
        callMarkovMakeText(html.data);
        }
    catch(err) {
        console.log('Error fetching', process.argv[3]);
        const error = err.toJSON();
        console.log(err.stack);
        process.exit(1);
    }
}


function callMarkovMakeText(text){
    const mm = new MarkovMachine(text);
    mm.makeText();
}




useFileOrUrl(process.argv[2]);