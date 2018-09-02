"use strict";

const fs = require("fs");
const path = require("path");
const bch = require("bitcoincashjs");

/**
 * Reads a JSON file as an object literal.
 * @param {string} jsonPath Input file path.
 * @returns {object|array} Object literal constructed from the file content.
 */
function readJson(jsonPath) {
    return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
}

/**
 * Writes an object literal or array as a JSON file.
 * @param {string} jsonPath Output file path.
 * @param {object|array} json Object or array to be written.
 */
function writeJson(jsonPath, json) {
    const data = JSON.stringify(json, null, 4);
    fs.writeFileSync(jsonPath, data);
}

/**
 * Prints help.
 * @param {string} scriptFileName Current script file name.
 */
function printHelp(scriptFileName) {
    const helpText = [
        "Bad usage.",
        "",
        `Usage: node ${scriptFileName} <Input File> <Output File>`,
        "  Input file is a JSON file which consists Bitcoin addresses.",
        "  Output file is a JSON file which will be generated with CashAddr format.",
        "",
        `Example: node ${scriptFileName} samples/base58_keys_valid.json cashaddr_test.json`,
        "",
        "The script was designed to handle any JSON input as long as it looks like the following format:",
        "",
        "[",
        "  [",
        '    "<Bitcoin address #1>",',
        "    ...",
        "  ],",
        "  [",
        '    "<Bitcoin address #2>",',
        "    ...",
        "  ],",
        "  ...",
        "]",
        "",
        "Input JSON file can consist extra fields. All extra fields will be preserved in the output file."
    ];

    for (const line of helpText) {
        console.log(line);
    }
}

/**
 * Tests a private key in Base58 format.
 * @param {string} s Private key in Base58 format.
 * @returns True if input is a private key, false otherwise.
 */
function isPrivateKey(s) {
    // Ensure it's 51 or 52 length long.
    return s && (s.length === 51 || s.length === 52);
}

/**
 * Main entry.
 * @param {array} args Command line arguments excluding node.
 * @returns {number} Exit code.
 */
function main(args) {
    console.log("CashAddr Test Vector Generator v1.0, (c) 2018 Osman Turan (https://osmanturan.com/)");
    console.log("Generates CashAddr (Bitcoin Cash address format) test vectors from Bitcoin addresses.");
    console.log("");

    if (args.length !== 3) {
        const scriptFileName = path.basename(args[0]);
        printHelp(scriptFileName);
        return -1;
    }

    console.log(`Reading input: ${args[1]}`);
    const json = readJson(args[1]);
    if (!Array.isArray(json)) {
        console.log("Input should be an array.");
        return -1;
    }

    console.log(`Converting ${json.length} test vectors...`);
    for (const elem of json) {
        if (!Array.isArray(elem) || elem.length !== 3) {
            console.log("Test vector should be an array with 3 elements.");
            return -1;
        }

        const base58 = elem[0];

        // Skip private keys
        if (isPrivateKey(base58)) {
            continue;
        }

        // Perform conversion and only modify Bitcoin address
        try {
            const address = new bch.Address(base58);
            elem[0] = address.toString(bch.Address.CashAddrFormat);
        } catch (e) {
            console.log(`An error has encountered while converting: ${base58}`);
            console.log(e);
        }
    }

    console.log(`Writing output: ${args[2]}`);
    writeJson(args[2], json);

    console.log("Done.");
    return 0;
}

// Isolated script entry.
(function() {
    const exitCode = main(process.argv.slice(1));
    process.exit(exitCode);
})();
