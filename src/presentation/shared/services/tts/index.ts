/* eslint-disable new-cap */
import { CALLS_BALANCE_TOKEN, CALL_NUMBER_EMERGENCY } from '@/configs/index';
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

const registerTTS = async ({
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

  let client;

  if (totalVoiceToken) client = new totalvoice(totalVoiceToken);
  else client = new totalvoice(CALLS_BALANCE_TOKEN);

  const result = await client.tts.enviar(CALL_NUMBER_EMERGENCY, text, {
    velocidade: 2,
    tipo_voz: 'br-Vitoria'
  });

  return result.data;
};

export default registerTTS;
