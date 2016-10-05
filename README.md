# Dúvidas LAIG: #

* <?xml version="1.0" encoding="UTF-16" standalone="yes"?> (colocar no inicio do dsx?)

* transformações : usar já o mat4 ou depois fazer conversão do que tenho para mat4 ?

* o que é entendido por descrição na avaliação do trabalho

* é preciso fazer documentacao dos sets e gets?

* 'se varias vistas declaradas, o default e' a primeira vista;' -> só se o default for null ou mesmo escolhendo um default?

* devo fazer uma função para saber se as coisas que metemos são do tipo certo? (int não string, p.e.)

* verificar se tt é 0 ou 1 ?

* verificar se rgb está entre 0 e 1?

* w nas lights (o que significa)


# TODO list #

* nao esquecer aquelas coisas default e teclas para mudar

* vários componentes para experimentar os filhos

* M=Ma*Mp -> aplicar aos filhos!

* devem ser definidos valores de "default" para o nó raiz (propriedades de aspeto)

* valores por omissão (defaults) que a aplicação deve inicializar !!

* WARNINGS com possibilidade de terminar o programa?

# atenção: #

* não faz sentido n classe MyTranformation o multiply ser entre duas matrizes que nada teem a haver com o objecto da classe
  *ex tempT = tempT.multiply(tempT,tempT2) em parseComponents

* o comprimento e a largura de cada textura devem ser potências de 2).

* melhorar tratamento de erros do bloco das componentes

* O trabalho deve ser desenvolvido de forma incremental:
	* Versão inicial do parser, estrutura interna de dados e rotinas de visualização que permitam ler, armazenar e visualizar primitivas e transformações simples, (ignorando inicialmente luzes, materiais e texturas.)
       * Versão progressivamente estendida do parser, estrutura e visualizador com as restantes funcionalidades

* Verificar se a ordem pela qual as matrizes sao multiplicadas estão corretas (parseTransformations e parseComponents)

* Tentar detectar ciclos nos childrens dos components