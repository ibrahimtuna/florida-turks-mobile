import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

type Props = {
  categories: { key: string; label: string }[];
};

const HorizontalFilter = ({ categories }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
          onPress={() => setSelectedCategory(category.key)}
          style={{
            backgroundColor:
              selectedCategory === category.key ? '#E40E1A' : '#F1F2F5',
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: selectedCategory === category.key ? '#FFF' : '#000000',
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
