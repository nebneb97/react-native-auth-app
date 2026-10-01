import React, { useState } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validation';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fonts } from '../theme';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});       // field-level format errors
  const [authError, setAuthError] = useState(''); // "incorrect credentials" error
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setAuthError('');
    const validation = validateLogin({ email, password });
    setErrors(validation);
    if (Object.keys(validation).length > 0) return; // stop on format errors

    setLoading(true);
    try {
      await login(email, password);
      // No navigate() needed: the navigator switches to Home when `user` is set.
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Log in to continue</Text>

        <View style={styles.card}>
          {!!authError && (
            <View style={styles.banner}>
              <Text style={styles.bannerText}>{authError}</Text>
            </View>
          )}

          <FormInput
            label="Email"
            icon="mail-outline"
            placeholder="you@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <FormInput
            label="Password"
            icon="lock-closed-outline"
            placeholder="Your password"
            secure
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <PrimaryButton title="Login" onPress={handleLogin} loading={loading} />
          <PrimaryButton title="Go to Signup" variant="outline" onPress={() => navigation.navigate('Signup')} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 30, fontFamily: fonts.extraBold, color: colors.text },
  subtitle: { fontSize: 16, fontFamily: fonts.regular, color: colors.muted, marginTop: 4, marginBottom: 24 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  banner: {
    backgroundColor: colors.errorBg,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  bannerText: { color: colors.error, fontFamily: fonts.semiBold },
});
