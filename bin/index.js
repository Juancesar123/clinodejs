#! /usr/bin/env node
const yargs = require('yargs')
const fs = require('fs');
const readline = require('readline');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const usage = "\nUsage: fav <path/to/file> path to be convert";
const options = yargs.usage(usage).option("t", {
    alias:"convert", 
    describe: "convert isi file menjadi json.", 
    type: "boolean", 
    demandOption: false 
}).help(true).argv;
function showHelp() {                                                            
    console.log(usage);  
    console.log('\nOptions:\r')  
    console.log('\t--version\t' + '      ' + '\t\t\t       Show version number.' + '\t\t' + '\r')  
    console.log('\t-t <type json/text>\t' + '      ' + '\t\t       convert your text to json or plain text.'  + '\r')  
    console.log('\t-t\t' + '      ' + '\t\t\t\t       convert your text to plain text.'+ '\r')  
    console.log('\t-o <path/to/dest>\t' + '      ' + 'output to path file cannot convert to json' + '\t\t' + '\r')  
    console.log('\t-t <type json/text> -o <path/to/dest>\t' + '      ' + 'output to path file and convert to json' + '\t\t' + '\r')  
    console.log('\t-h\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')  
}
if(argv.t){
    if(argv.t == 'json'){
        if(argv.t == 'json' && argv.o){
            writeToJson(argv._[0]).then(res => {
                fs.writeFile(argv.o, JSON.stringify(res), err => {
                    if (err) {
                      console.error(err);
                    }
                    console.log('writting file success')
                    // file written successfully
                 });
            })
            .catch(err => console.error(err));
        }else{
            convert(argv._[0]) .then(res => {
                console.log(res);
            })
            .catch(err => console.error(err));
        }
        // if (!fs.existsSync(argv._[0])) {
        //     console.log('asasa')
        // }else if(argv.o){
        //     console.log('weee');
        // }
        // console.log(argv);
    }else if(argv.t == 'text'){
        fs.readFile(argv._[0], 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        });
        // console.log(argv);
        // console.log('oke')
    }else{
        fs.readFile(argv._[0], 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        });
    }
}
if(argv.o && !argv.t){
    fs.readFile(argv._[0], 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        fs.writeFile(argv.o, data, err => {
            if (err) {
              console.error(err);
            }
            console.log('write file success');
            // file written successfully
         });
    });
    // showHelp();
}
if(argv.h){
    showHelp();
}
   
function writeToJson(filefrom, fileto){
    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(filefrom);
        // Handle stream error (IE: file not found)
        stream.on('error', reject);

        const reader = readline.createInterface({
            input: stream
        });

        const array = [];

        reader.on('line', line => {
            //console.log(line.length);
            var string = line.split(" ");
            if(string.length > 5){
                var newstring = " ";
                for (let index = 0; index < string.length; index++) {
                    if(index > 5){}
                    newstring += string[index] + " ";
                }
                array.push({"tanggal":string[0] + ", " + string[1], "status" : string[2] , "port":string[3] , "messages" : newstring})
            }else{
                array.push({"tanggal":string[0] + ", " + string[1], "status" : string[2] , "port":string[3] , "messages" : string[4]})
            }
        });
        reader.on('close', () => resolve(array));
    });
}
function convert(file) {
    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(file);
        // Handle stream error (IE: file not found)
        stream.on('error', reject);

        const reader = readline.createInterface({
            input: stream
        });

        const array = [];

        reader.on('line', line => {
            //console.log(line.length);
            var string = line.split(" ");
            if(string.length > 5){
                var newstring = " ";
                for (let index = 0; index < string.length; index++) {
                    if(index > 5){}
                    newstring += string[index] + " ";
                }
                array.push({"tanggal":string[0] + ", " + string[1], "status" : string[2] , "port":string[3] , "messages" : newstring})
            }else{
                array.push({"tanggal":string[0] + ", " + string[1], "status" : string[2] , "port":string[3] , "messages" : string[4]})
            }
        });
        reader.on('close', () => resolve(array));
    });
}
