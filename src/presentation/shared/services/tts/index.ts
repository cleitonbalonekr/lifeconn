/* eslint-disable new-cap */
import * as Speech from 'expo-speech';

const totalvoice = require('totalvoice-node');

const client = new totalvoice('access-token');

interface Props {
  name: string;
  phone: string;
  token: string;
}

const registerTTS = ({ name, phone, token }: Props) => {
  const text = `Olá atendente sou a assistente da plataforma laificom,
  gostaria de solicitiar um resgate para ${name},
  telefone ${phone}, localização: latitude xxxxxx, longitude: yyyyyyy,
  para mais informações acesse a plataforma web laificom, e digite o código ${token}`;

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
