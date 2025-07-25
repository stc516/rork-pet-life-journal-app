import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AddPetModal({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add a new pet</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' },
  modal: { backgroundColor: 'white', padding: 24, borderRadius: 8, width: '80%' },
  title: { fontSize: 18, fontWeight: '600' },
  close: { marginTop: 12, color: 'blue' },
});

