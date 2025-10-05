import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import SelectInput from '../../components/Inputs/SelectInput';
import i18n from '../../i18n.ts';
import { useAppSelector } from '../../store';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../components/Icon.tsx';
import ImagePicker from 'react-native-image-crop-picker';
import { REQUEST_CREATE_FEED } from '../../api/requests.ts';

const CreateEventScreen = () => {
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { language } = i18n;
  const { categories } = useAppSelector(state => state.feed);
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);

  const [post, setPost] = useState('');
  const [photo, setPhoto] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [postError, setPostError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const [isPostLoading, setIsPostLoading] = useState(false);

  const CATEGORIES = useMemo(() => {
    return categories.map(category => ({
      value: category._id,
      label: language === 'tr' ? category.turkishTitle : category.englishTitle,
    }));
  }, [categories, language]);

  const handlePickImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(image => setPhoto(image.path))
      .finally(() => inputRef.current?.focus());
  };

  useEffect(() => {
    if (postError) {
      setPostError(!post);
    }
    if (categoryError) {
      setCategoryError(!categoryId);
    }
  }, [post, postError, categoryId, categoryError]);

  const handleSave = () => {
    let isError = false;
    if (!categoryId) {
      isError = true;
      setCategoryError(true);
    }
    if (!post) {
      isError = true;
      setPostError(true);
    }
    if (isError) {
      return;
    }
    setIsPostLoading(true);
    REQUEST_CREATE_FEED({
      categoryId,
      context: post,
      photo,
    }).finally(() => setIsPostLoading(false));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F8F9FB' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View
        style={{
          paddingTop: top + 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#E2E2E2',
          backgroundColor: '#fff',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          disabled={isPostLoading}
        >
          <Icon name="close" size="xxs" fill="#3C3C43" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSave}
          disabled={isPostLoading}
          style={{
            backgroundColor: '#E40E1A',
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 24,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {isPostLoading && (
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
          )}
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15 }}>
            {t('home.create_feed.post')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 100, // enough space for footer
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Category */}
        <View style={{ height: 52, marginBottom: 12 }}>
          <SelectInput
            value={categoryId}
            onChange={setCategoryId}
            options={CATEGORIES}
            placeholder={t('home.create_feed.category_placeholder')}
            error={categoryError}
          />
        </View>

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          value={post}
          onChangeText={setPost}
          placeholder={t('home.create_feed.placeholder')}
          placeholderTextColor={postError ? '#ff0000' : '#8080808C'}
          multiline
          textAlignVertical="top"
          autoFocus
          style={{
            color: '#1e1e1e',
            fontSize: 16,
            minHeight: 60,
            marginBottom: 12,
          }}
        />

        {/* Image Preview */}
        {photo ? (
          <View
            style={{
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: 16,
            }}
          >
            <Image
              source={{ uri: photo }}
              style={{ width: '100%', height: 280 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => setPhoto('')}
              activeOpacity={0.8}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: '#00000080',
                padding: 8,
                borderRadius: 99,
              }}
            >
              <Icon name="close" size="xxs" fill="#fff" />
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>

      {/* Fixed Footer */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E2E2E2',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isPostLoading}
          onPress={handlePickImage}
        >
          <Icon name="gallery" fill="#0071a2" size="s" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isPostLoading}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 18,
          }}
        >
          <Icon name="locationPoint" fill="#0071a2" size="s" />
          <Text style={{ color: '#1e1e1e', marginLeft: 6 }}>New York, NY</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateEventScreen;
