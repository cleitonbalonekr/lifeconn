/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import {
  IMG1,
  IMG2,
  IMG3,
  IMG4,
  IMG5,
  IMG6,
  IMG7
} from '@/presentation/shared/assets/imgFirstAid/index';

const Cap1: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('mt-8 justify-center')}>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        Etapas Básicas de Primeiros Socorros
      </Text>
      <Text style={tailwind('font-bold mt-2')}>
        1. Avaliação do Local do Acidente
      </Text>
      <Text style={tailwind('text-justify')}>
        Esta é a primeira etapa básica na prestação de primeiros socorros. Ao
        chegar no local de um acidente, ou onde se encontra um acidentado,
        deve-se assumir o controle da situação e proceder a uma rápida e segura
        avaliação da ocorrência. Deve-se tentar obter o máximo de informações
        possíveis sobre o ocorrido. Dependendo das circunstâncias de cada
        acidente, é importante também: a - evitar o pânico e procurar a
        colaboração de outras pessoas, dando ordens breves, claras, objetivas e
        concisas; b - manter afastados os curiosos, para evitar confusão e para
        ter espaço em que se possa trabalhar da melhor maneira possível.
      </Text>
      <Text style={tailwind('font-bold mt-2')}>2. Proteção do Acidentado</Text>
      <Text style={tailwind('text-justify')}>
        Avaliação e Exame do Estado Geral do acidentado A avaliação e exame do
        estado geral de um acidentado de emergência clínica ou traumática é a
        segunda etapa básica na prestação dos primeiros socorros. Ela deve ser
        realizada simultaneamente ou imediatamente à "avaliação do acidente e
        proteção do acidentado". O exame deve ser rápido e sistemático,
        observando as seguintes prioridades: ·Estado de consciência: avaliação
        de respostas lógicas (nome, idade, etc). ·Respiração: movimentos
        torácicos e abdominais com entrada e saída de ar normalmente pelas
        narinas ou boca. ·Hemorragia: avaliar a quantidade, o volume e a
        qualidade do sangue que se perde. Se é arterial ou venoso. ·Pupilas:
        verificar o estado de dilatação e simetria (igualdade entre as pupilas).
        ·Temperatura do corpo: observação e sensação de tato na face e
        extremidades. Deve-se ter sempre uma idéia bem clara do que se vai
        fazer, para não expor desnecessariamente o acidentado, verificando se há
        ferimento com o cuidado de não movimentá-lo excessivamente. Em seguida
        proceder a um exame rápido das diversas partes do corpo. Se o acidentado
        está consciente, perguntar por áreas dolorosas no corpo e incapacidade
        funcionais de mobilização. Pedir para apontar onde é a dor, pedir para
        movimentar as mãos, braços, etc. Cabeça e Pescoço Sempre verificando o
        estado de consciência e a respiração do acidentado, apalpar, com
        cuidado, o crânio a procura de fratura, hemorragia ou depressão óssea.
        Proceder da mesma forma para o pescoço, procurando verificar o pulso na
        artéria carótida, observando freqüência, ritmo e amplitude, correr os
        dedos pela coluna cervical, desde a base do crânio até os ombros,
        procurando alguma irregularidade. Solicitar que o acidentado movimente
        lentamente o pescoço, verificar se há dor nessa região. Movimentar lenta
        e suavemente o pescoço, movendo-o de um lado para o outro. Em caso de
        dor pare qualquer mobilização desnecessária. Perguntar a natureza do
        acidente, sobre a sensibilidade e a capacidade de movimentação dos
        membros visando confirmar suspeita de fratura na coluna cervical. Coluna
        Dorsal Perguntar ao acidentado se sente dor. Na coluna dorsal correr a
        mão pela espinha do acidentado desde a nuca até o sacro. A presença de
        dor pode indicar lesão da coluna dorsal. Tórax e Membros Verificar se há
        lesão no tórax, se há dor quando respira ou se há dor quando o tórax é
        levemente comprimido. Solicitar ao acidentado que movimente de leve os
        braços e verificar a existência de dor ou incapacidade funcional.
        Localizar o local da dor e procurar deformação, edema e marcas de
        injeções. Verificar se há dor no abdome e procurar todo tipo de
        ferimento, mesmo pequeno. Muitas vezes um ferimento de bala é pequeno,
        não sangra e é profundo, com conseqüências graves. Apertar
        cuidadosamente ambos os lados da bacia para verificar se há lesões.
        Solicitar à vítima que tente mover as pernas e verificar se há dor ou
        incapacidade funcional. Não permitir que o acidentado de choque elétrico
        ou traumatismo violento tente levantar-se prontamente, achando que nada
        sofreu. Ele deve ser mantido imóvel, pelo menos para um rápido exame nas
        áreas que sofreram alguma lesão. O acidentado deve ficar deitado de
        costas ou na posição que mais conforto lhe ofereça. Exame do acidentado
        Inconsciente O acidentado inconsciente é uma preocupação, pois além de
        se ter poucas informações sobre o seu estado podem surgir, complicações
        devido à inconsciência. O primeiro cuidado é manter as vias
        respiratórias superiores desimpedidas fazendo a extensão da cabeça, ou
        mantê-la em posição lat- eral para evitar aspiração de vômito. Limpar a
        cavidade bucal. O exame do acidentado inconsciente deve ser igual ao do
        acidentado consciente, só que com cuidados redobrados, pois os
        parâmetros de força e capacidade funcional não poderão ser verificados.
        O mesmo ocorrendo com respostas a estímulos dolorosos. É importante ter
        ciência que nos primeiros cuidados ao acidentado inconsciente a deverá
        ser mínima. A observação das seguintes alterações deve ter prioridade
        acima de qualquer outra iniciativa. Ela pode salvar uma vida: · Falta de
        respiração; · Falta de circulação (pulso ausente); · Hemorragia
        abundante; · Perda dos sentidos (ausência de consciência); ·
        Envenenamento. Observações: 1.Para que haja vida é necessário um fluxo
        contínuo de oxigênio para os pulmões. O oxigênio é distribuído para
        todas as células do corpo através do sangue impulsionado pelo coração.
        Alguns órgãos sobrevivem algum tempo sem oxigênio, outros são
        severamente afetados. As células nervosas do cérebro podem morrer após 3
        minutos sem oxigênio. 2.Por isso mesmo é muito importante que algumas
        alterações ou alguns quadros clínicos, que podem levar a essas
        alterações, devem ter prioridade quando se aborda um acidentado de
        vítima de mal súbito. São elas: ­ obstrução das vias aéreas superiores;
        ­ parada cárdio-respiratória; ­ hemorragia de grandes volumes; ­ estado
        de choque (pressão arterial, etc); ­ comas (perda da consciência); ­
        convulsões (agitações psicomotoras); ­ envenenamento (intoxicações
        exógenas); ­ diabetes mellitus (comas hiper e hipoglicêmicos); ­ infarto
        do miocárdio; e ­ queimaduras em grandes áreas do corpo. 3.Toda lesão ou
        emergência clínica ocorrida dentro do âmbito da Instituição deve ser
        comunicada ao NUST - Núcleo de Saúde do trabalhador / DIREH, através de
        uma ficha de registro específica e anotada no "livro de registro de
        acidentes". 4.É importante ter sempre disponível os números dos
        telefones e os endereços de hospitais e de centros de atendimento de
        emergência; socorro especializado para emergências cardíacas; plantão da
        Comissão Nacional de Energia Nuclear; locais de aplicação de soros
        antiveneno de cobra e de outros animais peçonhentos e centro de
        informações tóxico- farmacológicas.
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        Funções, Sinais Vitais e de Apoio
      </Text>
      <Text style={tailwind('font-bold mt-2')}>Funções Vitais</Text>
      <Text style={tailwind('text-justify')}>
        Algumas funções são vitais para que o ser humano permaneça vivo. São
        vitais as funções exercidas pelo cérebro e pelo coração. Mas para
        exercerem suas funções, estes órgãos executam trabalhos físicos e
        químicos, transformando a própria vida em uma macro-representação das
        atividades da menor unidade funcional do corpo: a célula. Cada tecido é
        constituído por células, e é da vida delas que depende a vida dos seres
        vivos. As células tiram nutrientes para sua vida diretamente do meio
        onde se encontram, devolvendo para este mesmo ambiente os produtos
        finais de sua atividade metabólica. A captação e liberação destas
        substâncias são reguladas pela membrana plasmática, cuja permeabilidade
        seletiva e mecanismo de transporte ativo permitem à célula trocar com o
        meio somente o que deve ser trocado. Muitos processos dependem de um
        adequado diferencial de concentração entre o interior e exterior da
        célula. Para permitir igualdade nas concentrações dos componentes do
        líquido intersticial, os tecidos do organismo são percorridos por uma
        densa rede de vasos microscópicos, que são chamados de capilares. O
        sangue que chega aos capilares traz nutrientes e oxigênio que são
        passados continuamente para os tecidos. O sangue arterial é rico em
        nutrientes. O sangue venoso é mais pobre e transporta gás carbônico e
        catabólitos. O sangue não se deteriora graças à atividade de órgãos
        vitais como os pulmões, rins e aparelho digestivo, que permanentemente
        recondicionam o sangue arterial. Os rins participam do mecanismo de
        regulação do equilíbrio hidroeletrolítico e ácido-básico e na eliminação
        de substâncias tóxicas. O aparelho digestivo incrementa o teor sanguíneo
        de substratos orgânicos, íons e outros agentes metabólicos, como as
        vitaminas, por exemplo. O fígado age como órgão sintetizador e como
        modificador da composição do sangue, participando nos mecanismos da
        excreção de substâncias tóxicas. Os pulmões e a porção condutora do
        aparelho respiratório têm como função principal fornecer oxigênio e
        remover dióxido de carbono resultante da reação de combustão nas
        células. O pulmão não é apenas um órgão respiratório. Ele desempenha uma
        função importante no equilíbrio térmico e no equilíbrio ácido-básico. Os
        movimentos ventilatórios são controlados pelo Sistema Nervoso Central e
        estão parcialmente sob nossa vontade. A respiração, no entanto, é um
        mecanismo involuntário e automático. As funções vitais do corpo humano
        são controladas pelo Sistema Nervoso Central, que é estruturado por
        células muito especializadas, organizadas em alto grau de complexidade
        estrutural e funcional. Estas células são muito sensíveis à falta de
        oxigênio, cuja ausência provoca alterações funcionais. Conforme será
        advertido outras vezes neste manual, chamamos a atenção para que se
        perceba que: Para poder determinar em nível de primeiro socorro, como
        leigo, o funcionamento satisfatório dos controles centrais dos
        mecanismos da vida, é necessário compreender os sinais indicadores
        chamados de sinais vitais.
      </Text>
      <Text style={tailwind('font-bold mt-2')}>Sinais Vitais</Text>
      <Text style={tailwind('text-justify')}>
        Sinais vitais são aqueles que indicam a existência de vida. São reflexos
        ou indícios que permitem concluir sobre o estado geral de uma pessoa. Os
        sinais sobre o funcionamento do corpo humano que devem ser compreendidos
        e conhecidos são: · Temperatura, · Pulso, · Respiração, · Pressão
        arterial. Os sinais vitais são sinais que podem ser facilmente
        percebidos, deduzindo-se assim, que na ausência deles, existem
        alterações nas funções vitais do corpo.
      </Text>
      <Text style={tailwind('mt-2 underline')}>Temperatura Corporal</Text>
      <Text style={tailwind('text-justify')}>
        A temperatura resulta do equilíbrio térmico mantido entre o ganho e a
        perda de calor pelo organismo. A temperatura é um importante indicador
        da atividade metabólica, já que o calor obtido nas reações metabólicas
        se propaga pelos tecidos e pelo sangue circulante. A temperatura do
        corpo humano está sujeita a variações individuais e a flutuações devido
        a fatores fisiológicos como: exercícios, digestão, temperatura ambiente
        e estado emocional (Quadro I). A avaliação diária da temperatura de uma
        pessoa em perfeito estado de saúde nunca é maior que um grau Celsius,
        sendo mais baixa pela manhã e um pouco elevada no final da tarde. Existe
        pequena elevação de temperatura nas mulheres após a ovulação, no período
        menstrual e no primeiro trimestre da gravidez. Nosso corpo tem uma
        temperatura média normal que varia de 35,9 a 37,2ºC. A avaliação da
        temperatura é uma das maneiras de identificar o estado de uma pessoa,
        pois em algumas emergências a temperatura muda muito. O sistema
        termorregulador trabalha estimulando a perda de calor em ambientes de
        calor excessivo e acelerando os fenômenos metabólicos no frio para
        compensar a perda de calor. Graças a isto, o homem é um ser homeotérmico
        que, ao contrário de outros animais, mantêm a temperatura do corpo
        constante a despeito de fatores externos.
      </Text>
      <Image source={IMG1} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('mt-2 underline')}>
        Primeiros Socorros para Febre
      </Text>
      <Text style={tailwind('text-justify')}>
        Aplicar compressas úmidas na testa, cabeça, pescoço, axilas e virilhas
        (que são as áreas por onde passam os grandes vasos sanguíneos). Quando o
        acidentado for um adulto, submetê-la a um banho frio ou cobri-la com
        coberta fria. Podem ser usadas compressas frias aplicadas sobre grandes
        estruturas vasculares superficiais quando a temperatura corporal está
        muito elevada. O tratamento básico da febre deve ser dirigido para as
        suas causas, mas em primeiros socorros isto não é possível, pois o leigo
        deverá preocupar-se em atender os sintomas de febre e suas complicações.
        Drogas antipiréticas como aspirina, dipirona e acetaminofen são muito
        eficientes na redução da febre que ocorre devido a afecções no centro
        termorregulador do hipotálamo, porém só devem ser usadas após o
        diagnóstico. Devemos salientar que os primeiros socorros em casos febris
        só devem ser feitos em temperaturas muito altas (acima de 400C), por
        dois motivos já vistos: ­ a febre é defesa orgânica (é o organismo se
        defendendo de alguma causa) e ­ o tratamento da febre deve ser de suas
        causas.
      </Text>
      <Text style={tailwind('mt-2 underline')}>Pulso</Text>
      <Text style={tailwind('text-justify')}>
        O pulso é a onda de distensão de uma artéria transmitida pela pressão
        que o coração exerce sobre o sangue. Esta onda é perceptível pela
        palpação de uma artéria e se repete com regularidade, segundo as batidas
        do coração. Existe uma relação direta entre a temperatura do corpo e a
        freqüência do pulso. Em geral, exceto em algumas febres, para cada grau
        de aumento de temperatura existe um aumento no número de pulsações por
        minuto (cerca de 10 pulsações). O pulso pode ser apresentado variando de
        acordo com sua freqüência, regularidade, tensão e volume. a-
        Regularidade (alteração de ritmo) Pulso rítmico: normal Pulso arrítmico:
        anormal; b- Tensão; c- Freqüência - Existe uma variação média de acordo
        com a idade como pode ser visto no Quadro II abaixo. d- Volume - Pulso
        cheio: normal Pulso filiforme (fraco): anormal
      </Text>
      <Image source={IMG2} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('text-justify')}>
        A alteração na freqüência do pulso denuncia alteração na quantidade de
        fluxo sanguíneo. As causas fisiológicas que aumentam os batimentos do
        pulso são: digestão, exercícios físicos, banho frio, estado de excitação
        emocional e qualquer estado de reatividade do organismo. No desmaio /
        síncope as pulsações diminuem. Através do pulso ou das pulsações do
        sangue dentro do corpo, é possível avaliar se a circulação e o
        funcionamento do coração estão normais ou não. Pode-se sentir o pulso
        com facilidade: · Procurar acomodar o braço do acidentado em posição
        relaxada. · Usar o dedo indicador, médio e anular sobre a artéria
        escolhida para sentir o pulso, fazendo uma leve pressão sobre qualquer
        um dos pontos onde se pode verificar mais facilmente o pulso de uma
        pessoa. · Não usar o polegar para não correr o risco de sentir suas
        próprias pulsações. · Contar no relógio as pulsações num período de 60
        segundos. Neste período deve-se procurar observar a regularidade, a
        tensão, o volume e a freqüência do pulso. Existem no corpo vários locais
        onde se podem sentir os pulsos da corrente sanguínea. O pulso radial
        pode ser sentido na parte da frente do punho. Usar as pontas de 2 a 3
        dedos levemente sobre o pulso da pessoa do lado correspondente ao
        polegar, conforme a figura abaixo.
      </Text>
      <Image source={IMG3} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('mt-2 underline')}>Respiração</Text>
      <Text style={tailwind('text-justify')}>
        A respiração é uma das funções essenciais à vida. É através dela que o
        corpo promove permanentemente o suprimento de oxigênio necessário ao
        organismo, vital para a manutenção da vida. A respiração é comandada
        pelo Sistema Nervoso Central. Seu funcionamento processa-se de maneira
        involuntária e automática. É a respiração que permite a ventilação e a
        oxigenação do organismo e isto só ocorre através das vias aéreas
        desimpedidas. A observação e identificação do estado da respiração de um
        acidentado de qualquer tipo de afecção é conduta básica no atendimento
        de primeiros socorros. Muitas doenças, problemas clínicos e acidentes de
        maior ou menor proporção alteram parcialmente ou completamente o
        processo respiratório. Fatores diversos como secreções, vômito, corpo
        estranho, edema e até mesmo a própria língua podem ocasionar a obstrução
        das vias aéreas. A obstrução produz asfixia que, se prolongada, resulta
        em parada cardío-respiratória. O processo respiratório manifesta-se
        fisicamente através dos movimentos ritmados de inspiração e expiração.
        Na inspiração existe a contração dos músculos que participam do processo
        respiratório, e na expiração estes músculos relaxam-se espontaneamente.
        Quimicamente existe uma troca de gazes entre os meios externos e
        internos do corpo. O organismo recebe oxigênio atmosférico e elimina
        dióxido de carbono. Esta troca é a hematose, que é a transformação, no
        pulmão, do sangue venoso em sangue arterial. Deve-se saber identificar
        se a pessoa está respirando e como está respirando. A respiração pode
        ser basicamente classificada por tipo e freqüência. O Quadro III
        apresenta a classificação da respiração quanto ao tipo. A freqüência da
        respiração é contada pela quantidade de vezes que uma pessoa realiza os
        movimentos combinados de inspiração e expiração em um minuto. Para se
        verificar a freqüência da respiração, conta-se o número de vezes que uma
        pessoa realiza os movimentos respiratórios: 01 inspiração + 01 expiração
        = 01 movimento respiratório. A contagem pode ser feita observando-se a
        elevação do tórax se o acidentado for mulher ou do abdome se for homem
        ou criança. Pode ser feita ainda contando-se as saídas de ar quente
        pelas narinas. A freqüência média por minuto dos movimentos
        respiratórios varia com a idade se levarmos em consideração uma pessoa
        em estado normal de saúde. Por exemplo: um adulto possui um valor médio
        respiratório de 14 - 20 respirações por minuto (no homem), 16 - 22
        respirações por minuto (na mulher), enquanto uma criança nos primeiros
        meses de vida 40 - 50 respirações por minuto.
      </Text>
      <Image source={IMG4} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('font-bold mt-2')}>Sinais de Apoio</Text>
      <Text style={tailwind('text-justify')}>
        Além dos sinais vitais do funcionamento do corpo humano, existem outros
        que devem ser observados para obtenção de mais informações sobre o
        estado de saúde de uma pessoa. São os sinais de apoio; sinais que o
        corpo emite em função do estado de funcionamento dos órgãos vitais. Os
        sinais de apoio podem ser alterados em casos de hemorragia, parada
        cardíaca ou uma forte batida na cabeça, por exemplo. Os sinais de apoio
        tornam-se cada vez mais evidentes com o agravamento do estado do
        acidentado. Os principais sinais de apoio são: · Dilatação e reatividade
        das pupilas · Cor e umidade da pele · Estado de consciência · Motilidade
        e sensibilidade do corpo
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        Dilatação e Reatividade das Pupilas
      </Text>
      <Text style={tailwind('text-justify')}>
        A pupila é uma abertura no centro da íris - a parte colorida do olho - e
        sua função principal é controlar a entrada de luz no olho para a
        formação das imagens que vemos. A pupila exposta à luz se contrai.
        Quando há pouca ou quase nenhuma luz a pupila se dilata, fica aberta.
        Quando a pupila está totalmente dilatada, é sinal de que o cérebro não
        está recebendo oxigênio, exceto no uso de colírios midriáticos ou certos
        envenenamentos. A dilatação e reatividade das pupilas são um sinal de
        apoio importante. Muitas alterações do organismo provocam reações nas
        pupilas (Quadro V). Certas condições de "stress", tensão, medo e estados
        de pré-choque também provocam consideráveis alterações nas pupilas.
        Devemos observar as pupilas de uma pessoa contra a luz de uma fonte
        lateral, de preferência com o ambiente escurecido. Se não for possível
        deve-se olhar as pupilas contra a luz ambiente.
      </Text>
      <Image source={IMG5} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('mt-2 underline')}>Cor e Umidade da Pele</Text>
      <Text style={tailwind('text-justify')}>
        A cor e a umidade da pele são também sinais de apoio muito útil no
        reconhecimento do estado geral de um acidentado. Uma pessoa pode
        apresentar a pele pálida, cianosada ou hiperemiada (avermelhada e
        quente). A cor e a umidade da pele devem ser observadas na face e nas
        extremidades dos membros, onde as alterações se manifestam primeiro
        (Quadro VI). A pele pode também ficar úmida e pegajosa. Pode-se observar
        estas alterações melhor no antebraço e na barriga.
      </Text>
      <Image source={IMG6} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('mt-2 underline')}>Estado de Consciência</Text>
      <Text style={tailwind('text-justify')}>
        Este é outro sinal de apoio importante. A consciência plena é o estado
        em que uma pessoa mantém o nível de lucidez que lhe permite perceber
        normalmente o ambiente que a cerca, com todos os sentidos saudáveis
        respondendo aos estímulos sensoriais. Quando se encontra um acidentado
        capaz de informar com clareza sobre o seu estado físico, pode-se dizer
        que esta pessoa está perfeitamente consciente. Há, no entanto, situações
        em que uma pessoa pode apresentar sinais de apreensão excessiva, olhar
        assustado, face contraída e medo. Esta pessoa certamente não estará em
        seu pleno estado de consciência. Uma pessoa pode estar inconsciente por
        desmaio, estado de choque, estado de coma, convulsão, parada cardíaca,
        parada respiratória, alcoolismo, intoxicação por drogas e uma série de
        outras circunstâncias de saúde e lesão. Na síncope e no desmaio há uma
        súbita e breve perda de consciência e diminuição do tônus muscular. Já o
        estado de coma é caracterizado por uma perda de consciência mais
        prolongada e profunda, podendo o acidentado deixar de apresentar
        gradativamente reação aos estímulos dolorosos e perda dos reflexos.
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        Motilidade e Sensibilidade do Corpo
      </Text>
      <Text style={tailwind('text-justify')}>
        Qualquer pessoa consciente que apresente dificuldade ou incapacidade de
        sentir ou movimentar determinadas partes do corpo, está obviamente fora
        de seu estado normal de saúde. A capacidade de mover e sentir partes do
        corpo são um sinal que pode nos dar muitas informações. Quando há
        incapacidade de uma pessoa consciente realizar certos movimentos,
        pode-se suspeitar de uma paralisia da área que deveria ser movimentada.
        A incapacidade de mover o membro superior depois de um acidente pode
        indicar lesão do nervo do membro. A incapacidade de movimento nos
        membros inferiores pode indicar uma lesão da medula espinhal. O desvio
        da comissura labial (canto da boca) pode estar a indicar lesão cerebral
        ou de nervo periférico (facial). Pede-se à vítima que sorria. Sua boca
        sorrirá torta, só de um lado. Quando um acidentado perde o movimento
        voluntário de alguma parte do corpo, geralmente ela também perde a
        sensibilidade no local. Muitas vezes, porém, o movimento existe, mas o
        acidentado reclama de dormência e formigamento nas extremidades. É muito
        importante o reconhecimento destas duas situações, como um indício de
        que há lesão na medula espinhal. É importante, também, nestes casos
        tomar muito cuidado com o manuseio e transporte do acidentado para
        evitar o agravamento da lesão. Convém ainda lembrar que o acidentado de
        histeria, alcoolismo agudo ou intoxicação por drogas, mesmo que sofra
        acidente traumático, pode não sentir dor por várias horas.
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>Asfixia</Text>
      <Text style={tailwind('mt-2 underline')}>Principais Causas</Text>
      <Text style={tailwind('text-justify')}>
        A. Bloqueio da passagem de ar. Pode acontecer nos casos de afogamento,
        secreções e espasmos da laringe, estrangulamento, soterramento e
        bloqueio do ar causado por ossos, alimentos ou qualquer corpo estranho
        na garganta. B. Insuficiência de oxigênio no ar. Pode ocorrer em
        altitudes onde o oxigênio é insuficiente, em compartimentos não
        ventilados, nos incêndios em compartimentos fechados e por contaminação
        do ar por gases tóxicos (principalmente emanações de motores, fumaça
        densa). C. Impossibilidade do sangue em transportar oxigênio. D.
        Paralisia do centro respiratório no cérebro. Pode ser causada por choque
        elétrico, venenos, doenças, (AVC), ferimentos na cabeça ou no aparelho
        respiratório, por ingestão de grande quantidade de álcool, ou de
        substâncias anestésicas, psicotrópicos e tranqüilizantes. E. Compressão
        do corpo. Pode ser causado por forte pressão externa (por exemplo,
        traumatismo torácico), nos músculos respiratórios.
      </Text>
      <Text style={tailwind('mt-2 underline')}>Primeiros Socorros</Text>
      <Text style={tailwind('text-justify')}>
        · A primeira conduta é favorecer a passagem do ar através da boca e das
        narinas · Afastar a causa. · Verificar se o acidentado está consciente ·
        Desapertar as roupas do acidentado, principalmente em volta do pescoço,
        peito e cintura. · Retirar qualquer objeto da boca ou da garganta do
        acidentado, para abrir e manter desobstruída a passagem de ar. · Para
        assegurar que o acidentado inconsciente continue respirando, coloque-a
        na posição lateral de segurança. · Iniciar a respiração de socorro
        (conforme relatado a frente), tão logo tenha sido o acidentado colocado
        na posição correta. Lembrar que cada segundo é importante para a vida do
        acidentado. · Repetir a respiração de socorro tantas vezes quanto
        necessário, até que o acidentado de entrada em local onde possa receber
        assistência adequada. · Manter o acidentado aquecido, para prevenir o
        choque. · Não dar líquidos enquanto o acidentado estiver inconsciente. ·
        Não deixar o acidentado sentar ou levantar. O acidentado deve permanecer
        deitado, mesmo depois de ter recuperado a respiração. · Não dar bebidas
        alcoólicas ao acidentado. Dar chá ou café para beber, logo que volte a
        si. · Continuar observando cuidadosamente o acidentado, para evitar que
        a respiração cesse novamente. · Não deslocar o acidentado até que sua
        respiração volte ao nor- mal. · Remover o acidentado, somente deitado,
        mas só em caso de ex- trema necessidade. · Solicitar socorro
        especializado mesmo que o acidentado esteja recuperado.
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        Ressuscitação cardío-respiratória
      </Text>
      <Text style={tailwind('mt-2 underline')}>Principais Causas</Text>
      <Text style={tailwind('text-justify')}>
        A parada cardíaca e a parada respiratória podem ocorrer por diversos
        fatores, atuando de modo isolado ou associado. Em determinadas
        circunstâncias, não é possível estabelecer com segurança qual ou quais
        os agentes que as produziram. Podem ser divididas em dois grupos, e a
        importância desta classificação é que a conduta de quem está socorrendo
        varia de acordo com a causa. · Primárias A parada cardíaca se deve a um
        problema do próprio coração, causando uma arritmia cardíaca, geralmente
        a fibrilação ventricular. A causa principal é a isquemia cardíaca
        (chegada de quantidade insuficiente de sangue oxigenado ao coração). São
        as principais causas de paradas cardíacas em adultos que não foram
        vítimas de traumatismos. · Secundárias A disfunção do coração é causada
        por problema respiratório ou por uma causa externa. São as principais
        causas de parada cardío-respiratória em vítimas de traumatismos. a -
        Oxigenação deficiente: obstrução de vias aéreas e doenças pulmonares. b
        - Transporte inadequado de oxigênio: hemorragia grave, estado de choque,
        intoxicação por monóxido de carbono. c - Ação de fatores externos sobre
        o coração: drogas e descargas elétricas. No ambiente de trabalho deve-se
        dedicar especial atenção a trabalhos com substâncias químicas, tais como
        o monóxido de carbono, defensivos agrícolas, especialmente os
        organofosforados, e trabalhos em eletricidade, embora o infarto do
        miocárdio ou um acidente grave possa ocorrer nas mais variadas
        situações, inclusive no trajeto residência-trabalho-residência, ou mesmo
        dormindo. A rápida identificação da parada cardíaca e da parada
        respiratória é essencial para o salvamento de uma vida potencialmente em
        perigo. Uma parada respiratória não resolvida leva o acidentado à parada
        cardíaca devido a hipóxia (falta de ar) cerebral e do miocárdio. Se o
        coração para primeiro, as complicações serão maiores, pois a chegada de
        oxigênio ao cérebro estará instantaneamente comprometida: os músculos
        respiratórios perdem rapidamente a eficiência funcional; ocorre imediata
        parada respiratória podendo ocorrer lesão cerebral irreversível e morte.
      </Text>
      <Image source={IMG7} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('mt-2 underline')}>
        Limitações da Ressuscitação cardío-respiratória
      </Text>
      <Text style={tailwind('text-justify')}>
        A ressuscitação cardío-respiratória não é capaz de evitar a lesão ce-
        rebral por períodos prolongados. Com o tempo (minutos) a circulação
        cerebral obtida com as compressões torácicas vai diminuindo
        progressivamente até se tornar ineficaz. Durante a ressuscitação cardío-
        respiratória a pressão sistólica atinge de 60 a 80 mmHg, mas a pressão
        diastólica é muito baixa, diminuindo a perfusão de vários órgãos entre
        os quais o coração. As paradas por fibrilação ventricular só podem ser
        revertidas pela desfibrilação. O suporte básico da vida sem
        desfibrilação não é capaz de manter a vida por períodos prolongados. A
        reversão da parada cardío-respiratória na maioria dos casos também não é
        obtida, deste modo é necessário se solicitar apoio ao atendimento
        especializado com desfibrilação e recursos de suporte avançado.
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        Posicionamento para a Ressuscitação cardío-respiratória
      </Text>
      <Text style={tailwind('text-justify')}>
        a - Do acidentado: · Posicionar o acidentado em superfície plana e
        firme. · Mantê-lo em decúbito dorsal, pois as manobras para permitir a
        abertura da via aérea e as manobras da respiração artificial são mais
        bem executadas nesta posição. · A cabeça não deve ficar mais alta que os
        pés, para não prejudicar o fluxo sangüíneo cerebral. · Caso o acidentado
        esteja sobre uma cama ou outra superfície macia ele deve ser colocado no
        chão ou então deve ser colocada uma tábua sob seu tronco. · A técnica
        correta de posicionamento do acidentado deve ser obedecida utilizando-se
        as manobras de rolamento. b - Da pessoa que esta socorrendo: · Este deve
        ajoelhar-se ao lado do acidentado, de modo que seus ombros fiquem
        diretamente sobre o esterno do acidentado.
      </Text>
      <Text style={tailwind('mt-2 underline')}>Primeiros Socorros</Text>
      <Text style={tailwind('text-justify')}>
        A conduta de quem socorre é vital para o salvamento do acidentado. Uma
        rápida avaliação do estado geral do acidentado é que vai determinar
        quais etapas a serem executadas, por ordem de prioridades. A primeira
        providência a ser tomada é estabelecer o suporte básico da vida, para
        tal o acidentado deverá estar posicionado adequadamente de modo a
        permitir a realização de manobras para suporte básico da vida. Adotar
        medidas de autoproteção colocando luvas e máscaras. O suporte básico da
        vida consiste na administração de ventilação das vias aéreas e de
        compressão torácica externa. Estas manobras de apoio vital básico
        constituem-se de três etapas principais que devem ser seguidas: ·
        desobstrução das vias aéreas; · suporte respiratório e · suporte
        circulatório. O reconhecimento da existência de obstrução das vias
        aéreas pode ser feito pela incapacidade de ouvir ou perceber qualquer
        fluxo de ar pela boca ou nariz da vítima e observando a retração
        respiratória das áreas supraclaviculares, supra-esternal e intercostal,
        quando existem movimentos espontâneos. A obstrução poderá ser
        reconhecida pela incapacidade de insuflar os pulmões quando se tenta
        ventilar a vítima. A ventilação e a circulação artificiais constituem o
        atendimento imediato para as vítimas de PCR. A ventilação artificial é a
        primeira medida a ser tomada na RCR. Para que essa ventilação seja
        executada com sucesso é necessária à manutenção das vias aéreas
        permeáveis, tomando-se as medidas necessárias para a desobstrução. Nas
        vítimas inconscientes a principal causa de obstrução é a queda da língua
        sobre a parede posterior da faringe. Como causa ou como conseqüência da
        PR, pode ocorrer oclusão da hipofaringe pela base da língua ou
        regurgitação do conteúdo gástrico para dentro das vias aéreas. Observar
        prováveis lesões na coluna cervical ou dorsal, antes de proceder às
        recomendações seguintes. Para manter as vias aéreas permeáveis e
        promover sua desobstrução, para tanto colocar o acidentado em decúbito
        dorsal e fazer a hiper-extensão da cabeça, colocando a mão sob a região
        posterior do pescoço do acidentado e a outra na região frontal. Com essa
        manobra a mandíbula se desloca para frente e promove o estiramento dos
        tecidos que ligam a faringe, desobstruindo-se a hipofaringe. Em algumas
        pessoas a hiper-extensão da cabeça não é suficiente para manter a via
        aérea superior completamente permeável. Nestes casos é preciso fazer o
        deslocamento da mandíbula para frente. Para fazer isso é necessário
        tracionar os ramos da mandíbula com as duas mãos. Por uma das mãos na
        testa e a outra sob o queixo do acidentado. Empurrar a mandíbula para
        cima e inclinar a cabeça do acidentado para trás ate que o queixo esteja
        em um nível mais elevado que o nariz. Desta maneira restabelece-se uma
        livre passagem de ar quando a língua é separada da parte posterior da
        garganta. Mantendo a cabeça nesta posição, escuta-se e observa-se para
        verificar se o acidentado recuperou a respiração. Em caso afirmativo,
        coloque o acidentado na posição lateral de segurança. Em outras pessoas,
        o palato mole se comporta como uma válvula, provocando a obstrução nasal
        expiratória, o que exige a abertura da boca.
      </Text>
      <Text style={tailwind('text-blue-500')}>
        Parei na página 40 para tomar um ar kkkkkkkkkkk
      </Text>
    </View>
  );
};

export default Cap1;
