/* eslint-disable new-cap */
import * as Speech from 'expo-speech';

import { CallLocation } from '@/domain/models/Call';
import {
  phoneTextTTS,
  codeTextTTS
} from '@/presentation/shared/services/tts/formatTextSpeed';

const totalvoice = require('totalvoice-node');

const client = new totalvoice('access-token');

interface Props {
  name: string;
  phone: string;
  token: string;
  location: CallLocation;
}

const registerTTS = ({ name, phone, token, location }: Props) => {
  const text = `Olá atendente sou a assistente da plataforma laificom,
  gostaria de solicitar um resgate para ${name},
  telefone ${phoneTextTTS(phone)},
  localização: latitude ${codeTextTTS(String(location.latitude))},
  longitude: ${codeTextTTS(String(location.longitude))},
  para mais informações acesse a plataforma web laificom,
  e digite o código ${codeTextTTS(token)}`;

  Speech.speak(text);

  /* client.tts
    .enviar('22981533173', text, {
      velocidade: 2,
      tipo_voz: 'br-Vitoria',
      bina: 'bina_cadastrada'
    })
    .then(function (data: any) {
      console.log(data);
    })
    .catch(function (error: any) {
      console.log('Erro: ', error);
    }); */
};

export default registerTTS;
