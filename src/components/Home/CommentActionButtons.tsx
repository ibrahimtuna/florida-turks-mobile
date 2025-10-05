import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../Icon.tsx';
import { useTranslation } from 'react-i18next';

type Props = {
  isSubComment?: boolean;
  onPressReply?: () => void;
};

const CommentActionButtons = ({ isSubComment, onPressReply }: Props) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
      }}
    >
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Icon name="heartOutline" size="s" />
        <Text style={{ color: '#000' }}>16</Text>
      </TouchableOpacity>
      {!isSubComment && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={onPressReply}
        >
          <Icon name="reply" size="s" />
          <Text style={{ color: '#000' }}>{t('commons.reply')}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Icon name="flag" size="xs" />
        <Text style={{ color: '#000' }}>{t('commons.report')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default CommentActionButtons;
