import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Heading = ({ heading, subHeading }) => {
  return (
    <View style={styles.container}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      {subHeading && <Text style={styles.subHeading}>{subHeading}</Text>}
    </View>
  );
}

export default Heading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  heading: {
    fontSize: 23,
    color: "#000",
    marginVertical: 3,
    fontWeight: "bold",
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: "gray",
    marginVertical: 3,
    fontWeight: "bold",
    textAlign: 'center',
  }
});
