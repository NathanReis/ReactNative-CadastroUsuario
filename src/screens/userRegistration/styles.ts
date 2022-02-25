import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'darkblue'
  },
  title: {
    marginBottom: 32,

    color: 'cyan',
    fontSize: 32,
    fontWeight: 'bold'
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    width: '100%'
  }
});
