import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSession } from '@/context/session';

const serviceRoutes = {
  plomeria: { client: { latitude: -33.4318, longitude: -70.6096 }, technician: { latitude: -33.4257, longitude: -70.6152 }, title: 'Plomería', address: 'Av. Providencia 1420' },
  electricidad: { client: { latitude: -33.4268, longitude: -70.6172 }, technician: { latitude: -33.4224, longitude: -70.6085 }, title: 'Electricidad', address: 'Av. Los Leones 880' },
  cerrajeria: { client: { latitude: -33.4382, longitude: -70.6261 }, technician: { latitude: -33.4331, longitude: -70.6195 }, title: 'Cerrajería', address: 'Av. Italia 1240' },
  pintura: { client: { latitude: -33.4188, longitude: -70.6027 }, technician: { latitude: -33.4252, longitude: -70.6091 }, title: 'Pintura', address: 'Av. El Cerro 540' },
  jardineria: { client: { latitude: -33.4442, longitude: -70.6048 }, technician: { latitude: -33.4371, longitude: -70.6122 }, title: 'Jardinería', address: 'Av. Bilbao 3050' },
  default: { client: { latitude: -33.4318, longitude: -70.6096 }, technician: { latitude: -33.4257, longitude: -70.6152 }, title: 'Servicio', address: 'Av. Providencia 1420' },
} as const;

export default function MapScreen() {
  const { session } = useSession();
  const { service: serviceParam, technician: technicianParam } = useLocalSearchParams<{ service?: string; technician?: string }>();
  const selected = serviceRoutes[serviceParam as keyof typeof serviceRoutes] ?? serviceRoutes.default;
  const route = [selected.technician, { latitude: (selected.technician.latitude + selected.client.latitude) / 2, longitude: selected.technician.longitude }, selected.client];
  const isTechnician = session?.role === 'tecnico';
  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.mapFrame}>
          <MapView style={styles.map} initialRegion={{ ...selected.client, latitudeDelta: 0.018, longitudeDelta: 0.018 }} showsUserLocation={false} showsCompass showsScale zoomEnabled rotateEnabled scrollEnabled toolbarEnabled>
            <UrlTile urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png" maximumZ={19} flipY={false} tileSize={256} />
            <Polyline coordinates={route} strokeColor="#0B7C78" strokeWidth={5} lineDashPattern={[1]} />
            <Marker coordinate={selected.client} title={`Cliente · ${selected.title}`} description={selected.address} pinColor="#FF7557" />
            <Marker coordinate={selected.technician} title={technicianParam ?? 'Técnico en camino'} description={selected.title} pinColor="#0B7C78" />
          </MapView>
          <View style={styles.header}><Pressable onPress={() => router.back()} style={styles.back}><ThemedText style={styles.backText}>‹</ThemedText></Pressable><View style={styles.headerCopy}><ThemedText style={styles.headerTitle}>{isTechnician ? `Ruta al cliente · ${selected.title}` : `${selected.title} en camino`}</ThemedText><ThemedText themeColor="textSecondary" style={styles.headerSub}>OpenStreetMap · mapa real</ThemedText></View><View style={styles.live}><ThemedText style={styles.liveText}>●</ThemedText></View></View>
          <View style={styles.mapHint}><ThemedText style={styles.hintText}>Mueve el mapa o usa dos dedos para hacer zoom</ThemedText></View>
        </View>
        <View style={styles.sheet}><View style={styles.handle} /><View style={styles.statusRow}><View style={styles.statusDot} /><ThemedText style={styles.status}>{isTechnician ? 'Servicio asignado · 12 min' : 'Técnico en camino · 12 min'}</ThemedText><ThemedText themeColor="textSecondary" style={styles.distance}>1,8 km</ThemedText></View><View style={styles.progress}><View style={styles.progressFill} /></View><ThemedText themeColor="textSecondary" style={styles.address}>Av. Providencia 1420, Depto 402, Santiago</ThemedText><View style={styles.divider} /><ThemedText style={styles.clientTitle}>{isTechnician ? 'Cliente' : 'Tu técnico'}</ThemedText><View style={styles.personRow}><View style={styles.avatar}><ThemedText style={styles.avatarText}>{isTechnician ? 'CM' : 'RM'}</ThemedText></View><View style={styles.personCopy}><ThemedText style={styles.personName}>{isTechnician ? 'Carlos Martínez' : 'Roberto Méndez'} <ThemedText style={styles.verified}>●</ThemedText></ThemedText><ThemedText themeColor="textSecondary" style={styles.personRole}>{isTechnician ? 'Cliente · Reparación solicitada' : 'Plomero · Maestro certificado'}</ThemedText></View><Pressable style={styles.call}><ThemedText style={styles.callText}>☎</ThemedText></Pressable></View><Pressable style={styles.actionButton} onPress={() => router.push('/service/plomeria' as never)}><ThemedText style={styles.actionText}>{isTechnician ? 'Ver detalles del servicio' : 'Ver servicio activo'}</ThemedText></Pressable></View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8FC' }, safe: { flex: 1 }, mapFrame: { flex: 1, overflow: 'hidden' }, map: { flex: 1 }, header: { position: 'absolute', top: 12, left: 16, right: 16, flexDirection: 'row', alignItems: 'center', gap: 11 }, back: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#1E2A3A', shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 }, backText: { color: '#303449', fontSize: 28, lineHeight: 30 }, headerCopy: { flex: 1, backgroundColor: '#FFF', borderRadius: 13, paddingVertical: 7, paddingHorizontal: 13, shadowColor: '#1E2A3A', shadowOpacity: 0.12, shadowRadius: 5, elevation: 3 }, headerTitle: { color: '#34384D', fontSize: 12, fontWeight: '800' }, headerSub: { fontSize: 9, marginTop: 2 }, live: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }, liveText: { color: '#0B7C78', fontSize: 16 }, mapHint: { position: 'absolute', bottom: 15, alignSelf: 'center', backgroundColor: '#FFF', borderRadius: 18, paddingHorizontal: 13, paddingVertical: 8, shadowColor: '#1E2A3A', shadowOpacity: 0.12, shadowRadius: 5, elevation: 3 }, hintText: { color: '#50576A', fontSize: 10 }, sheet: { backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, paddingTop: 10, paddingBottom: 18 }, handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: '#D9DCE6', alignSelf: 'center', marginBottom: 14 }, statusRow: { flexDirection: 'row', alignItems: 'center' }, statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#0B7C78', marginRight: 7 }, status: { flex: 1, color: '#292E43', fontSize: 13, fontWeight: '800' }, distance: { fontSize: 11 }, progress: { height: 4, backgroundColor: '#E7EAEA', borderRadius: 3, marginVertical: 12 }, progressFill: { width: '66%', height: 4, backgroundColor: '#0B7C78', borderRadius: 3 }, address: { fontSize: 11 }, divider: { height: 1, backgroundColor: '#EFF0F4', marginVertical: 14 }, clientTitle: { color: '#34384D', fontSize: 12, fontWeight: '800', marginBottom: 10 }, personRow: { flexDirection: 'row', alignItems: 'center' }, avatar: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#DDF1EF', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#0B7C78', fontWeight: '800' }, personCopy: { flex: 1, paddingLeft: 11 }, personName: { color: '#2C3044', fontSize: 13, fontWeight: '800' }, verified: { color: '#0B7C78', fontSize: 9 }, personRole: { fontSize: 10, marginTop: 3 }, call: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#EAF7F5', alignItems: 'center', justifyContent: 'center' }, callText: { color: '#0B7C78', fontSize: 17 }, actionButton: { backgroundColor: '#0B7C78', borderRadius: 12, alignItems: 'center', justifyContent: 'center', minHeight: 46, marginTop: 16 }, actionText: { color: '#FFF', fontSize: 12, fontWeight: '800' },
});
