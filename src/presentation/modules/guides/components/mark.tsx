/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props {
  toMark: string;
  toText: string;
}

const Mark: React.FC<Props> = ({ toText, toMark }: any) => {
  const tailwind = useTailwind();
  const regex = new RegExp(`(${toMark})`, 'i');
  if (toMark !== '') {
    return toText
      .split(regex)
      .map((chunk: string | null | undefined, index: React.Key) => {
        if (chunk?.toUpperCase() === toMark.toUpperCase()) {
          return (
            <Text key={index} style={tailwind('bg-orange-400 text-black')}>
              {chunk}
            </Text>
          );
        }
        return chunk;
      });
  }
  return toText;
};

export default Mark;
