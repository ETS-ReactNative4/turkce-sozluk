import React from 'react';
import { View } from 'react-native';

import Button from './button';
import Box from './box';
import { Search, Bookmark, RotateCcw } from './icons';

import theme from '../utils/theme';

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const optionTitle =
          options.title !== undefined ? options.title : route.name;
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : optionTitle;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const bgColor = isFocused ? 'red' : 'white';

        return label === 'Search' ? (
          <Box key={label} p={15} mt={-15} bg="white" borderRadius="full">
            <Button size={56} bg="red" borderRadius="full" onPress={onPress}>
              <Search stroke="white" />
            </Button>
          </Box>
        ) : (
          <Button
            key={label}
            pt={6}
            height={56}
            flex={1}
            flexDirection="column"
            onPress={onPress}
          >
            {label === 'History' && (
              <RotateCcw color={theme.colors.textLight} />
            )}
            {label === 'Favorite' && (
              <Bookmark color={theme.colors.textLight} />
            )}
            <Box size={3} bg={bgColor} mt={6} />
          </Button>
        );
      })}
    </View>
  );
}

export default TabBar;
