import { format } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props {
  received: boolean;
  content: string;
  createdAt: Date;
}
const MessageContent: React.FC<Props> = ({ received, content, createdAt }) => {
  const tailwind = useTailwind();
  const formatDate = (date: Date) => {
    return format(date, 'dd/MM/yyyy HH:mm');
  };
  return (
    <>
      {!received ? (
        <View style={tailwind('bg-teal-200 rounded-lg p-2 ml-24 mb-2')}>
          <Text style={tailwind('text-sm mb-2 font-ubuntu')}>{content}</Text>
          <Text style={tailwind('text-xs font-ubuntu')}>
            {`${formatDate(createdAt)}`}
          </Text>
        </View>
      ) : (
        <View style={tailwind('bg-gray-200 rounded-lg p-2 mr-24 mb-2')}>
          <Text style={tailwind('text-sm mb-2 font-ubuntu')}>{content}</Text>
          <Text style={tailwind('text-xs font-ubuntu')}>
            {`${formatDate(createdAt)}`}
          </Text>
        </View>
      )}
    </>
  );
};

export default MessageContent;
