import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface IButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export function Button(props: IButtonProps) {
  let { title, onPress } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
