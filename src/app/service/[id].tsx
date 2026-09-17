import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const services: Record<string, { title: string; price: string; technician: string; role: string }> = {
  plomeria: { title: 'Plomería', price: '$18.000', technician: 'Roberto Méndez', role: 'Plomero · Maestro certificado' },
  electricidad: { title: 'Electricidad', price: '$22.000', technician: 'Daniela Soto', role: 'Electricista certificada' },
  electrodomesticos: { title: 'Electrodomésticos', price: '$25.000', technician: 'Mateo Rojas', role: 'Técnico en línea blanca' },
  cerrajeria: { title: 'Cerrajería', price: '$20.000', technician: 'Andrés Vidal', role: 'Cerrajero de urgencias' },
  pintura: { title: 'Pintura', price: '$28.000', technician: 'Camila León', role: 'Maestra pintora' },
};

const client = { latitude: -33.4318, longitude: -70.6096 };
const technician = { latitude: -33.4257, longitude: -70.6152 };
const route = [technician, { latitude: -33.4278, longitude: -70.6128 }, { latitude: -33.4292, longitude: -70.6115 }, client];

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = services[id ?? 'plomeria'] ?? services.plomeria;
  return (
    <ThemedView style={styles.screen}><SafeAreaView style={styles.safe}>
      <View style={styles.mapFrame}><MapView style={styles.map} initialRegion={{ ...client, latitudeDelta: 0.018, longitudeDelta: 0.018 }} showsCompass showsScale zoomEnabled rotateEnabled scrollEnabled toolbarEnabled><UrlTile urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png" maximumZ={19} flipY={false} tileSize={256} /><Polyline coordinates={route} strokeColor="#0B7C78" strokeWidth={5} /><Marker coordinate={client} title="Tu domicilio" description="Av. Providencia 1420" pinColor="#FF7557" /><Marker coordinate={technician} title={service.technician} description={service.role} pinColor="#0B7C78" /></MapView><View style={styles.mapHeader}><Pressable onPress={() => router.back()} style={styles.back}><ThemedText style={styles.backText}>‹</ThemedText></Pressable><View style={styles.mapLabel}><ThemedText style={styles.mapTitle}>Técnico en camino</ThemedText><ThemedText themeColor="textSecondary" style={styles.mapSub}>Mapa real de OpenStreetMap</ThemedText></View></View></View>
      <View style={styles.sheet}><View style={styles.handle} /><View style={styles.statusRow}><View style={styles.statusDot} /><ThemedText style={styles.status}>En camino · Llega en 12 min</ThemedText><ThemedText themeColor="textSecondary" style={styles.distance}>1,8 km</ThemedText></View><View style={styles.progress}><View style={styles.progressFill} /></View><ThemedText themeColor="textSecondary" style={styles.address}>Av. Providencia 1420, Depto 402, Santiago</ThemedText><View style={styles.divider} /><View style={styles.personRow}><View style={styles.avatar}><ThemedText style={styles.avatarText}>{service.technician.split(' ').map((name) => name[0]).join('')}</ThemedText></View><View style={styles.personCopy}><ThemedText style={styles.personName}>{service.technician} <ThemedText style={styles.verified}>●</ThemedText></ThemedText><ThemedText themeColor="textSecondary" style={styles.personRole}>{service.role}</ThemedText><ThemedText themeColor="textSecondary" style={styles.rating}>★ 4.9 · 126 servicios</ThemedText></View><Pressable style={styles.call}><ThemedText style={styles.callText}>☎</ThemedText></Pressable></View><View style={styles.summary}><ThemedText themeColor="textSecondary" style={styles.summaryLabel}>Servicio solicitado</ThemedText><ThemedText style={styles.summaryValue}>{service.title} · {service.price}</ThemedText></View><Pressable style={styles.cancel} onPress={() => router.back()}><ThemedText style={styles.cancelText}>Cancelar servicio</ThemedText></Pressable></View>
    </SafeAreaView></ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8FC' }, safe: { flex: 1 }, mapFrame: { flex: 1, overflow: 'hidden' }, map: { flex: 1 }, mapHeader: { position: 'absolute', top: 12, left: 16, right: 16, flexDirection: 'row', gap: 11 }, back: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', elevation: 4 }, backText: { color: '#303449', fontSize: 28 }, mapLabel: { flex: 1, backgroundColor: '#FFF', borderRadius: 13, padding: 9, elevation: 3 }, mapTitle: { color: '#34384D', fontSize: 12, fontWeight: '800' }, mapSub: { fontSize: 9, marginTop: 2 }, sheet: { backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, paddingTop: 10, paddingBottom: 18 }, handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: '#D9DCE6', alignSelf: 'center', marginBottom: 14 }, statusRow: { flexDirection: 'row', alignItems: 'center' }, statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#0B7C78', marginRight: 7 }, status: { flex: 1, color: '#292E43', fontSize: 13, fontWeight: '800' }, distance: { fontSize: 11 }, progress: { height: 4, backgroundColor: '#E7EAEA', borderRadius: 3, marginVertical: 12 }, progressFill: { width: '66%', height: 4, backgroundColor: '#0B7C78', borderRadius: 3 }, address: { fontSize: 11 }, divider: { height: 1, backgroundColor: '#EFF0F4', marginVertical: 14 }, personRow: { flexDirection: 'row', alignItems: 'center' }, avatar: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#DDF1EF', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#0B7C78', fontWeight: '800' }, personCopy: { flex: 1, paddingLeft: 11 }, personName: { color: '#2C3044', fontWeight: '800', fontSize: 13 }, verified: { color: '#0B7C78', fontSize: 9 }, personRole: { fontSize: 10, marginTop: 3 }, rating: { fontSize: 10, marginTop: 3 }, call: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#EAF7F5', alignItems: 'center', justifyContent: 'center' }, callText: { color: '#0B7C78', fontSize: 17 }, summary: { backgroundColor: '#F7F8FC', borderRadius: 11, padding: 11, marginTop: 14 }, summaryLabel: { fontSize: 10 }, summaryValue: { color: '#323650', fontSize: 12, fontWeight: '800', marginTop: 3 }, cancel: { alignItems: 'center', paddingTop: 15 }, cancelText: { color: '#C35D70', fontSize: 12, fontWeight: '700' },
});
