const http = require('http');
const web3 = require('web3')
const hostname = '127.0.0.1';
const port = 3000;

const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "locks",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "get",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "v",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const Web3 = new web3(
    new web3.providers.HttpProvider('https://bsc-dataseed1.ninicoin.io')
)


const SC = new Web3.eth.Contract(abi, '0x308F0D9ADBB007f91c222000BC5d8BBc62F946ca')

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var v = await SC.methods.get('0x06597FFaFD82E66ECeD9209d539032571ABD50d9', [
        '0x5AF5f337a2c695B27C2ED5B9F26eBfF68c2Ef836',
        '0x85FA84D5451f38eEd738305e91D34479C7A245B8',
        '0x275CFABf5C09B4CBE033916087c0b9365cAd6883',
        '0x58B5f1EDb7200F84f8678AAf0e39a076E9271D01',
        '0xA48558DA35dFEd41363B5895a9700e4c6d11D375'
    ], []).call()

    res.end(new BN(v.toString()).div(10 ** 18).toString());

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://:/`);
});