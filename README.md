# CashAddr Test Vector Generator

Node.js script to generate CashAddr (Bitcoin Cash address format) test vectors from Bitcoin addresses.

## Dependencies
- [Node.js](https://nodejs.org/)
- [BitcoinCash.js](https://github.com/bitcoincashjs/bitcoincashjs)

## Usage
Clone the repository with following:

```
$ git clone https://github.com/osman-turan/CashAddr-Test-Vector-Generator.git
```

Ensure all required NPM packages are installed by running following:

```
$ npm run install
```

To generate test vectors run the following:

```
$ node index.js <Input Path> <Output Path>
```

`Input Path` is path of JSON file which consists Bitcoin addresses. Its expected format is described below.

`Output Path` is path of JSON file which will be generated with CashAddr addresses.

### Input Format
The script was designed to handle any JSON input as long as it looks like the following format:

```
[
    [
        "<Bitcoin address #1>",
        ...
    ],
    [
        "<Bitcoin address #2>",
        ...
    ],
    ...
]
```
Input JSON file can consist extra fields. All extra fields will be preserved in the output file. For example, following is a valid JSON file for the script:

```
[
    [
        "1AGNa15ZQXAZUgFiqJ2i7Z2DPU2J6hW62i", 
        "65a16059864a2fdbc7c99a4723a8395bc6f188eb", 
        {
            "addrType": "pubkey", 
            "isPrivkey": false, 
            "isTestnet": false
        }
    ], 
    [
        "3CMNFxN1oHBc4R1EpboAL5yzHGgE611Xou", 
        "74f209f6ea907e2ea48f74fae05782ae8a665257", 
        {
            "addrType": "script", 
            "isPrivkey": false, 
            "isTestnet": false
        }
    ]
]
```

You can find a sample JSON files with Bitcoin addresses in `samples` directory.

### Example Usage

```
$ node index.js samples/base58_keys_valid.json cashaddr_test.json
```

## Contributing
If you have encountered any bugs or have an idea, please create a new issue in GitHub. Please ensure there isn't same issue which was already created.

## Authors
- [Osman Turan](https://osmanturan.com/)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.