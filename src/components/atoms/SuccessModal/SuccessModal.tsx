import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SuccessModal = ({ 
  visible, 
  successMessage, 
  onClose,
  buttonText = 'Continue'
}: { 
    buttonText?: string;
    onClose: () => void;
    successMessage: string;
    visible: boolean;
}) => {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>✓</Text>
          </View>
          
          <Text style={styles.modalTitle}>Success!</Text>
          <Text style={styles.modalText}>{successMessage || 'Operation completed successfully.'}</Text>
          
          <TouchableOpacity
            onPress={onClose}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#48BB78', // Changed to green for success
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A2D5B',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#48BB78', // Changed to green for success
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SuccessModal;

// const [showSuccess, setShowSuccess] = useState(false);

// // In your JSX:
// <SuccessModal
//   visible={showSuccess}
//   successMessage="Your payment was processed successfully!"
//   onClose={() => setShowSuccess(false)}
//   buttonText="Done" // Optional
// />