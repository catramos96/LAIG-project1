# Dúvidas LAIG: #

* <?xml version="1.0" encoding="UTF-16" standalone="yes"?> (colocar no inicio do dsx?)

* 'se varias vistas declaradas, o default e' a primeira vista;' -> só se o default for null ou mesmo escolhendo um default?


# TODO list #

* fazer triangulo e retangulo com tilling

* tranformações: procurar o que está mal (ver a ordem das multiplicações)

* verificar se não há ciclos

* valores inicializados na app (faltam 3)

* nao esquecer aquelas coisas default e teclas para mudar (interface)

* vários componentes para experimentar os filhos!

* devem ser definidos valores de "default" para o nó raiz (propriedades de aspeto) no dsx

# atenção: #

* camara -> this.interface.enableCamera(true)

* não faz sentido n classe MyTranformation o multiply ser entre duas matrizes que nada teem a haver com o objecto da classe
  *ex tempT = tempT.multiply(tempT,tempT2) em parseComponents

* o comprimento e a largura de cada textura devem ser potências de 2).

* melhorar tratamento de erros do bloco das componentes
