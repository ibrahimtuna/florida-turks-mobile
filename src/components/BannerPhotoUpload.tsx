import { ImageBackground, TouchableOpacity, View } from 'react-native';
import Icon from './Icon.tsx';
import ImagePicker from 'react-native-image-crop-picker';

type Props = {
  photo: string;
  setPhoto: (photo: string) => void;
  error?: boolean;
};

const BannerPhotoUpload = ({ photo, setPhoto, error }: Props) => {
  const handlePickImage = () => {
    ImagePicker.openPicker({
      width: 1280,
      height: 720,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      setPhoto(image.path);
    });
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <ImageBackground
        source={{ uri: photo }}
        style={{
          width: '80%',
          aspectRatio: 1280 / 720,
          backgroundColor: '#ccc',
          borderRadius: 36,
          borderWidth: 1,
          borderColor: error ? '#ff0000' : '#ccc',
        }}
        imageStyle={{
          width: '100%',
          aspectRatio: 1280 / 720,
          borderRadius: 31,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePickImage}
          style={{
            height: 32,
            width: 32,
            borderRadius: 16,
            backgroundColor: '#E40E1A',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: -8,
            right: -8,
          }}
        >
          <Icon name="camera" fill="#fff" size="xs" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default BannerPhotoUpload;
