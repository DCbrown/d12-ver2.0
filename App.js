
import React, { useState, useEffect } from "react";
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
  const [modifier, setModifier] = React.useState(0);
  const [dR, setDR] = useState(0);
  const [logs, setLogs] = useState([])

  const showModal = () => setVisible(true);
  const hideModal = () => { 
    setVisible(false); 
    setModifier(0);
  }

  const roll = (d) => {
    setDR(Math.floor(Math.random() * d) + 1);
    rollingDice();
  }

  const add = () => {
    setModifier((prev) => {
      return prev + 1;
    });
  }

  const subtract = () => {
    if (modifier != 0) {
      setModifier((prev) => {
        return prev - 1;
      });
    }
  }

  const rollingDice = () => {
    let log = `${dR} + ${modifier} = ${dR + modifier}`


    setLogs(logs.concat(log))
    console.log("-")
    console.log(logs)
  }

  const containerStyle = { backgroundColor: 'white', padding: 20 };
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

          <List.Item
              key={ index }
              titleStyle = {{textAlign: 'right' }}
              title={`${log.name}`}
              left={props => <List.Icon {...props} icon="folder" />}
            />
          */}  
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => roll(4)}></Button>
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => roll(6)}></Button>
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => roll(8)}></Button>
          </View>
          <View style={styles.container} >
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => roll(10)}></Button>
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => roll(12)}></Button>
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => roll(20)}></Button>
          </View>
          <View style={styles.container} >
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => add()}></Button>
            <TextInput
              style={styles.input}
              value={modifier.toString()}
              keyboardType = 'numeric'
              onChangeText={modifier => setModifier(modifier)}
            />
            <Button style={styles.button} icon="camera" mode="contained" onPress={() => subtract()}></Button>
          </View>
        </Modal>
      </Portal>
      
      <Button style={{marginTop: 105}} onPress={showModal}>
        Show
      </Button>
      <Text>{modifier}</Text>
      <Text>{dR}</Text>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
           <View>
              {logs && logs.length ? (
                logs.map((log, index) => {
                  return<List.Item key={ index } titleStyle = {{textAlign: 'right' }} title={`${log}`} left={props => <List.Icon {...props} icon="folder" />}
              />
              })) : null }
                
              

              <Divider />
            </View>  
         
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
