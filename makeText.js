/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const { MarkovMachine } = require('./markov');


function useFileOrUrl(arg){
    const source = process.argv[3];

    if (arg === 'file') readFromFile(source);
    else if (arg ==='url') readFromUrl(source);
    else {
        // TODO error message
        // Please enter a valid input type: 'file' or 'url'.
        // quit program
    }
}

function readFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.log('Error reading', readFileOrUrl);
            console.log(err)
        }

        const text = data;
        callMarkovMakeText(text);
        // console.log(`Markov Machine Text taken from ${path}:\n`, data);
    });
}

async function readFromUrl(url) {
    console.log('hello', url);
    // try {
    //     if (!outputFile){
    //         const html = await axios.get(url);
    //         console.log(html.data);
    //     }
    //     else {
    //         const html = await axios.get(url);
    //         fs.writeFile(outputFile, html.data, 'utf8', err => {
    //             console.log(err);
    //             process.exit(1);
    //         });
    //     }
    // }
    // catch(err) {
    //     console.log('Error fetching', readFileOrUrl);
    //     console.log(err);
    // }
}


function callMarkovMakeText(text){
    const mm = new MarkovMachine(text);
    mm.makeText();
}




useFileOrUrl(process.argv[2]);