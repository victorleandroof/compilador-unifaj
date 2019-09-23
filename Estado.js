class Estado {
    constructor(aceito, token) {
        this.aceito = aceito;
        this.token = token;
        this.transicao = new Map();
    }
    addTransicao(conjunto, estado) {
        if (conjunto.length > 1) {
            var conjuntoParaAsci = []
            conjunto.split(',').forEach((i) => {
                conjuntoParaAsci.push(i.charCodeAt());
            })
            this.transicao.set(conjuntoParaAsci.toString(), estado);
        } else {
            this.transicao.set(conjunto.toString().charCodeAt(), estado);
        }

    }
    getTransicao(caracter,caracterReal) {
        var estado = null;
        this.transicao.forEach((v, k) => {
            if (k.toString().includes(caracter)){
                if(estado == null)estado = v;
            }
        });
        return estado;
    }
    isAceito() {
        return this.aceito;
    }
}

module.exports = Estado;