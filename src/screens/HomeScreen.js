import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fonts } from '../theme';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const initial = user?.name?.charAt(0).toUpperCase() ?? '?';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <Text style={styles.greeting}>Hello, {user?.name}!</Text>
        <Text style={styles.caption}>You are logged in.</Text>

        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>{user?.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>{user?.email}</Text>
        </View>

        {/* Logging out clears `user`, so the navigator shows the Login screen again */}
        <PrimaryButton title="Logout" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 24 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  avatarText: { color: colors.onPrimary, fontSize: 34, fontFamily: fonts.extraBold },
  greeting: { fontSize: 24, fontFamily: fonts.extraBold, color: colors.text, textAlign: 'center' },
  caption: { fontSize: 15, fontFamily: fonts.regular, color: colors.muted, textAlign: 'center', marginBottom: 20 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  infoText: { marginLeft: 10, fontSize: 16, fontFamily: fonts.regular, color: colors.text },
});
