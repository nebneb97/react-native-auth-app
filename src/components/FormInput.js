import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

/**
 * Labeled text input with an inline error message.
 * Pass `secure` for password fields: it adds an eye icon that toggles visibility (bonus task).
 */
export default function FormInput({ label, error, secure = false, icon, ...inputProps }) {
  const [hidden, setHidden] = useState(secure);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error && styles.inputRowError]}>
        {icon && <Ionicons name={icon} size={20} color={colors.muted} style={styles.leftIcon} />}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.muted}
          secureTextEntry={hidden}
          autoCapitalize="none"
          {...inputProps}
        />
        {secure && (
          <TouchableOpacity
            onPress={() => setHidden((h) => !h)}
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={22} color={colors.muted} />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 14, fontFamily: fonts.semiBold, color: colors.text, marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 12,
  },
  inputRowError: { borderColor: colors.error, backgroundColor: colors.errorBg },
  leftIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 16, fontFamily: fonts.regular, color: colors.text },
  error: { color: colors.error, fontSize: 13, fontFamily: fonts.regular, marginTop: 4 },
});
