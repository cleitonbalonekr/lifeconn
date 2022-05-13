/* eslint-disable new-cap */
import * as Speech from 'expo-speech';

import { CALLS_BALANCE_TOKEN } from '@/configs/index';
import { Call } from '@/domain/models/Call';
import {
  phoneTextTTS,
  codeTextTTS,
  phoneTextCords
} from '@/presentation/shared/services/tts/formatTextSpeed';

const totalvoice = require('totalvoice-node');

interface Props {
  name: string;
  phone: string;
  token: string;
  location: Call.Location;
  totalVoiceToken?: string;
}

const registerTTS = ({
  name,
  phone,
  token,
  location,
  totalVoiceToken
}: Props) => {
  const text = `Olá atendente sou a assistente da plataforma laificom,
  gostaria de solicitar um resgate para ${name},
  telefone ${phoneTextTTS(phone)},
  localização: latitude ${phoneTextCords(String(location.latitude))},
  longitude: ${phoneTextCords(String(location.longitude))},
  para mais informações acesse a plataforma web laificom,
  e digite o código, prepare-se para anotar o código,,,,,,,,,,,,,,,,,,,,
  irei falar o código agora,,,,
  código,,, ${codeTextTTS(token)},
  repetindo o código novamente,,,,,
  ${codeTextTTS(token)},
  repetindo o código novamente,,,,,
  ${codeTextTTS(token)}
  repetindo o código novamente,,,,,
  ${codeTextTTS(token)}`;

  Speech.speak(text);

  let client;

  /* if (totalVoiceToken) client = new totalvoice(totalVoiceToken);
  else client = new totalvoice(CALLS_BALANCE_TOKEN);

  client.tts
    .enviar('22981533173', text, {
      velocidade: 2,
      tipo_voz: 'br-Vitoria'
    })
    .then(function (data: any) {
      console.log(data);
    })
    .catch(function (error: any) {
      console.log('Erro: ', error);
    }); */
};

export default registerTTS;
