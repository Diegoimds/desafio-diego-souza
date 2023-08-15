import { cardapio } from "./cardapio";

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!itens || itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        };

        let comanda = [];
        let total = 0;

        for (const item of itens) {
            const itemQuantidade = item.split(',');
            const produtoPedido = itemQuantidade[0];
            const quantidade = Number(itemQuantidade[1]);

            const produtoExistente = cardapio.find(element => element.codigo === produtoPedido);

            if (!produtoExistente) {
                return 'Item inválido!';
            }

            if (!quantidade || quantidade === 0) {
                return 'Quantidade inválida!'
            };

            let queijoExtra = true;
            let chantilyExtra = true;

            switch (produtoPedido) {
                case 'queijo':
                    const pedidoQueijo = comanda.find(element => element === 'sanduiche');

                    if (!pedidoQueijo) {
                        return 'Item extra não pode ser pedido sem o principal';
                    }

                case 'chantily':
                    const pedidoChantily = comanda.find(element => element === 'cafe');

                    if (!pedidoChantily) {
                        return 'Item extra não pode ser pedido sem o principal';
                    }
            }

            comanda.push(produtoPedido);

            const pedido = quantidade * produtoExistente.valor;

            total += pedido
        };

        switch (metodoDePagamento) {
            case 'dinheiro':
                const valorComDesconto = (total * 0.95) / 100;
                return `R$ ${valorComDesconto.toFixed(2).replace(/\./g, ',')}`
            case 'credito':
                const totalComAcrescimo = (total + (total * 0.03)) / 100;
                return `R$ ${totalComAcrescimo.toFixed(2).replace(/\./g, ',')}`
            case 'debito':
                const totalDebito = (total) / 100
                return `R$ ${totalDebito.toFixed(2).replace(/\./g, ',')}`;
            default:
                return "Forma de pagamento inválida!";
        }
    }
}

export { CaixaDaLanchonete };
