const fs = require('fs/promises')

const sacar = async (req, res) => {
    const { numero_conta, valor } = req.body
    try {
        const contas = await fs.readFile('./src/bancodedados.json')
        const contasParse = JSON.parse(contas)

        let conta = contasParse.contas.find(conta => {
            return conta.numero === numero_conta
        })

        conta.saldo -= valor
        contasParse.saque.push({
            data: new Date(),
            numero_conta,
            valor
        })

        await fs.writeFile('./src/bancodedados.json', JSON.stringify(contasParse))
        return res.status(201).json({ "Mensagem": "Saque Efetuado" });

    } catch (erro) {
        return res.status(500).json({ "error": erro.message })
    }

}

module.exports = {
    sacar
}