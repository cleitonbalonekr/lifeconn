/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import {
  IMG1,
  IMG2,
  IMG3,
  IMG4,
  IMG5
} from '@/presentation/shared/assets/imgBasicMechanics/index';

import Mark from '../mark';

// <Mark toText="" toMark={toSearch} />

interface Props {
  toSearch: string;
}

const Cap1: React.FC<Props> = ({ toSearch }) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('mt-8 justify-center')}>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="SISTEMA DE ARREFECIMENTO" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="O sistema de arrefecimento
        destina-se a resfriar a temperatura de funcionamento do motor. É
        composto de válvula termostática, bomba d`água, ventoinha, mangueiras,
        conexões, canos e radiador. Para seu melhor desempenho e para evitar
        problemas como oxidação, ferrugem, corrosão e suas características, é
        necessário o uso de aditivos de radiador, respeitando a diluição de no
        mínimo 40% e no máximo 60% da capacidade do sistema. A função do aditivo
        é de proteção, baixar o ponto de congelamento e aumentar o ponto de
        ebulição, deixando para a água o trabalho de troca térmica necessária."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• queima do fusível da ventoinha; •
        queima da ventoinha; • queima do sensor do radiador; • travamento da
        válvula termostática; • aparecimento de ferrugens e contaminações; •
        estouro de mangueiras; • vazamentos em selos do motor e abraçadeiras; •
        vazamento no trocador de calor do óleo; • corrosão no rotor da bomba
        d’água."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observações:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• Verifique o nível da água do
        radiador no mínimo uma vez por semana. • Em viagens a verificação deve
        ser diária. • Não se esqueça de verificar a correia que faz girar a
        bomba d`água; • Ao colidir o veículo de frente, não saia do local com o
        motor funcionando sem observar o nível da água do radiador."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="MOTOR" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="O motor tem como função dar
        movimento aos veículos."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• o motor falha; • o motor consume
        muito óleo; • emissão de grande quantidade de fumaça; • admissão de
        combustível em excesso; • desgaste dos anéis; • desgaste de vedadores e
        de válvulas do cabeçote; • vazamentos de óleo. • Queima da junta do
        cabeçote."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Verificar:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• o óleo do motor quanto ao nível e
        qualidade; • o filtro de óleo quanto à necessidade de troca; • as velas
        de ignição; • possíveis folgas nas válvulas."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark
          toText="No caso dos motores é importante tomar os seguintes cuidados:"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• trocar a correia dentada e a do
        alternador dentro do período especificado pelo fabricante; • verificar o
        nível da água e do óleo uma vez por semana; • rocar o aditivo do
        radiador a cada 30.000 km ou após um ano da última troca; • fazer a
        limpeza do cárter e do respiro do motor a cada ano; • verificar se está
        ocorrendo o entupimento do respiro; • efetuar a limpeza da bomba de
        óleo; • trocar os filtros de ar e de combustível com freqüência."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('font-bold mt-2')}>
        <Mark toText="MOTOR DIESEL" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Tem o mesmo principio dos outros motores. Seu sistema de ignição é
        espontânea sem precisar centelha de vela como os motores convencionais
        (gasolina ou álcool) para entrar em funcionamento. Os motores antigos
        tem sistema de injeção mecânica de combustível, portanto, se der um
        tranco, mesmo sem a chave ligada o motor entra em funcionamento. Possui
        bicos e bomba injetora que trabalham com pressões altíssimas, próximas
        de 3.000 libras. Os motores modernos já trabalham com desligamento na
        chave, enquanto que os motores antigos possuem sistema de afogador
        mecânico. Os veículos atuais trabalham com sistema de injeção eletrônica
        de combustível para baixarem o consumo e poluição do ar. Normalmente são
        mais barulhentos e lentos na retomada de velocidade e são mais usados no
        Brasil, para transporte de cargas."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• Entupimento de filtros . • Excesso
        de fumaça. • Vazamento de diesel. • Quebras de canos."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Quando da manutenção dos filtros de combustível, a maioria dos motores,
        exigem sangramento para retirada do ar, para que entrem em
        funcionamento."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="ESCAPAMENTO E CATALISADOR" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="O escapamento tem por objetivo
        diminuir o ruído provocado pela combustão (queima da mistura combustível
        + ar) e promover a eliminação dos gases resultantes dela. O catalisador
        converte quimicamente os gases emitidos pelo motor em água e outros
        elementos."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• ineficiência em relação à potência
        e ao desempenho; • apresentação de ruídos fortes; • ocorrência de
        barulhos provocados por toques entre metais; • apresentação de mau
        cheiro (no caso do catalisador); • entupimento do catalisador."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="CÂMBIO" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="O sistema de câmbio encarrega-se de
        transmitir força para a movimentação do veículo. O câmbio pode ser
        mecânico ou automático."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark
          toText="Possíveis problemas do câmbio mecânico:"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• dificuldade em engatar as marchas;
        • marcha escapando; • resistência ao engatar as marchas; • ocorrência de
        ruídos; • apresentação de vazamentos."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark
          toText="Possíveis problemas do câmbio automático:"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• a marcha não desengata; • a luz de
        emergência acende; • o veículo não arranca; • ocorrência de solavancos
        quando se engata a marcha com o veículo parado; • o desempenho fica
        prejudicado; • entrada de óleo de câmbio no sistema de arrefecimento
        pelo trocador de calor;"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark
          toText="No caso do câmbio automático deve-se observar o seguinte:"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• fazer a troca de óleo quando
        necessário; • não empurrar o veículo engatado na opção “P”; • quando
        rebocar “trailler” ou carreta não dirigir na opção “D”; • em declives
        não soltar o veículo em ponto morto, ou seja na opção “N”; • ao
        estacionar o veículo e desligá-lo, deixe-o engatado com a alavanca de
        marcha na opção “P” e o freio de mão acionado. Nas outras opções, o
        câmbio se encontra desengatado."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observações:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• mantenha a partida do veículo
        sempre em ordem em emergências, não tem como dar tranco; • nunca arraste
        um veículo com câmbio automático. Guinche-o."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="DIFERENCIAL" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="É o sistema encarregado da
        transmissão de força ao veículo e de compensação das rodas na execução
        de curvas. Ele pode ser incluso, quando junto ao câmbio ou separado no
        caso dos veículos com tração traseira ou do tipo 4X4."
          toMark={toSearch}
        />
      </Text>
      <Image source={IMG1} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• vazamentos de óleo; • barulho de
        rolamentos; • estalos quando se arranca com o veículo; • zumbidos em
        alta velocidade; • folgas nas engrenagens da coroa, pinhão, caixa de
        satélites e pontas de eixo; • estalos na execução das curvas no caso de
        diferenciais com tração positiva."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="EMBREAGEM" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="A embreagem é um dispositivo que
        contribui para a colocação do veículo em movimento sem solavancos e
        torna possível o arranque e a mudança da velocidade (interligação do
        movimento do motor para a transmissão). Fazem parte da embreagem o
        platô, o disco, o rolamento, o cabo ou dois cilindros de acionamento.
        Existem diferentes causas que originam problemas na embreagem, devido,
        particularmente a um uso inadequado do motorista. Veja quais os pontos
        de maior incidência, assim como algum as dicas que ajudarão a melhorar a
        utilização e a vida útil da embreagem: 1. Utilize o pedal da embreagem
        somente no momento da troca de marcha. Quando o motorista descansa o pé
        sobre o pedal, provoca um aquecimento excessivo do sistema e um desgaste
        prematuro dos componentes. 2. Nunca segure o veículo numa rampa
        utilizando a embreagem como freio. Esse hábito causa um desgaste
        excessivo de disco. Nestas situações, utilize sempre o freio do veículo.
        3. Evite sempre ultrapassar a capacidade de carga especificada pelo
        fabricante do veículo, porque afetará o funcionamento da embreagem e
        diminuirá a vida útil da mesma.4. Evite sempre acionar e desacionar
        bruscamente a embreagem para aumentar o torque ou alterar a rotação do
        motor quando se encontrar em uma velocidade compatível. 5. Nunca inicie
        bruscamente a marcha, evitando arrancadas. 6. Nunca saia com o veículo
        em segunda marcha. 7. Evite reduções bruscas de velocidade, freando ou
        desacelerando subitamente o motor."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• trepidação no pedal; • dificuldade
        de engatar as marchas; • embreagem patinando; • embreagem queimada; •
        embreagem desregulada; • ocorrência de ruídos no acionamento do pedal
        até o fim do curso; • embreagem “pesada”; • vazamentos nos cilindros da
        embreagem hidráulica."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="A quebra de qualquer peça do sistema
        de embreagem poderá fazer parar o veículo."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="PARTIDA" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="É o início do funcionamento do
        motor, acionado pelo motor de arranque."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• apresentação de um ruído (como um
        estalo “tec”); • apresentação de um ruído como “ziimm”; • o motor não
        liga (não faz barulho)."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark
          toText="Quando o sistema de partida funciona, mas o motor do veículo não “pega”
        pode estar ocorrendo:"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• falta de sinal do sensor de
        rotação; • falta de combustível no tanque; • falta de corrente elétrica
        nas velas; • corte proveniente do sistema “CODE” do veículo; • corte de
        combustível nos injetores; • corte oriundo de alarmes com sistema
        anti-furto; • corte com botão ou chave de anti-furto."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="ALTERNADOR" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="O alternador tem como função gerar
        carga elétrica para a bateria e funciona entre 13,5 e 15 volts."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• acendimento da luz da bateria no
        painel; • enfraquecimento da luz; • o veículo não entra em
        funcionamento, porque a bateria deixou de receber carga."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observações:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• Verificar, com uma certa
        freqüência, o estado da correia que faz girar o alternador. • A troca da
        correia é recomendada entre 30.000 e 60.000 quilômetros. • Em muitos
        casos a correia do alternador também faz girar a bomba d`água."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="BATERIA" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="A bateria fornece a energia elétrica
        para a partida do motor e para todo o sistema elétrico, sendo
        recarregada pelo alternador, que é um gerador de energia a partir do
        funcionamento do motor (Item 8). A bateria pode ser convencional ou
        selada e muda sua amperagem de acordo com o veículo a que se destina (de
        45 a 70 amperes)."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• dificuldade em fazer funcionar o
        motor (partida lenta); • oscilações na marcha lenta (nos veículos com
        injeção eletrônica); • vida útil vencida; • perda de intensidade da
        iluminação; • apresentação de cheiro forte, proveniente de excesso de
        carga do alternador; • disparo do alarme."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark
          toText="Para o correto funcionamento da bateria deve-se verificar:"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• se os contatos estão bem fixados;
        • se o nível da solução de água está normal (bateria convencional); • se
        o suporte da bateria está bem fixado; • se a bateria está descarregada;
        • se está ocorrendo “fuga” de corrente."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• A troca da bateria somente deverá
        ser efetuada com uma “chupeta” ligada, para evitar o desligamento do
        sistema eletrônico e a perda de códigos."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Atenção: As baterias são altamente tóxicas e prejudiciais ao meio
        ambiente. Por esse motivo não as descarte em qualquer lugar. Quando
        houver vazamento do líquido da bateria na lataria do veículo, limpe o
        local imediatamente, pois o líquido é altamente corrosivo e prejudicará
        a mesma."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="CAIXA DE FUSÍVEIS" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="É uma central elétrica que recebe e
        repassa a energia para todos os componentes elétricos do veículo,
        através de fusíveis e relês. Se localizam no cofre do motor, no painel
        de instrumento acima do pedal da embreagem ou na lateral do painel do
        lado esquerdo. Sua função é alimentar todo o sistema elétrico do
        veículo."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• queima de fusíveis e de relês; •
        desligamento da: • ventuinha do radiador; • bomba elétrica de
        combustível; • limpador de pára-brisa; • faróis e lanternas; •
        ar-condicionado; • ventilação do painel; • desembaçador do vidro
        traseiro; • buzina; • alarme;"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Cuidado:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• Existem casos que cortam o
        funcionamento do motor. • Não retire todos os fusíveis do local sem
        identifica-los. Há possibilidade de desligamento de códigos de alarme,
        vidro elétrico, injeção eletrônica e rádio, que depois terão que ser
        codificados novamente."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• Na tampa da caixa de fusíveis tem
        instruções para localização e função de cada um."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="INDICADORES DO PAINEL" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Indicador do nível de combustível; tacômetro (conta-giros); indicador da
        temperatura do motor (luz ou ponteiro); luz do óleo; luz da injeção
        eletrônica; luz da bateria; luz do fluído de freio."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• Fique sempre atento quanto ao
        acendimento de luzes no painel, principalmente das citadas acima, pois a
        desconsideração do aviso das mesmas poderá causar sérios danos aos
        veículos ou até mesmo acidentes, como é o caso do vazamento do fluido do
        freio que deixará o veículo sem condições de frenagem."
          toMark={toSearch}
        />
      </Text>
      <Image source={IMG2} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="1. Luzes 2. Luz baixa 3. Luz alta 4. Luzes do painel 5. Farol de neblina
        6. Regulagem de altura dos faróis 7. Sinalizador de direção 8. Luz de
        alerta 9. Combustível 10. Temperatura do motor 11. Pressão do óleo do
        motor 12. Carga da bateria 13. Sistema de freios 14. Sistema de freio
        antiblocante ABS 15. Anomalia no sistema de injeção 16. Ventilador 17.
        Entrada de ar externa 18. Recirculação do ar 19. Refrigeração do ar 20.
        Fluxo do ar para região dos pés 21. Fluxo do ar para cabeça 22. Fluxo do
        ar pés e pára-brisa 23. Limpador do pára-brisa 24. Lavador do pára-brisa
        25. Desembaçador do pára-brisa 26. Limpador do vidro traseiro 27.
        Desembaçador do vidro traseiro 28. Regime antipatinação 29. Regime
        esportivo 30. Trava de segurança traseira 31. Acendedor 32. Buzina"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="DIREÇÃO" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="O sistema de direção proporciona o
        controle do movimento do veículo. Deve-se evitar girar o volante com o
        veículo parado."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Existem quatro tipos de direção:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• mecânica; • hidráulica; •
        elétrica/hidráulica; • elétrica."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• trepidação (problemas nos
        terminais, nos freios ou de balanceamento); • folga no sistema de
        direção; • direção hidráulica com ruído; • estalos ou ruídos; • peso
        exagerado no manuseio; • vazamentos de óleo; • coifas rasgadas; •
        instabilidade na condução do veículo."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• No aparecimento de qualquer um dos
        problemas citados procure uma oficina de confiança para verificar se há
        risco imediato de acidente. • Confira o nível do óleo da direção
        hidráulica uma vez por semana."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="SUSPENSÃO" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="A suspensão absorve as vibrações
        causadas pelas irregularidades do solo, bem como dá estabilidade ao
        veículo, gerando um maior conforto para os ocupantes do mesmo."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• estalos ao girar o volante; •
        instabilidade nas curvas e nas retas; • apresentação de ruídos; •
        rigidez; • ocorrência de ruído contínuo."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• No aparecimento de qualquer um dos
        problemas citados procure uma oficina de confiança para verificar se há
        risco imediato de acidente."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="AMORTECEDORES" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Os amortecedores são peças de fundamental importância para a
        estabilidade e a segurança do veículo, tanto em curvas como em linha
        reta. Eles também têm a função de proporcionar conforto para o motorista
        e passageiros. A troca dos amortecedores deverá ocorrer a cada 60.000 ou
        90.000 km, dependendo do modelo do veículo ou o tipo de estrada em que
        ele trafega."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• quebra das hastes e suportes; •
        desgaste das borrachas de fixação; • empenamento por acidente; • ruídos
        por desgaste; • vazamento de óleo; • travamento; • perda da ação."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• A utilização de amortecedores
        recondicionados não é recomendada. • Sempre que se fizer a troca dos
        amortecedores também deverão ser trocados as coifas e batentes."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="PNEUS E RODAS" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="O conjunto pneu/roda é o componente
        que permite o contato entre o veículo e o solo."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas nos pneus:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• entortamento da banda de rodagem;
        • aparecimento de bolhas; • desgaste irregular; • desbalanceamento;"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas nas rodas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• amassamentos; • trincas; •
        ferrugem (no caso de rodas de ferro)."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Estrutura do pneu:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Carcaça: é a parte resistente do pneu. Retém o ar sob pressão e suporta
        o peso do veículo. Talões: são arames de aço que mantêm o pneu acoplado
        à roda, evitando vazamentos. Banda de rodagem: é a parte que toca o
        solo. Oferece aderência, desempenho e segurança ao veículo. Flancos:
        protegem a carcaça e possuem muita flexibilidade."
          toMark={toSearch}
        />
      </Text>
      <Image source={IMG3} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('mt-2 underline')}>
        <Mark
          toText="Cuidados para a correta manutenção dos pneus:"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Utilizar pneus da mesma medida em todas as rodas do veículo; Utilizar a
        roda adequada para o tipo de pneu (com câmara/sem câmara); Verificar
        periodicamente e sempre com pneus frios, a pressão dos pneus (incluindo
        o estepe); Efetuar periodicamente um rodízio para se obter um desgaste
        por igual em todos os pneus; Verificar o estado geral dos pneus
        (inclusive o seu interior) através de um técnico ou revendedor, após
        impactos, perfurações ou desgaste irregular; Efetuar periodicamente a
        geometria e o balanceamento (ver item 15) ou sempre que forem sentidas
        vibrações ou o volante puxando para um dos lados; Nunca estacionar sobre
        manchas de óleo ou produtos químicos; Obedecer aos limites de velocidade
        e de carga; Ter cuidado ao estacionar evitando choques; Nunca usar dois
        pneus maiores na frente ou atrás em veículos 4X4. Isso atrapalha e causa
        danos quando se usa a tração e a redução, portanto use sempre quatro
        pneus iguais."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="ALINHAMENTO E BALANCEAMENTO" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="A função do alinhamento é manter a
        posição das rodas estabelecida pelo fabricante, garantindo a segurança
        ao dirigir e a estabilidade do veículo."
          toMark={toSearch}
        />
      </Text>
      <Image source={IMG4} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('mt-2 underline')}>
        <Mark
          toText="Possíveis sintomas de desalinhamento:"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• desgaste irregular dos pneus; •
        vibrações no volante; • direção puxando para um dos lados; • o volante
        fica fora de centro."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="A função do balanceamento é
        proporcionar o equilíbrio do conjunto pneu/roda através de compensação
        pelo uso de pequenos pesos de metal."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark
          toText="Possíveis sintomas de desbalanceamento:"
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• trepidação no volante; •
        instabilidade do veículo; • desconforto ao dirigir."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="ROLAMENTOS" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Os rolamentos existem em todas as peças giratórias dos veículos, nas
        rodas, nas correias dentadas e no alternador. Existem dois tipos de
        rolamentos: os blindados que não necessitam engraxar e os convencionais
        que precisam de graxa periodicamente, conforme as especificações dos
        fabricantes."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• roncos; • zumbidos; • atritos; •
        quebra; • travamento."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• A junta homocinética também é um
        sistema de rolamento e por isso deverá ser monitorada quanto ao
        dilaceramento de coifas e à perda de graxa."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="FREIOS" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Os freios destinam-se a desacelerar as rodas do veículo até sua parada
        total."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas e causas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• freio com ruídos: pastilhas
        vitrificadas, uso de pastilhas de má qualidade, disco de freio com
        rebarbas ou aplicação errada das pastilhas; • trepidações no volante ou
        no pedal: tambor ovalado ou disco de freio empenado; • veículo puxando
        para um dos lados nas freadas: problemas no flexível, no pistão ou
        contaminação por graxa; • pedal duro: problemas no servo-freio ou na
        válvula de retenção; • pedal elástico: sistema desregulado ou com ar; •
        pedal cedendo: vazamento interno no cilindro-mestre."
          toMark={toSearch}
        />
      </Text>
      <Image source={IMG5} style={tailwind('w-full')} resizeMode="contain" />
      <Text style={tailwind('font-bold mt-2')}>
        <Mark toText="DICAS IMPORTANTES SOBRE OS FREIOS:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Para melhor orientar o usuário do veículo apresentamos informações
        importantes: 1. O fluído sintético de freio absorve a umidade do ar (é
        higroscópico) diminuindo o ponto de ebulição e alternando a sua
        coloração, bem como sua composição química pelo excesso de água. É
        necessário substituir todo o fluído a cada 10.000 km ou pelo menos uma
        vez por ano (12 meses), evitando assim uma alta contaminação por água.
        2. O reservatório de fluído é de material plástico podendo, ao longo de
        tempo, ocorrer trincas devido ao ressecamento. A tampa do reservatório
        tem um orifício que permite a entrada de ar, mantendo a mesma pressão
        atmosférica, ocasionando a contaminação do fluído pela água existente no
        ar. 3. O cilindro-mestre e cilindro-de-roda são peças de fundamental
        importância na transmissão de força do sistema de freio. Eles têm por
        matéria-prima básica o ferro fundido que, em contato com a água, reage
        formando o Óxido Ferroso (ferrugem). 4. O servo-freio é uma peça que
        existe para ampliar a força aplicada no pedal, o que proporciona menor
        esforço na ação de frear, através da diferença de pressão entre as
        câmaras (câmara de vácuo e câmara de ar), nele existentes. A condição de
        “pedal duro” é proveniente da inoperância dos componentes internos, caso
        em que recomenda-se a substituição do servo-freio por um novo. 5. Os
        flexíveis e as tubulações do sistema de freio são componentes sujeitos
        ao rompimento, porque têm que resistir a alta pressão mesmo em condições
        de frenagens de pânico que, na maioria dos casos, submetem à níveis
        críticos, a resistência dos materiais. Por esse motivo deve-se verificar
        a cada 2 anos ou 30.000 km todo o sistema de tubulação e flexíveis
        existente no veículo quanto à ocorrência de trincas, fissuras e
        amassamentos. 6. Os freios dianteiros, pastilhas e discos são peças que
        acumulam calor, porque os freios das rodas dianteiras transformam todo o
        peso do veículo (energia cinética) em atrito (energia calorífica),
        através da força de compressão das partilhas contra o disco gigante. É
        conveniente observar possíveis vazamentos nos freios a disco, pastilhas
        com no máximo 2mm de material de atrito próximo da chapa e discos de
        freio fora das condições especificadas pelo fabricante. 7. Os freios
        traseiros, tambores e lonas participam em torno de 30% da frenagem e,
        por isso, também são geradores de calor. No caso dos freios a tambor, o
        freio trabalha dentro do tambor gigante, dificultando a dissipação de
        calor (resfriamento), sendo que os freios traseiros, para não provocarem
        o famoso “cavalo de pau” na frenagem, a ITT-TEVES equaliza o sistema de
        freios para as montadoras. A cada 2 jogos de pastilhas substituídos nos
        freios dianteiros, recomendamos verificar, nos freios traseiros, a
        espessura das lonas e também vazamentos nos cilindros de roda que são os
        responsáveis em comprimir as lonas contra o tambor. 8. As válvulas
        equalizadoras são as responsáveis em reduzir a pressão nas rodas
        traseiras. Existem dois tipos de válvulas para veículos de passageiros:
        as equalizadoras que são de ponto de corte fixo, isto é, em uma
        determinada pressão no projeto da válvula inicia-se a redução gradativa
        da pressão das rodas traseiras; as proporcionadoras que são de ponto de
        cortes variáveis, ou seja, com o veículo vazio ela efetua o primeiro
        ponto de corte e quando colocamos peso no veículo ela varia em função da
        carga. 9. O ABS é um sistema eletrônico que interfere no circuito
        hidráulico em frenagens bruscas. O ABS (Antilook Brake Systems) é um
        sistema anti-bloqueio contendo sensores indutivos de rotação nas quatro
        rodas, unidade hidráulica (motor elétrico, válvulas eletromagnéticas) e
        microprocessador (software) que recebe as informações dos sensores. Na
        eminência de travamento ele comanda as válvulas magnéticas e com o
        acionamento do motor elétrico retorna uma pequena quantidade de fluído
        de volta para o cilindro mestre. Neste exato momento, sente-se um leve
        toque no pé, o que é normal. As peças do ABS são muito resistentes e
        duráveis porém no Brasil já existe incidência de oxidações internas na
        unidade hidráulica, prejudicando o comando da eletrônica. Substituir o
        fluído de freio pelo menos uma vez por ano é recomendável."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="SISTEMA DE ALIMENTAÇÃO" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Sua função é levar combustível do tanque até a câmara de combustão do
        motor para que ele seja queimado. Se compõe de: tanque, cânister, bomba
        elétrica ou mecânica, canos, filtro, corpo de borboleta, injetores ou
        carburador para a mistura de ar –combustível."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas e causas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• tanque sujo; • queima da válvula
        do cânister; • queima de bomba; • vazamentos; • entupimento do filtro; •
        queima ou entupimento dos injetores ou do carburador."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="INJEÇÃO ELETRÔNICA" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="A injeção eletrônica tem por
        objetivo diminuir o índice de poluição do ar e o consumo de combustível,
        bem como melhorar a dirigibilidade do carro. Ela pode ser dos tipos
        “single-point” ou “mult-point” e se compõe de atuadores, de sensores e
        da central eletrônica (módulo) que recebe as informações dos sensores e
        as repassa aos atuadores."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• o veículo não entra de novo em
        funcionamento imediatamente após ter sido desligado; • oscilação da
        marcha lenta; • acendimento da luz de anomalia no sistema; • falha de
        funcionamento do motor."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observações:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• O acesso ao sistema de injeção
        eletrônica só é possível com o uso de ferramentas apropriadas e por
        programa de computador específico para cada modelo. • Entre os tipos de
        injeções eletrônicas, alarmes, “codes”, “air-bags” e freios ABS existem,
        somente no Brasil, aproximadamente 1.300 modelos diferentes. • O veículo
        equipado com injeção eletrônica engatado, na descida, fica mais
        econômico do que em neutro (ponto morto)."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="IGNIÇÃO ELETRÔNICA" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="A ignição eletrônica emite sinal e
        corrente às velas. Ela se compõe de módulo eletrônico, bobinas, velas,
        cabos e distribuidor com bobina impulsora ou “hall”. Falhas no
        funcionamento da ignição eletrônica inibem o funcionamento do motor."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Possíveis problemas:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• falhas no motor; • às vezes demora
        para o motor “pegar”; • o motor não funciona."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="CARROCERIA" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="A carroceria é a estrutura do
        veículo montada sobre o chassi onde são transportados o motoristas, os
        passageiros ou a carga. É necessária sua correta manutenção, através da
        lubrificação das maçanetas, dobradiças e fechaduras. Aconselha-se a
        constante verificação da existência de trincas, amassados e ferrugens.
        Não se deve aplicar qualquer tipo de produto (derivados de petróleo ou
        vegetal) na parte inferior da carroceria."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• A pintura não deverá ser encerada
        e polida com muita freqüência (excesso de zelo), porque poderá sofrer
        danos, bem como favorecerá o encurtamento da sua vida útil."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="DICAS IMPORTANTES" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="1. A colocação de aditivos nos óleos de motor, câmbio e diferencial é,
        às vezes, prejudicial. 2. Os dispositivos para economia de combustível
        são ineficientes na maioria dos casos. 3. Alarmes e dispositivos de
        corte de combustível mal instalados são prejudiciais. 4. Rebaixar o
        veículo, alterar pneus e rodas prejudica conforto, diminui a vida útil
        das peças e altera a estabilidade do veículo. 5. Não é recomendável
        turbinar o veículo, exceto quando realizado pelo fabricante. 6. Nunca
        aumentar os HPs (potência) do motor. 7. Não são recomendadas as
        transformações de motor a álcool para gasolina e vice- versa. 8. Cuidado
        com detonação do motor (batida de pinos) ao percebê-lo, principalmente
        em subidas, volte a marcha para a anterior. A detonação é altamente
        prejudicial ao motor. 9. Ao acendimento de qualquer luz no painel de
        instrumentos identifique-a se não há risco mecânico para o veículo. 10.
        O seguro obrigatório do veículo cobre todas as despesas
        médico-hospitalares, invalidez ou morte dos ocupantes do veículo em caso
        de acidentes. 11. Quando estiver viajando com o som ligado, desligue-o
        de vez em quando para ouvir o barulho do motor e perceber se o seu
        funcionamento está em ordem. Com o som ligado, se o motor apresentar
        problemas, o motorista não ouve e o mesmo poderá fundir. 12. Ao cruzar
        com veículos altos, como ônibus e furgões em alta velocidade, mantenha
        os vidros do lado esquerdo fechados. Com a pressão formada pelo ar
        dentro do carro, poderá quebrar vidros ou até desprender o pára-brisa.
        13. Quebra-molas – outro mau hábito é o de passar em uma lombada
        transversalmente (cada roda de uma vez). Essa prática pode danificar as
        buchas da suspensão, amortecedores e rolamentos. Além disso provoca
        maior torção da carroceria, o que pode empenar o monobloco. 14. Mão na
        alavanca – dirigir com a mão pesando sobre a alavanca de marchas, força
        o trambulador (peça fundamental na ligação entre o câmbio e as
        engrenagens da transmissão) e seus terminais que podem desgastar-se
        excessivamente. 15. Embreagem – muitos motoristas deixam o pé apoiado
        sobre o pedal da embreagem enquanto dirigem. É um dos vícios mais comuns
        e difíceis de serem superados. As alavancas desse sistema são
        responsáveis por multiplicar de 8 (oito) para 400 (quatrocentos) quilos
        o peso aplicado sobre o pedal e separar o disco de embreagem do platô. O
        pé constantemente apoiado sobre o pedal acelera o desgaste do disco,
        molas, rolamentos, parte de baixo do motor excessivamente. 16. Mantenha
        sempre em ordem o sistema de arrefecimento do motor. A válvula
        termostática terá que abrir e fechar perfeitamente, na temperatura
        certa, para que o veículo tenha um melhor desempenho, baixe o consumo de
        combustível que poderá ultrapassar 10%."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Observação:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="• Os motores modernos trabalham com
        temperaturas entre 87º C e 110º C, dependendo do veículo que equipa,
        oscilando mais ou menos 3º C."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="PERGUNTAS MAIS FREQUENTES" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="1 - O que significa “sangrar o
        burrinho”? Na linguagem popular, sangrar o burrinho significa retirar o
        ar existente no cilindro- mestre ou cilindro da roda, muitas vezes
        ocasionado pelo baixo ponto de ebulição do fluído de freio no super
        aquecimento dos freios formando bolhas dentro do circuito, cuja
        conseqüência é o curso longo do pedal (borrachudo). Para evitar-se tal
        problema aconselha-se substituir o fluído de freio a cada 12 meses,
        evitando a contaminação por água e a diminuição do ponto de ebulição. 2
        - Deve-se ligar o ar condicionado e o ar quente do veículo pelo menos
        uma vez por semana? Sim, o ar condicionado pode perder a pressão e o ar
        quente pode travar a manopla. 3 - Pode-se rodar com o veículo em
        rotações extremamente baixas ou altas? Não. Mantenha a rotação do motor
        entre 2.000 e 2.500 giros. A quantidade de giros é marcada pelo
        tacômetro que está localizado no painel do veículo. 4 - Nos carros
        modernos toda falha no motor do veículo provém da injeção eletrônica?
        Não, existem outros componentes elétricos, eletrônicos e mecânicos que
        poderão parar o veículo. 5 - Os diversos tipos de óleo do motor
        (mineral, semi-sintético e sintético) podem ser misturados? Nunca, pois
        poderá ocorrer a criação de borras e carvão prejudicando o motor. 6 -
        Como economizar combustível? Mantendo o motor do veículo entre 2.000 e
        2.500 giros, no máximo. 7 - As características originais do veículo
        podem ser alteradas? Não, isto poderá acarretar multas, bem como
        prejudica o veículo na maioria das vezes. 8 - Gasolina comum ou
        aditivada. Qual usar? Tanto faz. Alguns fabricantes recomendam que se
        use aditivo a cada 4 tanques abastecidos. 9 - Pode-se dar “tranco” ou
        fazer “chupeta” nos veículos com injeção eletrônica? Sim, mas com
        cuidado observando-se a inversão de polaridade e o risco de quebra do
        câmbio. 10 - As revisões periódicas dos veículos deverão ser feitas
        considerando-se o tempo decorrido ou a quilometragem percorrida? Deve-se
        observar o recomendado pelas montadoras. As revisões periódicas baixam o
        custo de manutenção. O ideal é que se faça a cada um ano ou 15.000 km.
        11 - Quais os cuidados durante a lavagem do veículo? Produtos fortes
        poderão estragar a pintura ou retirar a sua proteção. Use “shampoo”
        neutro. 12 - Quando devem ser feitas as revisões antes de viajar? As
        revisões deverão ser feitas no mínimo 20 dias antes de viajar, para que
        possam ser sanados possíveis problemas provenientes da própria revisão
        (barulhos, vazamentos, etc.) ou dúvidas do proprietário do veículo. 13 -
        Qual a freqüência com que se deve ler o manual do veículo? Sempre que se
        tiver tempo ou para tirar dúvidas e principalmente quando acender
        qualquer luz no painel e não se sabe qual a significação dela. 14 -
        Existe problema em só abastecer o veículo quando o nível do tanque
        chegar na reserva? Sim, tal fato possibilita a mistura do combustível
        novo com os resíduos que ficam no fundo do tanque e que são revolvidos
        quando o nível chega a um ponto crítico, o que pode ocasionar a queima
        da bomba de combustível e o incremento do acúmulo de sujeira no filtro.
        Nunca deixe acabar o combustível do carro e considere o tanque vazio
        quando o mostrador marcar ¼. 15 - A limpeza de injetores deverá ser
        feita com 20.000 km ou um ano? Sim, para evitar travamento ou
        gotejamentos. 16 - A troca de óleo deverá ser feita de 5.000 a 10.000 km
        no máximo ou a cada 6 meses? A troca deve ser realizada dentro das
        especificações do fabricante do veículo. Ela é importante porque evita
        desgastes excessivos no motor e a formação de fuligem, o que é bastante
        prejudicial. 17 - Ao parar o veículo pode-se ficar com o pé pressionando
        o pedal da embreagem? Não. Isto aumenta o desgaste da mesma, do câmbio e
        do motor. Desengate o veículo, quando parar. 18 - Pode-se dirigir com a
        mão segurando a alavanca de câmbio? Não, pois ocorre desgaste das
        engrenagens e dos garfos. 19 - O que é radiador? Trata-se do principal
        elemento do sistema de arrefecimento de um veículo cuja função é
        transferir para o ar ambiente o calor excessivo do fluído, seja ele água
        ou óleo, utilizado para manter estável a temperatura dos principais
        elementos internos de um motor. 20 - Para que servem os aditivos de
        radiador e combustível? Apesar de diferentes entre si, ambos têm como
        função a limpeza das peças com que estão em contato. O aditivo de
        radiador, feito com base em um elemento chamado etilenoglicol, retarda o
        ponto de ebulição da água que refrigera o motor e evita a criação de
        ferrugem nas partes metálicas. Já o aditivo de gasolina tem em sua
        composição solventes químicos que mantêm limpos os bicos do sistema de
        injeção eletrônica. Com isso, o aditivo também limpará a câmara de
        combustão. Recomenda-se utilizá-lo a cada 4 tanques de combustível
        abastecidos. 21 - Posso engatar marchas fortes com o veículo em alta
        velocidade? Não. Isto poderá acarretar a quebra do motor do veículo, do
        seu sistema de embreagem ou da transmissão (voltadas de marchas). 22 -
        Posso comprar um veículo que já foi batido? Sim, porém com cautela.
        Procure seu mecânico de confiança para que o mesmo avalie: • as
        conseqüências da batida; • se o trabalho de recuperação foi bem feito; •
        se os acabamentos originais foram respeitados; • se a textura da pintura
        foi aceitável; • se o monobloco (conjunto da carroceria) foi
        prejudicado. 23 - Se algum veículo for considerado como de perda total
        (P.T.) consegue-se informações sobre ele? Sim. As seguradoras possuem um
        cadastro em que constam as avarias sofridas pelos veículos (somente no
        caso dos segurados) e as fornecem se for necessário. Quando o veículo já
        tiver sido considerado como perda total em alguma seguradora, ele não
        será mais segurado novamente. 24 - O que é longarina? A longarina,
        também conhecida como “caixa de roda” tem como função sustentar os
        pára-lamas e a suspensão dianteira e se encontra na parte da frente do
        veículo ocupando os lados direito e esquerdo do mesmo. Em caso de
        acidente frontal ela amortece a batida, se entorta para a direita, para
        a esquerda ou se encolhe, buscando assim evitar que sejam atingidos os
        ocupantes do veículo. Nos casos de acidentes graves as possibilidades
        citadas são anuladas, entrando em ação o “air-bag”, caso o veículo
        disponha do equipamento. 25 - Quando as longarinas se entortam em
        batidas o veículo está condenado? Não. As longarinas são passíveis de
        troca e o veículo ficará perfeito e seguro. 26 - Por que as siglas dos
        óleos lubrificantes variam tanto: SF, SG, SH, SJ e SL? Os motores variam
        de pressão e temperatura, portanto os óleos têm que acompanhar tais
        variações através da modificação da sua composição. Daí, a variedade de
        siglas. 27 - É necessário aquecer o carro pela manhã para não sair com o
        motor frio? Não. Evite somente aceleradas fortes e aguarde no máximo dez
        segundos para sair. 28 - Posso deixar meu veículo parado por muito tempo
        sem fazê-lo funcionar? Sim, mas os danos podem ser irreversíveis. Se
        houver necessidade dele ficar parado por mais de 30 dias, coloque-o
        sobre cavaletes para evitar o entortamento dos pneus e desligue a
        bateria, porém toda a mecânica irá sofrer danos por oxidação e
        ressecamento. 29 - Quantos cilindros possui o motor dos veículos
        nacionais? Quatro, cinco ou seis cilindros. 30 - Posso deixar a gasolina
        envelhecer no tanque de combustível do veículo? Não, poderá prejudicar o
        funcionamento e até mesmo causar danos gravíssimos ao motor. 31 - Por
        que os motores modernos trabalham com a temperatura mais alta do que os
        antigos? Melhorou-se os ajustes dos motores, dos óleos lubrificantes e
        descobriu-se que os motores com temperaturas mais altas diminuem os
        desgastes, consomem, carbonizam, e poluem menos. 32 - Como os motores a
        ar refrigeram? Com uma ventoinha que gira através da correia do
        alternador. Portanto, quando a luz da bateria acender no painel, com o
        motor em funcionamento, fique atento, pois, poderá ser o alternador que
        deu problema ou a correia que arrebentou. Cuidado: se for a correia que
        arrebentou e o motorista não parar imediatamente, poderá causar sérios
        danos ao motor. 33 - O que cânister? É um filtro, composto com mais uma
        válvula, que retira do tanque os vapores de combustível, levando-o até
        admissão do veículo para que seja queimado, evitando assim, poluição no
        meio ambiente. 34 - O que é o respiro do motor? É um sistema composto
        por canalizações e um filtro que retiram os gases do cárter do motor,
        retornando-os à admissão para requeima, diminuindo assim, a poluição do
        ar. 35 - Em veículos bi-combustível, tem problema se usar só álcool ou
        só gasolina? Não, o sistema é preparado para resistir ambos ou a mistura
        dos dois. Não esqueça de abastecer o reservatório de partida-frio quando
        for usar somente álcool, para facilitar a primeira partida do motor."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="ITENS OBRIGATÓRIOS OU RECOMENDADOS" toMark={toSearch} />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Extintor de incêndio:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Tem como finalidade evitar a propagação de incêndios no veículo
        decorrentes de falhas elétricas ou mecânicas. O extintor não pode
        apresentar sinais de ferrugem ou amassamentos. O lacre de segurança deve
        estar intacto, pois ele é a garantia contra eventuais defeitos. Observe
        sempre o prazo de validade e se o ponteiro indicador de pressão está na
        faixa verde. Localização: ao adquirir um veículo, preocupe-se em
        localizá-lo."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Triângulo de segurança:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Utilizado para assinalar aos outros motoristas que seu veículo
        encontra-se à frente com avarias. Não o coloque muito próximo ao carro
        sob pena de perder a finalidade do mesmo. Localização: encontra-se
        normalmente junto ao compartimento de estepe e demais ferramentas."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Estojo de primeiros socorros:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Deve conter dois rolos de atadura em crepe, um rolo pequeno de
        esparadrapo, dois pacotes de gaze, uma bandagem de algodão, dois pares
        de luvas de procedimento e uma tesoura de ponta rombuda. Localização: os
        materiais deverão estar acondicionados em um mesmo lugar e de fácil
        acesso."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Outros:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Roda sobressalente com pneu (também conhecida como estepe o qual deve
        dispor de pneu que ofereça boa condição de rodagem), cinto de segurança
        para todos os ocupantes do veículo, chave de roda, macaco, chave de
        fenda ou ferramenta para remoção de calotas. É interessante que se tenha
        um cambão para arrasto e um cabo para “chupetas”."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Sinalização:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Pisca-alerta, luzes de freio e faróis devem estar sempre regulados e em
        funcionamento."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold mt-2')}>
        <Mark toText="SEGURANÇA DOS VEÍCULOS" toMark={toSearch} />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Segurança passiva:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Refere-se à estrutura do veículo e tem a função de proteger seus
        ocupantes, diminuindo os danos em caso de acidentes. Não tem relação
        direta com a condução do veículo. Ex.: “air- bag”, barras de proteção
        lateral, etc..."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('mt-2 underline')}>
        <Mark toText="Segurança ativa:" toMark={toSearch} />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Refere-se aos dispositivos oferecidos ao condutor visando prevenir
        situações perigosas e proporcionar maior controle do veículo. Tais
        dispositivos têm relação direta com os procedimentos de direção do
        condutor ampliando as possibilidades de controle. Ex.: ABS, suspensão
        ativa, controle de tração, etc... A segurança ativa implica na interação
        de todos os componentes do veículo com a finalidade de evitar perda de
        aderência ou acidentes. Dentro deste contexto, os pneus são peças
        fundamentais."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Para sua melhor segurança na condução de um veículo observe as seguintes
        sugestões: • verifique sempre se os espelhos retrovisores estão
        regulados de acordo com a sua estatura; • mantenha o cabo interno de
        abertura do capô do motor sempre funcionando corretamente; • nas trocas
        de pneus furados tenha o cuidado de calçar e engrenar o veículo e de
        estacioná-lo de maneira que possa trocá-los sem que você fique exposto
        na pista de rolamento, principalmente nas rodovias; • evite a
        aqüaplanagem; • evite viajar ou trafegar com bagagem solta no
        porta-malas; • as palhetas de limpeza do pára-brisa, bem como a do
        limpador traseiro devem estar sempre em bom estado; • a instalação de
        película “insulfilm” no pára-brisa pode ser prejudicial."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-justify')}>
        <Mark
          toText="Em relação aos espelhos retrovisores deve-se observar o seguinte: o
        espelho interior deve mostrar a maior área possível da estrada e não os
        passageiros. Os exteriores devem mostrar a maior área possível na
        lateral do veículo, deixando sempre como ponto de referência uma pequena
        parte do mesmo."
          toMark={toSearch}
        />
      </Text>
      <Text style={tailwind('text-lg font-bold my-2')}>Referência:</Text>
      <Text style={tailwind('text-sm my-2 text-blue-500')}>
        SOFISTE Mecânica Lataria e Pintura Rua: Atílio Bório, 103 – Cristo Rei.
        Curitiba – Paraná CEP: 80050-250. Fones: 3264-3902 – 9976-4686 e-mail:
        sofistemecanica@uol.com.br Site:
        https://www.mecanicasofiste.com.br/downloads/apostila.pdf
      </Text>
    </View>
  );
};

export default Cap1;
