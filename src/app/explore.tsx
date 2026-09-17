import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSession } from '@/context/session';

const services = [
  { id: 'plomeria', icon: '⌁', title: 'Plomería', description: 'Fugas, grifos, tuberías y más', price: '$18.000', duration: '30 - 60 min', tone: '#E9F3FF', iconColor: '#3F7BD4' },
  { id: 'electricidad', icon: '✦', title: 'Electricidad', description: 'Instalaciones y reparaciones', price: '$22.000', duration: '45 - 90 min', tone: '#FFF4D8', iconColor: '#C28624' },
  { id: 'electrodomesticos', icon: '▦', title: 'Electrodomésticos', description: 'Línea blanca y pequeños aparatos', price: '$25.000', duration: '60 - 90 min', tone: '#E8F8F1', iconColor: '#328666' },
  { id: 'cerrajeria', icon: '⌑', title: 'Cerrajería', description: 'Aperturas, cambios y urgencias', price: '$20.000', duration: '20 - 40 min', tone: '#F4EAFF', iconColor: '#8C5AB9' },
  { id: 'pintura', icon: '◒', title: 'Pintura', description: 'Muros, puertas y terminaciones', price: '$28.000', duration: '2 - 4 horas', tone: '#FFECEF', iconColor: '#D25A79' },
  { id: 'gas', icon: '♨', title: 'Gasfitería', description: 'Gas, calefacción y calderas', price: '$24.000', duration: '45 - 90 min', tone: '#FFF0D2', iconColor: '#B77320' },
  { id: 'jardineria', icon: '✿', title: 'Jardinería', description: 'Podas, patios y áreas verdes', price: '$16.000', duration: '60 - 120 min', tone: '#E6F5E9', iconColor: '#39894D' },
  { id: 'limpieza', icon: '✧', title: 'Limpieza', description: 'Hogar, oficinas y vitrinas', price: '$15.000', duration: '2 - 4 horas', tone: '#E9F3FF', iconColor: '#3F7BD4' },
  { id: 'climatizacion', icon: '❄', title: 'Climatización', description: 'Aire acondicionado y ventilación', price: '$30.000', duration: '60 - 90 min', tone: '#E4F5F7', iconColor: '#2A8D98' },
  { id: 'mudanzas', icon: '▣', title: 'Mudanzas', description: 'Traslados, carga y embalaje', price: '$35.000', duration: '2 - 6 horas', tone: '#F4EAFF', iconColor: '#8C5AB9' },
];

const technicians = [
  { initials: 'RM', name: 'Roberto Méndez', serviceId: 'plomeria', specialty: 'Plomería', rating: '4.9', time: '12 min', experience: '8 años', completed: '126 servicios', zone: 'Providencia y Ñuñoa', price: 'Desde $18.000', color: '#DDF1EF' },
  { initials: 'DS', name: 'Daniela Soto', serviceId: 'electricidad', specialty: 'Electricidad', rating: '4.8', time: '18 min', experience: '6 años', completed: '98 servicios', zone: 'Las Condes y Vitacura', price: 'Desde $22.000', color: '#FFF0D2' },
  { initials: 'AV', name: 'Andrés Vidal', serviceId: 'cerrajeria', specialty: 'Cerrajería', rating: '4.9', time: '9 min', experience: '11 años', completed: '241 servicios', zone: 'Santiago Centro', price: 'Desde $20.000', color: '#F0E5FF' },
  { initials: 'CL', name: 'Camila León', serviceId: 'pintura', specialty: 'Pintura', rating: '5.0', time: '25 min', experience: '9 años', completed: '74 servicios', zone: 'Providencia y La Reina', price: 'Desde $28.000', color: '#FFE5EA' },
  { initials: 'MP', name: 'María Paz', serviceId: 'jardineria', specialty: 'Jardinería', rating: '4.8', time: '20 min', experience: '5 años', completed: '63 servicios', zone: 'Ñuñoa y Macul', price: 'Desde $16.000', color: '#E6F5E9' },
  { initials: 'JV', name: 'Javier Vera', serviceId: 'climatizacion', specialty: 'Climatización', rating: '4.9', time: '16 min', experience: '7 años', completed: '112 servicios', zone: 'La Florida y Peñalolén', price: 'Desde $30.000', color: '#E4F5F7' },
];

export default function ServicesScreen() {
  const { session } = useSession();
  const { category, search } = useLocalSearchParams<{ category?: string; search?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'todos');
  const searchTerm = (search ?? '').toLowerCase();
  const selectedService = services.find((service) => service.id === selectedCategory);
  const visibleTechnicians = technicians.filter((technician) => {
    const matchesCategory = selectedCategory === 'todos' || technician.serviceId === selectedCategory;
    const matchesSearch = !searchTerm || `${technician.name} ${technician.specialty} ${technician.zone}`.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });
  const visibleServices = services.filter((service) => !searchTerm || `${service.title} ${service.description}`.toLowerCase().includes(searchTerm));
  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ThemedText themeColor="textSecondary" style={styles.eyebrow}>MANOCERCA / CATÁLOGO</ThemedText>
          <ThemedText style={styles.title}>{session?.role === 'tecnico' ? 'Tus servicios' : 'Encuentra un experto'}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.subtitle}>{session?.role === 'tecnico' ? 'Administra lo que ofreces a tu comunidad.' : 'Elige un oficio y recibe ayuda en tu domicilio.'}</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            <Pressable onPress={() => setSelectedCategory('todos')} style={[styles.categoryChip, selectedCategory === 'todos' && styles.categoryChipActive]}><ThemedText style={[styles.categoryChipText, selectedCategory === 'todos' && styles.categoryChipTextActive]}>Todas</ThemedText></Pressable>
            {services.map((service) => <Pressable key={service.id} onPress={() => setSelectedCategory(service.id)} style={[styles.categoryChip, selectedCategory === service.id && styles.categoryChipActive]}><ThemedText style={[styles.categoryChipText, selectedCategory === service.id && styles.categoryChipTextActive]}>{service.icon} {service.title}</ThemedText></Pressable>)}
          </ScrollView>
          <View style={styles.selectionBanner}><ThemedText style={styles.selectionTitle}>{search ? `Resultados para “${search}”` : selectedService ? `${selectedService.title} cerca de ti` : 'Todas las especialidades'}</ThemedText><ThemedText themeColor="textSecondary" style={styles.selectionSubtitle}>Selecciona un profesional para solicitar el servicio y ver su ruta</ThemedText></View>
          {selectedCategory === 'todos' && visibleServices.map((service) => (
            <Pressable key={service.id} onPress={() => setSelectedCategory(service.id)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
              <View style={[styles.iconBox, { backgroundColor: service.tone }]}><ThemedText style={[styles.serviceIcon, { color: service.iconColor }]}>{service.icon}</ThemedText></View>
              <View style={styles.cardCopy}><ThemedText style={styles.serviceTitle}>{service.title}</ThemedText><ThemedText themeColor="textSecondary" style={styles.description}>{service.description}</ThemedText><View style={styles.metaRow}><ThemedText style={styles.price}>Desde {service.price}</ThemedText><ThemedText themeColor="textSecondary" style={styles.duration}>◷ {service.duration}</ThemedText></View></View>
              <ThemedText style={styles.arrow}>›</ThemedText>
            </Pressable>
          ))}
          <ThemedText style={styles.peopleTitle}>Profesionales disponibles</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.peopleSubtitle}>Personas verificadas cerca de tu ubicación</ThemedText>
          {visibleTechnicians.map((technician) => (
            <Pressable key={technician.name} onPress={() => router.push(`/map?service=${technician.serviceId}&technician=${encodeURIComponent(technician.name)}` as never)} style={styles.technicianCard}>
              <View style={[styles.technicianAvatar, { backgroundColor: technician.color }]}><ThemedText style={styles.technicianInitials}>{technician.initials}</ThemedText></View>
              <View style={styles.technicianCopy}><ThemedText style={styles.technicianName}>{technician.name} <ThemedText style={styles.verified}>●</ThemedText></ThemedText><ThemedText themeColor="textSecondary" style={styles.technicianMeta}>{technician.specialty} · ★ {technician.rating} · Llega en {technician.time}</ThemedText><ThemedText themeColor="textSecondary" style={styles.technicianDetails}>{technician.experience} · {technician.completed}</ThemedText><ThemedText themeColor="textSecondary" style={styles.technicianDetails}>{technician.zone} · {technician.price}</ThemedText></View>
              <ThemedText style={styles.arrow}>›</ThemedText>
            </Pressable>
          ))}
          {visibleTechnicians.length === 0 && <View style={styles.emptyState}><ThemedText style={styles.emptyTitle}>No encontramos profesionales</ThemedText><ThemedText themeColor="textSecondary" style={styles.emptyText}>Prueba con otra especialidad, nombre o comuna.</ThemedText></View>}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  categoryRow: { gap: 8, paddingBottom: 4 }, categoryChip: { backgroundColor: '#FFF', borderColor: '#E3E6EE', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9 }, categoryChipActive: { backgroundColor: '#6260D9', borderColor: '#6260D9' }, categoryChipText: { color: '#50566A', fontSize: 11, fontWeight: '700' }, categoryChipTextActive: { color: '#FFF' }, selectionBanner: { backgroundColor: '#EEF0FF', borderRadius: 14, padding: 13, marginTop: 16, marginBottom: 16 }, selectionTitle: { color: '#30356B', fontSize: 14, fontWeight: '800' }, selectionSubtitle: { fontSize: 10, marginTop: 4 },
    peopleTitle: { color: '#272940', fontSize: 18, fontWeight: '800', marginTop: 18 }, peopleSubtitle: { fontSize: 11, marginTop: 4, marginBottom: 12 }, technicianCard: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#ECEEF4', borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 9 }, technicianAvatar: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, technicianInitials: { color: '#0B7C78', fontSize: 11, fontWeight: '800' }, technicianCopy: { flex: 1, paddingLeft: 11 }, technicianName: { color: '#2C3044', fontSize: 13, fontWeight: '800' }, technicianMeta: { fontSize: 10, marginTop: 3 }, technicianDetails: { fontSize: 9, marginTop: 2 }, verified: { color: '#0B7C78', fontSize: 9 }, emptyState: { alignItems: 'center', paddingVertical: 30 }, emptyTitle: { color: '#2C3044', fontWeight: '800', fontSize: 14 }, emptyText: { fontSize: 11, marginTop: 5 },
  screen: { flex: 1, backgroundColor: '#F7F8FC' }, safe: { flex: 1 }, content: { padding: 20, paddingBottom: 110 }, eyebrow: { fontSize: 10, letterSpacing: 1.4, fontWeight: '800', marginTop: 8 }, title: { fontSize: 28, fontWeight: '800', color: '#272940', marginTop: 7 }, subtitle: { fontSize: 13, marginTop: 6, lineHeight: 19 }, filterRow: { flexDirection: 'row', alignItems: 'center', gap: 22, borderBottomWidth: 1, borderBottomColor: '#E8EAF0', marginTop: 26, marginBottom: 18 }, filterActive: { color: '#6260D9', fontSize: 12, fontWeight: '800', paddingBottom: 11, borderBottomWidth: 2, borderBottomColor: '#6260D9' }, filter: { fontSize: 12, paddingBottom: 11 }, card: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#ECEEF4', borderRadius: 17, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }, pressed: { opacity: 0.75 }, iconBox: { width: 54, height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }, serviceIcon: { fontSize: 27 }, cardCopy: { flex: 1, paddingLeft: 13 }, serviceTitle: { color: '#2C3044', fontWeight: '800', fontSize: 15 }, description: { fontSize: 11, marginTop: 3 }, metaRow: { flexDirection: 'row', alignItems: 'center', gap: 13, marginTop: 9 }, price: { color: '#3F45A4', fontWeight: '800', fontSize: 12 }, duration: { fontSize: 10 }, arrow: { color: '#6260D9', fontSize: 26, paddingLeft: 8 },
});
