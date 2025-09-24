import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const TestModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  console.log('TestModal: Component rendered');

  useImperativeHandle(ref, () => ({
    openModal: () => {
      console.log('TestModal: openModal called');
      setVisible(true);
      console.log('TestModal: setVisible(true) called');
    },
    closeModal: () => {
      console.log('TestModal: closeModal called');
      setVisible(false);
    },
  }));

  console.log('TestModal: Rendering with visible:', visible);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Test Modal</Text>
        <Text style={styles.subtitle}>This is a test modal to check if modals work</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setVisible(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestModal;
