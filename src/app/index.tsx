import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { demoCredentials, demoUsers, useSession, type UserRole } from '@/context/session';

const services = [
  { id: 'plomeria', icon: '⌁', title: 'Plomería', copy: 'Fugas, grifos y tuberías', price: 'Desde $18.000' },
  { id: 'electricidad', icon: '✦', title: 'Electricidad', copy: 'Instalaciones y reparaciones', price: 'Desde $22.000' },
  { id: 'electrodomesticos', icon: '▦', title: 'Electrodomésticos', copy: 'Reparación en casa', price: 'Desde $25.000' },
  { id: 'cerrajeria', icon: '⌑', title: 'Cerrajería', copy: 'Aperturas y cambios', price: 'Desde $20.000' },
  { id: 'pintura', icon: '◒', title: 'Pintura', copy: 'Muros y terminaciones', price: 'Desde $28.000' },
  { id: 'gas', icon: '♨', title: 'Gasfitería', copy: 'Gas y calefacción', price: 'Desde $24.000' },
  { id: 'jardineria', icon: '✿', title: 'Jardinería', copy: 'Patios y áreas verdes', price: 'Desde $16.000' },
  { id: 'limpieza', icon: '✧', title: 'Limpieza', copy: 'Hogar y oficinas', price: 'Desde $15.000' },
  { id: 'climatizacion', icon: '❄', title: 'Climatización', copy: 'Aire y ventilación', price: 'Desde $30.000' },
  { id: 'mudanzas', icon: '▣', title: 'Mudanzas', copy: 'Traslados y carga', price: 'Desde $35.000' },
];

export default function HomeScreen() {
  const { session, signIn } = useSession();
  const [role, setRole] = useState<UserRole>('cliente');
  const [email, setEmail] = useState<string>(demoCredentials.cliente.email);
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  if (!session) {
    return (
      <SafeAreaView style={styles.loginScreen}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.loginWrap}>
          <View style={styles.logoMark}><ThemedText style={styles.logoIcon}>✦</ThemedText></View>
          <ThemedText style={styles.brand}>ManoCerca</ThemedText>
          <ThemedText style={styles.tagline}>Soluciones confiables, justo cuando las necesitas</ThemedText>
          <View style={styles.loginCard}>
            <ThemedText style={styles.loginTitle}>Bienvenido de vuelta</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.loginSubtitle}>Ingresa para solicitar o brindar servicios</ThemedText>
            <View style={styles.roleSwitch}>
              {(['cliente', 'tecnico'] as UserRole[]).map((option) => (
                <Pressable key={option} onPress={() => { setRole(option); setEmail(demoCredentials[option].email); setError(''); }} style={[styles.roleButton, role === option && styles.roleButtonActive]}>
                  <ThemedText style={[styles.roleText, role === option && styles.roleTextActive]}>{option === 'cliente' ? 'Cliente' : 'Técnico'}</ThemedText>
                </Pressable>
              ))}
            </View>
            <ThemedText style={styles.fieldLabel}>Correo electrónico</ThemedText>
            <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} placeholder="tu@correo.com" placeholderTextColor="#98A0AF" />
            <ThemedText style={styles.fieldLabel}>Contraseña</ThemedText>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} placeholder="••••••••" placeholderTextColor="#98A0AF" />
            {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
            <Pressable style={styles.primaryButton} onPress={() => { if (!signIn(role, email, password)) setError('Usa los datos demo mostrados abajo.'); }}>
              <ThemedText style={styles.primaryButtonText}>Iniciar sesión  ›</ThemedText>
            </Pressable>
            <ThemedText themeColor="textSecondary" style={styles.demoHint}>Pruebas: {demoUsers[role].map((account) => account.email).join(' · ')}{`\n`}Clave para todas: 123456</ThemedText>
          </View>
          <ThemedText themeColor="textSecondary" style={styles.signup}>¿Aún no tienes cuenta? <ThemedText style={styles.linkText}>Crear cuenta</ThemedText></ThemedText>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <ThemedView style={styles.appScreen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}><View><ThemedText themeColor="textSecondary" style={styles.eyebrow}>MANOCERCA / INICIO</ThemedText><ThemedText style={styles.greeting}>¡Hola, {session.name}! <ThemedText style={styles.wave}>✦</ThemedText></ThemedText></View><View style={styles.avatar}><ThemedText style={styles.avatarText}>{session.name[0]}</ThemedText></View></View>
          <View style={styles.address}><ThemedText style={styles.pin}>⌖</ThemedText><ThemedText style={styles.addressText}>Casa · Av. Providencia 1420, Depto 402</ThemedText><ThemedText themeColor="textSecondary">⌄</ThemedText></View>
          <View style={styles.searchBox}><ThemedText style={styles.searchIcon}>⌕</ThemedText><TextInput value={search} onChangeText={setSearch} onSubmitEditing={() => search.trim() && router.push(`/explore?search=${encodeURIComponent(search.trim())}` as never)} returnKeyType="search" placeholder="Buscar plomero, electricista..." placeholderTextColor="#9299A8" style={styles.searchInput} /><Pressable onPress={() => search.trim() && router.push(`/explore?search=${encodeURIComponent(search.trim())}` as never)}><ThemedText style={styles.filterIcon}>⌕</ThemedText></Pressable></View>
          <View style={styles.promo}><View><ThemedText style={styles.promoKicker}>SERVICIO EXPRESS</ThemedText><ThemedText style={styles.promoTitle}>Un experto en tu puerta{`\n`}en menos de 30 minutos</ThemedText></View><ThemedText style={styles.promoIcon}>✦</ThemedText></View>
          <View style={styles.sectionHeading}><ThemedText style={styles.sectionTitle}>Especialidades</ThemedText><Pressable onPress={() => router.push('/explore')}><ThemedText style={styles.seeAll}>Ver todas  ›</ThemedText></Pressable></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>{services.map((service, index) => <Pressable key={service.id} onPress={() => router.push(`/explore?category=${service.id}` as never)} style={[styles.category, index === 0 && styles.categoryActive]}><ThemedText style={styles.categoryIcon}>{service.icon}</ThemedText><ThemedText style={[styles.categoryLabel, index === 0 && styles.categoryLabelActive]}>{service.title}</ThemedText></Pressable>)}</ScrollView>
          <View style={styles.sectionHeading}><ThemedText style={styles.sectionTitle}>Técnicos disponibles cerca</ThemedText><ThemedText style={styles.seeAll}>Ver especialidades  ›</ThemedText></View>
          <Pressable onPress={() => router.push('/explore?category=plomeria' as never)} style={styles.technicianCard}><View style={styles.techAvatar}><ThemedText style={styles.techAvatarText}>RM</ThemedText></View><View style={styles.techInfo}><ThemedText style={styles.techName}>Roberto Méndez <ThemedText style={styles.verified}>●</ThemedText></ThemedText><ThemedText themeColor="textSecondary" style={styles.techRole}>Plomero · Maestro certificado</ThemedText><ThemedText themeColor="textSecondary" style={styles.techMeta}>★ 4.9 (126) · Llega en 12 min</ThemedText></View><ThemedText style={styles.chevron}>›</ThemedText><View style={styles.techBottom}><ThemedText themeColor="textSecondary" style={styles.techSkills}>Fugas   Tuberías   Calefones</ThemedText><ThemedText style={styles.techPrice}>Ver técnicos  ›</ThemedText></View></Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loginScreen: { flex: 1, backgroundColor: '#F4F6FA' }, loginWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }, logoMark: { width: 62, height: 62, borderRadius: 20, backgroundColor: '#5657D9', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }, logoIcon: { color: '#FFF', fontSize: 28 }, brand: { color: '#24263D', fontSize: 28, fontWeight: '800' }, tagline: { color: '#8890A3', fontSize: 13, marginTop: 5, marginBottom: 28 }, loginCard: { width: '100%', maxWidth: 420, backgroundColor: '#FFF', borderRadius: 22, padding: 24, shadowColor: '#26345B', shadowOpacity: 0.08, shadowRadius: 20, elevation: 4 }, loginTitle: { color: '#272940', fontSize: 21, fontWeight: '800' }, loginSubtitle: { fontSize: 13, marginTop: 6, marginBottom: 20 }, roleSwitch: { flexDirection: 'row', backgroundColor: '#F1F2F7', borderRadius: 12, padding: 4, marginBottom: 20 }, roleButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 9 }, roleButtonActive: { backgroundColor: '#6763DD' }, roleText: { fontSize: 13, fontWeight: '700', color: '#858B9A' }, roleTextActive: { color: '#FFF' }, fieldLabel: { color: '#555B6E', fontSize: 12, fontWeight: '700', marginBottom: 7, marginTop: 4 }, input: { height: 48, borderRadius: 11, borderWidth: 1, borderColor: '#E1E4EC', paddingHorizontal: 14, color: '#25283C', marginBottom: 12, fontSize: 14 }, primaryButton: { backgroundColor: '#6260D9', borderRadius: 12, minHeight: 50, alignItems: 'center', justifyContent: 'center', marginTop: 7 }, primaryButtonText: { color: '#FFF', fontSize: 14, fontWeight: '800' }, demoHint: { textAlign: 'center', fontSize: 11, marginTop: 14 }, error: { color: '#D64D67', fontSize: 12, marginBottom: 3 }, signup: { fontSize: 12, marginTop: 22 }, linkText: { color: '#6260D9', fontWeight: '700' }, appScreen: { flex: 1, backgroundColor: '#F7F8FC' }, safeArea: { flex: 1 }, content: { padding: 20, paddingBottom: 110 }, topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }, eyebrow: { fontSize: 10, letterSpacing: 1.4, fontWeight: '800' }, greeting: { fontSize: 25, fontWeight: '800', color: '#272940', marginTop: 5 }, wave: { color: '#F3A542', fontSize: 21 }, avatar: { width: 40, height: 40, backgroundColor: '#D8E4FF', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#4159A8', fontWeight: '800' }, address: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 7 }, pin: { color: '#6260D9', fontSize: 18 }, addressText: { flex: 1, color: '#565C70', fontSize: 12, fontWeight: '600' }, searchBox: { height: 50, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EBECF2', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginBottom: 16 }, searchIcon: { color: '#9299A8', fontSize: 23, marginRight: 8 }, searchInput: { flex: 1, color: '#34384D', fontSize: 13 }, filterIcon: { color: '#6A68DB', fontSize: 20 }, promo: { backgroundColor: '#6260D9', borderRadius: 18, padding: 19, flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden', marginBottom: 22 }, promoKicker: { color: '#D9D9FF', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, promoTitle: { color: '#FFF', fontSize: 16, fontWeight: '800', lineHeight: 22, marginTop: 8 }, promoIcon: { color: '#A7A4FF', fontSize: 46, alignSelf: 'center', opacity: 0.8 }, sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }, sectionTitle: { color: '#2B2E42', fontSize: 16, fontWeight: '800' }, seeAll: { color: '#6260D9', fontSize: 11, fontWeight: '800' }, categoryRow: { gap: 10, paddingBottom: 25 }, category: { minWidth: 104, height: 78, padding: 12, justifyContent: 'space-between', borderRadius: 14, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#ECEEF4' }, categoryActive: { backgroundColor: '#6663DC', borderColor: '#6663DC' }, categoryIcon: { color: '#6260D9', fontSize: 20 }, categoryLabel: { color: '#44495B', fontSize: 11, fontWeight: '700' }, categoryLabelActive: { color: '#FFF' }, technicianCard: { backgroundColor: '#FFF', borderRadius: 17, padding: 15, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: '#ECEEF4' }, techAvatar: { width: 50, height: 50, borderRadius: 16, backgroundColor: '#DCE8E2', justifyContent: 'center', alignItems: 'center' }, techAvatarText: { color: '#39755B', fontWeight: '800' }, techInfo: { flex: 1, paddingLeft: 12 }, techName: { color: '#2C3044', fontSize: 14, fontWeight: '800' }, verified: { color: '#5962D5', fontSize: 10 }, techRole: { fontSize: 11, marginTop: 3 }, techMeta: { fontSize: 10, marginTop: 5 }, chevron: { color: '#6A68DB', fontSize: 26 }, techBottom: { width: '100%', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F1F5', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, techSkills: { fontSize: 10 }, techPrice: { color: '#323650', fontSize: 13, fontWeight: '800' },
});
