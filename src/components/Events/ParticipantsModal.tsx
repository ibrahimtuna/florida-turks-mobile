import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { EVENT_PARTICIPANT } from '../../screens/Events/constants';
import { useTranslation } from 'react-i18next';

type Props = {
  visible: boolean;
  handleClose: () => void;
  participants: EVENT_PARTICIPANT[];
};

const ParticipantsModal = ({ visible, handleClose, participants }: Props) => {
  const { t } = useTranslation();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      presentationStyle="overFullScreen"
    >
      {/* Backdrop */}
      <Pressable
        onPress={handleClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
      >
        {/* Stop backdrop presses from bubbling when touching the sheet */}
        <Pressable
          onPress={() => {}}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
          }}
        >
          {/* Bottom sheet */}
          <View
            style={{
              height: '50%',
              width: '100%',
              backgroundColor: '#fff',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#8080808C',
                padding: 16,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {t('events.event_detail.participants')} ({participants.length})
              </Text>

              <TouchableOpacity
                onPress={handleClose}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={{ fontSize: 16 }}>{t('commons.close')}</Text>
              </TouchableOpacity>
            </View>

            {/* List */}
            <FlatList
              data={participants}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 6,
                  }}
                >
                  <Image
                    source={{ uri: item.photoUrl }}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: '#F3F4F6',
                      marginRight: 12,
                    }}
                  />
                  <Text style={{ fontSize: 14 }}>{item.name}</Text>
                </View>
              )}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ParticipantsModal;
