import { ScrollView, Text, TouchableOpacity } from 'react-native';

type Props = {
  selected: string;
  setSelected: (selected: string) => void;
  categories: { key: string; label: string }[];
};

const HorizontalFilter = ({ selected, setSelected, categories }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 8,
      }}
    >
      {categories.map(category => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={category.key}
          onPress={() => setSelected(category.key)}
          style={{
            backgroundColor: selected === category.key ? '#E40E1A' : '#F1F2F5',
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: selected === category.key ? '#FFF' : '#000000',
            }}
          >
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HorizontalFilter;
