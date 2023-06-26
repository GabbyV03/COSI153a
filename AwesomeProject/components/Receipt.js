import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReceiptOrganizer = () => {
  const [images, setImages] = useState([]);
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [categoryInput, setCategoryInput] = useState('');

  useEffect(() => {
    loadImages();
    getCameraPermission();
  }, []);

  const loadImages = async () => {
    try {
      const storedImages = await AsyncStorage.getItem('receiptImages');
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const saveImages = async (updatedImages) => {
    try {
      await AsyncStorage.setItem('receiptImages', JSON.stringify(updatedImages));
      setImages(updatedImages);
    } catch (error) {
      console.error('Error saving images:', error);
    }
  };

  const getCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      saveImages([...images, { uri: photo.uri, category: '' }]);
    }
  };

  const handleAddCategory = (index, category) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].category = category;
      return updatedImages;
    });
  };

  const handleClearImages = async () => {
    try {
      await AsyncStorage.removeItem('receiptImages');
      setImages([]);
    } catch (error) {
      console.error('Error clearing images:', error);
    }
  };

  const renderImages = () => {
    if (images.length === 0) {
      return <Text>No images found</Text>;
    }

    return images.map((image, index) => (
      <View key={index} style={styles.imageContainer}>
        <Image source={{ uri: image.uri }} style={styles.image} />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleRemoveImage(index)}
        >
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.categoryInput}
          placeholder="Enter category"
          value={image.category}
          onChangeText={(text) => handleAddCategory(index, text)}
        />
      </View>
    ));
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cameraContainer}>
          {hasPermission ? (
            <Camera style={styles.camera} type={cameraType} ref={cameraRef} />
          ) : (
            <Text>No access to camera</Text>
          )}
          <TouchableOpacity style={styles.takePictureButton} onPress={takePicture} disabled={!hasPermission}>
            <View style={styles.innerButtonCircle} />
          </TouchableOpacity>
        </View>

        <View style={styles.imagesContainer}>
          {renderImages()}
        </View>
      </ScrollView>

      <Button title="Clear Images" onPress={handleClearImages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  cameraContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  camera: {
    width: '100%',
    aspectRatio: 1,
  },
  takePictureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButtonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  imagesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  categoryInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 8,
    paddingLeft: 8,
  },
});

export default ReceiptOrganizer;

