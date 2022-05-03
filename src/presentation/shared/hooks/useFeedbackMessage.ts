import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Toast from 'react-native-toast-message';

type Parameters = {
  title?: string;
  description: string;
};

const DEFAULT_MESSAGE = {
  title: 'Tudo certo!'
};
const { height } = Dimensions.get('window');
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
  function showWaiting(message: string) {
    Toast.show({
      type: 'info',
      text1: message,
      autoHide: false,
      position: 'bottom',
      bottomOffset: height * 0.12,
      onPress: () => Toast.hide()
    });
  }
  function hide() {
    Toast.hide();
  }

  return { showSuccess, showError, showWaiting, hide };
};

export default useFeedbackMessage;
