import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<Props>();

  const cadastrar = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "Senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);

      Alert.alert("Sucesso", "Conta criada!");
      navigation.replace('Home');

    } catch (error: any) {
      let msg = "Erro ao cadastrar";

      if (error.code === "auth/email-already-in-use") {
        msg = "Email já está em uso";
      } else if (error.code === "auth/invalid-email") {
        msg = "Email inválido";
      } else if (error.code === "auth/weak-password") {
        msg = "Senha fraca";
      }

      Alert.alert("Erro", msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Cadastrar" onPress={cadastrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 }
});