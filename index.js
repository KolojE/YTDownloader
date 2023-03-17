const yargs = require("yargs");
const fs = require("fs");
const YTDownload = require("./utils/YTDownload");
const { array } = require("yargs");
const argv = yargs
    .option('input', {
        alias: '-i',
        describe: 'input file that contains a list of URL',
        type: 'string',
        demandOption: false, // make this option required
    })
    .option('output', {
        alias: 'o',
        describe: 'output directory',
        type: 'string',
        default: 10, // set a default value for this option
    }).option("format", {
        alias: 'f',
        describe: "The output format",
        type: "string",
        choices: ["mp3", "mp4"],
    })
    .help() // show help information
    .alias('help', 'h')
    .argv;

const input = argv.input;
if (input === undefined) {
    console.error("Please provide a input file wiht -i input.txt or follow by a URL !");
    process.exit(1);
}

let urls = null;

if (isYoutubeUrl(input)) {
    urls = new Array(input);
}
else if (!fs.existsSync(input) && url === null) {
    console.error(`Input file ${inputFile} does not exist`);
    process.exit(1);
}

// Check if the output directory exists, create it if it doesn't
const outputDir = argv.output;
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Convert the input file to the specified format and save it to the output directory
const outputFormat = argv.format;
if (urls === null)
    fs.readFile(input, 'utf8', (error, data) => {

        if (error) {
            console.error(error);
        } else {
            urls = data.split('/n');
            console.log(urls);
            urls.forEach((url) => {
                YTDownload.YTdownload(url, outputDir, outputFormat);
            })
        }
    });
else {
    urls.forEach((url) => {
        YTDownload.YTdownload(url, outputDir, outputFormat);
    })
}


function isYoutubeUrl(url) {
    const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    return regex.test(url);
}




