import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView, ScrollView, } from "react-native";
import { TextInput } from 'react-native-paper';
import { List } from 'react-native-paper';
import { Divider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { D8light } from './img/D8light.svg';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  const showModal = () => setVisible(true);
  const hideModal = () => { 
    setVisible(false); 
    setCounter(0);
  }
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

  return (
    <Provider>
      <Portal>
      <Appbar.Header>
        <Appbar.Content title="D12" />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>

        <Modal style={styles.modal} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
          <View style={styles.container} >
          {/*
          <SvgUri style={styles.button} 
              width="20%"
              height="20%"
              uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
          />
          */}  
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => hideModal()}></Button>
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => console.log('Pressed')}></Button>
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => console.log('Pressed')}></Button>
          </View>
          <View style={styles.container} >
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => console.log('Pressed')}></Button>
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => console.log('Pressed')}></Button>
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => console.log('Pressed')}></Button>
          </View>
          <View style={styles.container} >
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => console.log('Pressed')}></Button>
            <TextInput
              style={styles.input}
              value={counter}
              keyboardType = 'numeric'
              onChangeText={counter => setCounter(counter)}
            />
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => console.log('Pressed')}></Button>
          </View>
        </Modal>
       
      </Portal>
      <Button style={{marginTop: 105}} onPress={showModal}>
        Show
      </Button>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <List.Item
        titleStyle = {{textAlign: 'right' }}
        title="7 + 2 = 9"
        left={props => <List.Icon {...props} icon="folder" />}
      />
      <Divider />
      <List.Item
        titleStyle = {{textAlign: 'right' }}
        title="7 + 2 = 9"
        left={props => <List.Icon {...props} icon="folder" />}
      />
       <Divider />
      <List.Item
        titleStyle = {{textAlign: 'right' }}
        title="7 + 2 = 9"
        left={props => <List.Icon {...props} icon="folder" />}
      />
           </ScrollView>
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
  },
  button: {
    width: 60,
    height: 60,
    margin: 20
  },
  input: {
    width: 100
  }

});
