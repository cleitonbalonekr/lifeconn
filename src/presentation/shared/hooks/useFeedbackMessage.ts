// import { AppException, codes } from '@errors/index';
import Toast from 'react-native-toast-message';

type Parameters = {
  title?: string;
  description: string;
};

const DEFAULT_MESSAGE = {
  title: 'Tudo certo!'
};
const useFeedbackMessage = () => {
  function showSuccess(params: Parameters) {
    Toast.show({
      type: 'success',
      text1: params.title || DEFAULT_MESSAGE.title,
      text2: params.description,
      visibilityTime: 5000
    });
  }
  function showError(error: Error | string) {
    Toast.show({
      type: 'error',
      text1: 'Algo deu errado',
      text2: typeof error === 'string' ? error : error.message,
      position: 'top',
      visibilityTime: 5000
    });
    // console.log(`[1${errorCode}]`, error);
  }

  return { showSuccess, showError };
};

export default useFeedbackMessage;
