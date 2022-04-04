const fsp = require('fs').promises;
const randomstring = require('random-string-generator');

class RandomObjectGenerator {
    constructor() {
        this.intCount = 0; 
        this.stringCount = 0; 
        this.alphaNumCount = 0; 
        this.realNumCount = 0; 
    }
    generateObjects( ) {
        const twoMBtoBytes = 2*1024*1024;
        const targetMethod = { realNumber : 0, integer : 1, string : 2, alphaNumeric : 3};
        let randomObjects = '', currentObject = '', totalBytes = 0;
        let addComma = false ;
        while(totalBytes <= twoMBtoBytes) {
            let randomNum = Math.floor(Math.random() * 10);
            const remainder = randomNum % 4;
            if(remainder === targetMethod.realNumber) {
                currentObject = this.generateRealNumber();
            } else if(remainder === targetMethod.integer) {
                currentObject = this.generateInteger();
            } else if(remainder === targetMethod.string) {
                currentObject = this.generateString();
            } else if (remainder === targetMethod.alphaNumeric) {
                currentObject = this.generateAlphaNumeric();
            }
            const totalBytes = randomObjects.length + currentObject.length + 1;
            if(totalBytes > twoMBtoBytes) {
                break;
            }
            if(addComma) randomObjects += ',';
            addComma = true;
            randomObjects += currentObject;
            this.incrementCount(remainder, targetMethod)
        }
        fsp.writeFile('./public/randomObjects.txt', randomObjects);
        return JSON.stringify({
            realnum : this.realNumCount,
            int : this.intCount,
            string : this.stringCount,
            alphanum : this.alphaNumCount,
        });
    }
    incrementCount(remainder, targetMethod) {
        remainder == targetMethod.realNumber && this.realNumCount++;
        remainder == targetMethod.integer && this.intCount++;
        remainder == targetMethod.string && this.stringCount++;
        remainder == targetMethod.alphaNumeric && this.alphaNumCount++;
    }
    generateRealNumber() {
        const maxNum = 2000000000;
        return (Math.random()*maxNum).toString();
    }
    generateInteger() {
        return randomstring('numeric');
    }
    generateString() {
        return randomstring('lower');
    }
    generateAlphaNumeric() {
        return randomstring('lowernumeric');
    }
}

module.exports.RandomObjectGenerator = RandomObjectGenerator;