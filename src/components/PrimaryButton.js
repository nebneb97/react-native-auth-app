import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

// variant: 'solid' (filled) or 'outline' (secondary action)
export default function PrimaryButton({ title, onPress, loading = false, variant = 'solid' }) {
  const outline = variant === 'outline';
  return (
    <TouchableOpacity
      style={[styles.button, outline && styles.outline, loading && styles.disabled]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={outline ? colors.primary : colors.onPrimary} />
      ) : (
        <Text style={[styles.text, outline && styles.outlineText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
  disabled: { opacity: 0.7 },
  text: { color: colors.onPrimary, fontSize: 16, fontFamily: fonts.bold },
  outlineText: { color: colors.primary },
});
