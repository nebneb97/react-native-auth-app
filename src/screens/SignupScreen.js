import React, { useState } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { validateSignup } from '../utils/validation';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fonts } from '../theme';

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(''); // e.g. "email already exists"
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setAuthError('');
    const validation = validateSignup({ name, email, password });
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      await signup(name, email, password);
      // User is logged in automatically; navigator switches to Home.
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <View style={styles.card}>
          {!!authError && (
            <View style={styles.banner}>
              <Text style={styles.bannerText}>{authError}</Text>
            </View>
          )}

          <FormInput
            label="Name"
            icon="person-outline"
            placeholder="Your full name"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />
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
            placeholder="At least 6 characters"
            secure
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <PrimaryButton title="Signup" onPress={handleSignup} loading={loading} />
          <PrimaryButton title="Go to Login" variant="outline" onPress={() => navigation.navigate('Login')} />
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
