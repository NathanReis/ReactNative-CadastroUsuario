import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import styles from './styles';

interface IInputProps {
  keyboardType?: KeyboardTypeOptions;
  label: string;
  secureTextEntry?: boolean;
  value: number | string;
  width: number;
  onChangeText?: (text: string) => void;
}

export function Input(props: IInputProps) {
  let { keyboardType, label, secureTextEntry, value, width, onChangeText } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType || 'default'}
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          { width }
        ]}
        value={value ? String(value) : ''}
        onChangeText={onChangeText}
      />
    </View>
  );
}
