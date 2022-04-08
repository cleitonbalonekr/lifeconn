/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { IMG1, IMG2 } from '@/presentation/shared/assets/imgFirstAid/index';

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
        com a idade como pode ser visto no Quadro II abaixo.
      </Text>
      <Image source={IMG2} style={tailwind('w-full')} resizeMode="contain" />
    </View>
  );
};

export default Cap1;
