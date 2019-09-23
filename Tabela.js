const Estado = require('./Estado');
var lexema = '';

function verificaReservadas(lexema, token) {
    if (token == 'tk_IDEN') {
        switch (lexema) {
            case 'inteiro':
                return 'tk_INTEIRO';
            case 'decimal':
                return 'tk_DECIMAL';
            case 'programa':
                return 'tk_programa';
            case 'imprima':
                return 'tk_imprimir';
            case 'leia':
                return 'tk_leia';
            case 'fim_programa':
                return 'tk_fim_programa';
            case 'para':
                return 'tk_para';
            case 'de':
                return 'tk_de';
            case 'ate':
                return 'tk_ate';
            case 'passo':
                return 'tk_passo';
            case 'fim_para':
                return 'tk_fim_para';
            case 'caso':
                return 'tk_caso';
            case 'caso':
                return 'tk_fim_para';
            case 'entao':
                return 'tk_entao';
            case 'senao':
                return 'tk_senao';
            case 'fim_caso':
                return 'tk_fim_caso';
            case 'e':
                return 'tk_e';
            case 'ou':
                return 'tk_ou';
            case 'não':
                return 'tk_não';
            default:
                return token;
        }
    }
    return token;
}
class Tabela {

    constructor() {
        this.estados = new Map();
    }

    addEstado(estado, index) {
        this.estados.set(index, estado);
    }

    core(string, linha) {
        var estadoIndiceAtual = 0,
            estadoIndiceAnterior = 0,
            tamanho = string.length,
            index = 0;
        while (index < tamanho) {
            var caracter = string.charAt(index);
            estadoIndiceAtual = this.estados.get(estadoIndiceAtual).getTransicao(caracter.charCodeAt(), caracter);
            if (estadoIndiceAtual == null) {
                if (this.estados.get(estadoIndiceAnterior).isAceito()) {
                    var token = verificaReservadas(lexema, this.estados.get(estadoIndiceAnterior).token);
                    var objectCore = {
                        linha,
                        coluna: index,
                        lexema,
                        token
                    }
                    if(objectCore.token != 'espaco')
                        console.log(objectCore);
                    lexema = new String();
                    estadoIndiceAtual = 0;
                    index = index - 1;
                }
            } else {
                estadoIndiceAnterior = estadoIndiceAtual;
                lexema = lexema + caracter;
            }
            index++;
        }
        if (this.estados.get(estadoIndiceAtual).isAceito()) {
            var token = verificaReservadas(lexema, this.estados.get(estadoIndiceAnterior).token);
            var objectCore = {
                coluna: index,
                linha,
                lexema: lexema,
                token
            }
            if(objectCore.token != 'espaco')
                console.log(objectCore);
            lexema = new String();
        } else {
            return false;
        }
    }
}

module.exports = Tabela;