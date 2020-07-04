import React from 'react';
import Heading from './Heading';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Card = ({ heading, subHeading, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <Heading heading={heading} subHeading={subHeading} />
    </TouchableOpacity>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
