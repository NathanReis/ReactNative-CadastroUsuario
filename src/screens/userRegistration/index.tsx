import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { IUser } from '../../interfaces/IUser';
import { UserValidator } from '../../validators/UserValidator';
import styles from './styles';

export function UserRegistration() {
  async function handleSave() {
    try {
      let user: IUser = { code, name, email, password };
      let errors = UserValidator.validate(user, passwordConfirmation);

      if (errors.length === 0) {
        await AsyncStorage.setItem('@user_registration:user', JSON.stringify(user));

        Alert.alert('Sucesso', 'Dados salvos!');
      } else {
        Alert.alert('Validação', errors.join('\n'));
      }
    } catch (exception) {
      Alert.alert('Erro', 'Houve um erro ao salvar os dados!');
    }
  }

  async function handleLoad() {
    try {
      let userData = await AsyncStorage.getItem('@user_registration:user')

      if (userData === null) {
        Alert.alert('Aviso', 'Ainda não existem dados salvos.');
      } else {
        let user = JSON.parse(userData) as IUser;

        setCode(user.code);
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
      }
    } catch (e) {
      Alert.alert('Erro', 'Houve um erro ao buscar os dados!');
    }
  }

  function handleClear() {
    setCode(0);
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  }

  let [code, setCode] = useState<number>(0);
  let [name, setName] = useState<string>('');
  let [email, setEmail] = useState<string>('');
  let [password, setPassword] = useState<string>('');
  let [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADASTRO DE USUÁRIO</Text>

      <View style={styles.lineContainer}>
        <Input
          keyboardType='numeric'
          label='CÓDIGO'
          value={code}
          width={80}
          onChangeText={(text) => setCode(Number(text))}
        />

        <Input label='NOME' value={name} width={240} onChangeText={setName} />
      </View>

      <Input
        keyboardType='email-address'
        label='E-MAIL'
        value={email}
        width={320}
        onChangeText={setEmail}
      />

      <View style={styles.lineContainer}>
        <Input
          label='SENHA'
          secureTextEntry={true}
          value={password}
          width={180}
          onChangeText={setPassword}
        />

        <Input
          label='CONFIRMAR SENHA'
          secureTextEntry={true}
          value={passwordConfirmation}
          width={180}
          onChangeText={setPasswordConfirmation}
        />
      </View>

      <View style={styles.lineContainer}>
        <Button title='SALVAR' onPress={handleSave} />
        <Button title='CARREGAR' onPress={handleLoad} />
      </View>

      <Button title='LIMPAR' onPress={handleClear} />
    </View>
  );
}
