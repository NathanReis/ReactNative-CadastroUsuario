import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../services/UserService';
import styles from './styles';

export function UserRegistration() {
  async function handleSave() {
    try {
      let user: IUser = { code, name, email, password };
      let userService = new UserService();
      let errors = isNewUser
        ? await userService.create(user, passwordConfirmation)
        : await userService.update(user, passwordConfirmation);

      if (errors && errors.length > 0) {
        Alert.alert('Validação', errors.join('\n'));
      } else {
        Alert.alert('Sucesso', 'Dados salvos!');
        setIsNewUser(true);
        await loadData();
      }
    } catch (exception) {
      Alert.alert('Erro', 'Houve um erro ao salvar os dados!');
    }
  }

  async function handleFind(code: number) {
    try {
      let userService = new UserService();
      let user = await userService.getByCode(code);

      if (user === null) {
        Alert.alert('Aviso', 'Usuário não encontrado.');
      } else {
        setCode(user.code);
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setIsNewUser(false);
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
    setIsNewUser(true);
  }

  async function handleDelete(code: number) {
    let userService = new UserService();
    await userService.delete(code);
    await loadData();
  }

  async function handleDeleteAll() {
    let userService = new UserService();

    for (let savedUser of savedUsers) {
      await userService.delete(savedUser.code);
    }

    await loadData();
  }

  async function loadData() {
    let userService = new UserService();

    setSavedUsers(await userService.getAll());
  }

  let [code, setCode] = useState<number>(0);
  let [name, setName] = useState<string>('');
  let [email, setEmail] = useState<string>('');
  let [password, setPassword] = useState<string>('');
  let [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  let [savedUsers, setSavedUsers] = useState<IUser[]>([]);
  let [isNewUser, setIsNewUser] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>CADASTRO DE{'\n'}USUÁRIOS</Text>

              <View style={styles.lineFormContainer}>
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

              <View style={styles.lineFormContainer}>
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

              <View style={styles.lineFormContainer}>
                <Button title='SALVAR' onPress={handleSave} />
                <Button title='LIMPAR' onPress={handleClear} />
              </View>
            </View>

            <View style={styles.listContainer}>
              <FlatList
                style={styles.list}
                data={savedUsers}
                renderItem={({ item }) => (
                  <View style={styles.listItemContainer}>
                    <View style={styles.listItemInfos}>
                      <Text style={styles.listName}>{item.name}</Text>
                      <Text style={styles.listEmail}>{item.email}</Text>
                    </View>
                    <View style={styles.listItemActions}>
                      <TouchableOpacity style={styles.listItemIcon} onPress={() => handleFind(item.code)}>
                        <FontAwesome5 name='edit' size={24} color='black' />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.listItemIcon} onPress={() => handleDelete(item.code)}>
                        <FontAwesome5 name='trash' size={24} color='black' />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 2 }}></View>}
                keyExtractor={saved_user => String(saved_user.code)}
              />

              <Button title='APAGAR TDOOS' onPress={handleDeleteAll} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
