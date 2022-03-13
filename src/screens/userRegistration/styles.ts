import { Platform, StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    backgroundColor: 'darkred'
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 32,

    color: 'yellow',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  lineFormContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    width: '100%'
  },
  listContainer: {
    alignItems: 'center',

    maxHeight: '40%',
    width: '95%',
    maxWidth: 360,

    marginTop: 10,
    paddingTop: 10,

    borderTopColor: 'yellow',
    borderTopWidth: 3
  },
  list: {
    width: '100%'
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderRadius: 20,

    backgroundColor: 'yellow'
  },
  listItemInfos: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  listItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItemIcon: {
    marginEnd: 10
  },
  listName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  listEmail: {
    fontSize: 16
  }
});
