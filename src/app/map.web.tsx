import { router, useLocalSearchParams } from 'expo-router';
import { createElement } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSession } from '@/context/session';

const routes = {
  plomeria: { title: 'Plomería', client: [-33.4318, -70.6096], technician: [-33.4257, -70.6152], address: 'Av. Providencia 1420' },
  electricidad: { title: 'Electricidad', client: [-33.4268, -70.6172], technician: [-33.4224, -70.6085], address: 'Av. Los Leones 880' },
  cerrajeria: { title: 'Cerrajería', client: [-33.4382, -70.6261], technician: [-33.4331, -70.6195], address: 'Av. Italia 1240' },
  pintura: { title: 'Pintura', client: [-33.4188, -70.6027], technician: [-33.4252, -70.6091], address: 'Av. El Cerro 540' },
  jardineria: { title: 'Jardinería', client: [-33.4442, -70.6048], technician: [-33.4371, -70.6122], address: 'Av. Bilbao 3050' },
  default: { title: 'Servicio', client: [-33.4318, -70.6096], technician: [-33.4257, -70.6152], address: 'Av. Providencia 1420' },
} as const;

function createMapDocument(selected: (typeof routes)[keyof typeof routes]) {
  const [clientLat, clientLng] = selected.client;
  const [techLat, techLng] = selected.technician;
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"><style>html,body,#map{height:100%;margin:0}.leaflet-control-attribution{font-size:9px}</style></head><body><div id="map"></div><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><script>const client=[${clientLat},${clientLng}],technician=[${techLat},${techLng}];const map=L.map('map',{zoomControl:true}).setView(client,15);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);L.polyline([technician,[(technician[0]+client[0])/2,technician[1]],client],{color:'#0B7C78',weight:6}).addTo(map);L.marker(client).addTo(map).bindPopup('Cliente · ${selected.title}<br>${selected.address}');L.marker(technician).addTo(map).bindPopup('Técnico en camino · ${selected.title}');</script></body></html>`;
}

export default function WebMapScreen() {
  const { session } = useSession();
  const { service: serviceParam, technician: technicianParam } = useLocalSearchParams<{ service?: string; technician?: string }>();
  const selected = routes[serviceParam as keyof typeof routes] ?? routes.default;
  const isTechnician = session?.role === 'tecnico';
  return <ThemedView style={styles.screen}><SafeAreaView style={styles.safe}><View style={styles.mapFrame}>{createElement('iframe', { title: 'Mapa OpenStreetMap', srcDoc: createMapDocument(selected), style: styles.iframe, allowFullScreen: true })}<View style={styles.header}><Pressable onPress={() => router.back()} style={styles.back}><ThemedText style={styles.backText}>‹</ThemedText></Pressable><View style={styles.headerCopy}><ThemedText style={styles.headerTitle}>{isTechnician ? `Ruta al cliente · ${selected.title}` : `${selected.title} en camino`}</ThemedText><ThemedText themeColor="textSecondary" style={styles.headerSub}>{technicianParam ?? 'OpenStreetMap · mapa real'}</ThemedText></View></View></View><View style={styles.sheet}><View style={styles.handle} /><View style={styles.statusRow}><View style={styles.dot} /><ThemedText style={styles.status}>{isTechnician ? `Servicio de ${selected.title} · 12 min` : `${selected.title} en camino · 12 min`}</ThemedText><ThemedText themeColor="textSecondary">1,8 km</ThemedText></View><ThemedText themeColor="textSecondary" style={styles.address}>{selected.address}, Santiago</ThemedText><View style={styles.divider} /><ThemedText style={styles.person}>{isTechnician ? 'Cliente: Carlos Martínez' : `Técnico: ${technicianParam ?? 'Roberto Méndez'}`}</ThemedText><Pressable style={styles.action} onPress={() => router.back()}><ThemedText style={styles.actionText}>Volver a especialidades</ThemedText></Pressable></View></SafeAreaView></ThemedView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#F7F8FC' }, safe: { flex: 1 }, mapFrame: { flex: 1, overflow: 'hidden' }, iframe: { borderWidth: 0, width: '100%', height: '100%' }, header: { position: 'absolute', top: 12, left: 16, right: 16, flexDirection: 'row', gap: 11 }, back: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }, backText: { color: '#303449', fontSize: 28 }, headerCopy: { flex: 1, backgroundColor: '#FFF', borderRadius: 13, padding: 9 }, headerTitle: { color: '#34384D', fontSize: 12, fontWeight: '800' }, headerSub: { fontSize: 9, marginTop: 2 }, sheet: { backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, paddingBottom: 112 }, handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: '#D9DCE6', alignSelf: 'center', marginBottom: 14 }, statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#0B7C78' }, status: { flex: 1, color: '#292E43', fontSize: 13, fontWeight: '800' }, address: { fontSize: 11, marginTop: 12 }, divider: { height: 1, backgroundColor: '#EFF0F4', marginVertical: 14 }, person: { color: '#2C3044', fontSize: 13, fontWeight: '800' }, action: { minHeight: 46, borderRadius: 12, backgroundColor: '#0B7C78', alignItems: 'center', justifyContent: 'center', marginTop: 16 }, actionText: { color: '#FFF', fontSize: 12, fontWeight: '800' }, });
