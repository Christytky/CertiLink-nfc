import React , { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput,Linking,
    // Button, Platform, SafeAreaView, StyleSheet, Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider, Button, DataTable } from 'react-native-paper';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

function LogoTitle() {
    return (
        <Image
            style={{ width: 150, height: 50 }}
            source={require('./assets/CertiLink_logo.jpeg')}
        />
    );
}

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Collection')}>
                <Image
                    source={require('./assets/CertiLink_logo.jpeg')}
                    style={{ width: 350, height: 50 }}
                />
                <Text></Text>
                <Text></Text>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Luxury you can trust</Text>
            </TouchableOpacity>
        </View>
    );
}

function CollectionScreen({ navigation }) {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([10, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const [items] = React.useState([
    {
        key: 1,
        name: 'LV Collection 001 (LV)',
        output: 3,
    },
    {
        key: 2,
        name: 'LV Collection 002 (LV02)',
        output: 5,
    },
    {
        key: 3,
        name: 'LV Collection 003 (LV03)',
        output: 20,
    },
    {
        key: 4,
        name: 'LV Collection 004 (LV04)',
        output: 10,
    },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    const handleSelect = (item) => {
        console.log(`Selected item: ${item.name}`);
        navigation.navigate('DataTransfer');
    };

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <View style={{ backgroundColor: 'white' }}>
            <DataTable>
            <DataTable.Header  style={{ height: 50 }}>
                <DataTable.Title style={{ flex: 1.2 }}>Name (Symbol)</DataTable.Title>
                <DataTable.Title numeric style={{ flex: 0.6, justifyContent: 'center' }}>No. of Output</DataTable.Title>
                <DataTable.Title numeric style={{ flex: 1, justifyContent: 'center' }}>Action</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.key}  style={{ height: 60 }}>
                <DataTable.Cell style={{ flex: 1.2 }}>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 0.6, justifyContent: 'center' }}>{item.output}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 1, justifyContent: 'center' }}>
                <Button 
                    icon="database-arrow-right" 
                    // mode="outlined" 
                    buttonColor='#40654f'
                    textColor='white'
                    onPress={() => handleSelect(item)}>
                        Tranfer
                </Button>
                </DataTable.Cell>
                </DataTable.Row>
            ))}

            {/* <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${items.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
            /> */}
            </DataTable>
        </View>
    );
}

function TokenScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const handlePress = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('DataTransfer');
        }, 1000);
      };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Text>Collection Details:</Text>
            <Text></Text>
            <Text>LV Collection 001</Text>
            <Text>Remaining Token to Transfer: 3</Text>
            <Text></Text>
            <Button 
                icon="database-arrow-right" 
                mode="conteined-tonal" 
                buttonColor='#40654f'
                textColor='white'
                onPress={handlePress}>
                    {isLoading ? 'Loading...' : 'Data Transfer'}
            </Button>
            {/* <Button
                title="Start Data Transfer"
                onPress={() => navigation.navigate('DataTransfer')}
            /> */}
        </View>
    );
}

function NFCTransferScreen({ navigation }) {
    // useEffect(() => {
    //     NfcManager.start();
    //     return () => {
    //       NfcManager.stop();
    //     };
    //   }, []);
    
    //   async function handleTagDiscovery() {
    //     try {
    //       await NfcManager.registerTagEvent();
    //       console.log('Tag Discovered');
    //     } catch (ex) {
    //       console.warn('Error', ex);
    //     }
    //   }

    const [isLoading, setIsLoading] = useState(false);
    const [isConnect, setIsConnect] = useState(false);
    const [isProcess, setIsProcess] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const [count, setCount] = React.useState(3); // set number of tokens

    const handleConnectPress = () => {
        setIsLoading(true);
        setIsConnect(false); // Reset isComplete state variable
        setTimeout(() => {
            setIsLoading(false);
            setIsConnect(true);
        }, 500);
    };
    
    const handleWritePress = () => {
        setIsProcess(true);
        setTimeout(() => {
            setIsProcess(false);
            setIsComplete(true);
            setCount((c) => Math.max(0, c - 1));
        }, 1000);
    };
    
    const handleCompletePress = () => {
        setIsComplete(false);
        setIsConnect(false);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Text style={{ fontSize: 20 }}>Number of output</Text>
            <Text></Text>
            <Text style={{ fontSize: 20 }}>{count}</Text>
            <Text></Text>
            <Button 
                icon="cellphone-nfc" 
                mode="conteined-tonal" 
                buttonColor='#40654f'
                textColor='white'
                onPress={isLoading ? null : handleConnectPress}>
                {isLoading ? 'Connecting...' : isConnect ? 'Connected' : 'Connect to a New Tag'}
            </Button>
        <Text></Text>
            <Button
                icon="clipboard-edit" 
                mode="conteined-tonal" 
                buttonColor='#40654f'
                textColor='white'
                onPress={() => {
                    isComplete ? handleCompletePress() : isProcess ? null : handleWritePress();
                }}>
                {isProcess ? 'Processing...' : count == 0 ? 'Complete' : isComplete ? 'Complete and Next' : 'Write Data'}
            </Button>
        </View>
    );
}

function ScanNFCScreen({ route, navigation }) {
    const { text } = route.params || {};
  
    // useEffect(() => {
    //   NfcManager.start();
    //   return () => {
    //     NfcManager.stop();
    //   };
    // }, []);
  
    // async function handleTagDiscovery() {
    //   try {
    //     await NfcManager.requestTechnology(NfcTech.Ndef, {
    //       alertMessage: 'Ready to write some NFC tags!'
    //     });
    //     console.log('NFC is ready to write');
    //   } catch (ex) {
    //     console.warn('Error', ex);
    //   }
    // }

    const [isLoading, setIsLoading] = useState(false);
    const handlePress = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('Product Details');
        }, 1000);
      };
  
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <Text>{text}</Text>
        <Button 
                icon="nfc-search-variant" 
                mode="conteined-tonal" 
                buttonColor='#40654f'
                textColor='white'
                onPress={handlePress}>
                {isLoading ? 'Connecting...' : 'Scan and Read Product Details'}
        </Button>
    </View>
    );
  }


function ReadNFCScreen({ navigation }) {

    const [isPressed, setIsPressed] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [text, setText] = useState('');

    const handleLinkPress = () => {
        setIsPressed(true);
    };

    const handleConfirmPress = () => {
        setIsConfirmed(true);
    };

    // Table
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([10, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const [items] = React.useState([
    {
        key: 1,
        event: 'Ownership Transfer',
        from: '0x4b17f9f27a6d3a2f7e3a8c56e6dc98fa8f0f3e4c4d1a4a2f8b0e8c6d1a6f5e7b',
        to: '0x5e8d7b4f6e8a1c2d4b8f0e8c7a6f3d1e7b2a6f3d1e8c5e7b4a2f8b1c2d4e6f',
        date: '2021-09-30 12:10:46',
    },
    {
        key: 2,
        event: 'Ownership Transfer',
        from: '0x5e8d7b4f6e8a1c2d4b8f0e8c7a6f3d1e7b2a6f3d1e8c5e7b4a2f8b1c2d4e6f',
        to: '0x1a2f8b1c2d4e6f8a1c2d4b8f0e8c6d1a2f7e3a6f5e7b4a2f8b1c2d4e6f8a1c',
        date: '2022-01-23 20:53:28',
    },
    {
        key: 3,
        event: 'Product Repair',
        from: '0x1a2f8b1c2d4e6f8a1c2d4b8f0e8c6d1a2f7e3a6f5e7b4a2f8b1c2d4e6f8a1c',
        to: '0x2f6e8c5e7b4a2f8b1c2d4e6f8a1c2d4b8f0e8c6d1a2f7e3a6f5e7b4a2f8b1c',
        date: '2022-12-05 14:20:35',
    },
    {
        key: 4,
        event: 'Ownership Transfer',
        from: '0x2f6e8c5e7b4a2f8b1c2d4e6f8a1c2d4b8f0e8c6d1a2f7e3a6f5e7b4a2f8b1c',
        to: '0x6f8a1c2d4b8f0e8c6d1a2f7e3a6f5e7b4a2f8b1c2d4e6f8a1c2d4b8f0e8c6d',
        date: '2023-09-12 08:34:12',
    },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    let content;
    if (isConfirmed) {
        content = (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 1.2, justifyContent: 'center' }}>Event</DataTable.Title>
                    <DataTable.Title style={{ flex: 0.4, justifyContent: 'center' }}>From</DataTable.Title>
                    <DataTable.Title style={{ flex: 0.4, justifyContent: 'center' }}>To</DataTable.Title>
                    <DataTable.Title style={{ flex: 1.2, justifyContent: 'center' }}>Date</DataTable.Title>
                </DataTable.Header>

                {items.slice(from, to).map((item) => (
                    <DataTable.Row key={item.key}>
                    <DataTable.Cell style={{ flex: 1.2 }}>{item.event}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 0.4 }}>{item.from}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 0.4 }}>{item.to}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.2 }}>{item.date}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
            // <Text>Your transaction has been confirmed. Thank you!</Text>
        );
    } else if (isPressed) {
        content = (
            <View>
            <TextInput 
                value={text} 
                onChangeText={setText} 
                placeholder="Enter your address" 
                secureTextEntry={true}
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, width: 300 }} 
            />
            <Text></Text>
            <View style={{ alignItems: 'center' }}>
                <Button 
                icon="account-check" 
                mode="contained" 
                buttonColor='#40654f'
                labelStyle={{ color: 'white' }}
                onPress={handleConfirmPress}>
                Confirm
                </Button>
            </View>
        </View>
    );
    } else {
        content = (
            <Button 
                icon="account-check" 
                mode="contained" 
                buttonColor='#40654f'
                labelStyle={{ color: 'white' }}
                onPress={handleLinkPress}>
                Verify the ownership / Check transaction record
            </Button>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Image
                source={require('./assets/louis-vuitton.png')}
                style={{ width: 200, height: 200 }}
            />
            <Text style={{ fontSize: 18, textDecorationLine: 'underline', fontWeight: 'bold' }}>LV Collection 001</Text>
            <Text></Text>
            <Text style={{ fontSize: 16 }}>BlossomPM #002</Text>
            <Text></Text>
            {content}
        </View>
    );
}

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();


function WriteStack() {
return (
    <Stack.Navigator>
    <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
    />
    <Stack.Screen name="Collection" component={CollectionScreen} />
    <Stack.Screen name="Token" component={TokenScreen} />
    <Stack.Screen name="DataTransfer" component={NFCTransferScreen} />
    </Stack.Navigator>
);
}

function ReadStack() {
return (
    <Stack.Navigator>
        <Stack.Screen 
            name="Scan NFC Tag" 
            component={ScanNFCScreen} 
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
        <Stack.Screen 
            name="Product Details"
            component={ReadNFCScreen} />
    </Stack.Navigator>
);
}

function App() {
return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#0e1111"
            inactiveColor="white"
            barStyle={{ backgroundColor: '#40654f' }}
        >
            <Tab.Screen
                name="Write NFC" 
                component={WriteStack}
                options={{
                tabBarLabel: "Write NFC Tag",
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="nfc" size={28} color={color} />
                ),
                }}
            />
            <Tab.Screen
                name="Scan NFC" 
                component={ReadStack}
                options={{
                tabBarLabel: 'Read Product Info',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cellphone-nfc" size={28} color={color} />
                ),
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
);
}

export default App;


// class App extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             log: "Ready...",
//             text: ""
//         }
//     }
//     componentDidMount() {
//         NfcManager.start();
//     }

//     componentWillUnmount() {
//         this._cleanUp();
//     }

//     _cleanUp = () => {
//         NfcManager.cancelTechnologyRequest().catch(() => 0);
//     }

//     readData = async () => {
//         try {
//             // let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
//             let tech = Platform.OS === 'android' ? NfcTech.NfcA : NfcTech.NfcA;
//             let resp = await NfcManager.requestTechnology(tech, {
//                 alertMessage: 'Ready to do some custom Mifare cmd!'
//             });

//             // let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
//             let cmd = Platform.OS === 'android' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
            
//             resp = await cmd([0x3A, 4, 4]);
//             let payloadLength = parseInt(resp.toString().split(",")[1]);
//             let payloadPages = Math.ceil(payloadLength / 4);
//             let startPage = 5;
//             let endPage = startPage + payloadPages - 1;

//             resp = await cmd([0x3A, startPage, endPage]);
//             bytes = resp.toString().split(",");
//             let text = "";

//             for(let i=0; i<bytes.length; i++){
//                 if (i < 5){
//                     continue;
//                 }

//                 if (parseInt(bytes[i]) === 254){
//                     break;
//                 }

//                 text = text + String.fromCharCode(parseInt(bytes[i]));

//             }

//             this.setState({
//                 log: text
//             })

//             this._cleanUp();
//         } catch (ex) {
//             this.setState({
//                 log: ex.toString()
//             })
//             this._cleanUp();
//         }
//     }

//     writeData = async () => {
//         if (!this.state.text){
//             Alert.alert("Nothing to write");
//             return;
//         }
//         try {
//             // let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
//             let tech = Platform.OS === 'android' ? NfcTech.NfcA : NfcTech.NfcA;
//             let resp = await NfcManager.requestTechnology(tech, {
//                 alertMessage: 'Ready to do some custom Mifare cmd!'
//             });

//             let text = this.state.text;
//             let fullLength = text.length + 7;
//             let payloadLength = text.length + 3;

//             // let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
//             let cmd = Platform.OS === 'android' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;

//             resp = await cmd([0xA2, 0x04, 0x03, fullLength, 0xD1, 0x01]); // 0x0C is the length of the entry with all the fluff (bytes + 7)
//             resp = await cmd([0xA2, 0x05, payloadLength, 0x54, 0x02, 0x65]); // 0x54 = T = Text block, 0x08 = length of string in bytes + 3

//             let currentPage = 6;
//             let currentPayload = [0xA2, currentPage, 0x6E];

//             for(let i=0; i<text.length; i++){
//                 currentPayload.push(text.charCodeAt(i));
//                 if (currentPayload.length == 6){
//                     resp = await cmd(currentPayload);
//                     currentPage += 1;
//                     currentPayload = [0xA2, currentPage];
//                 }
//             }

//             // close the string and fill the current payload
//             currentPayload.push(254);
//             while(currentPayload.length < 6){
//                 currentPayload.push(0);
//             }

//             resp = await cmd(currentPayload);

//             this.setState({
//                 log: resp.toString()
//             })

//             this._cleanUp();
//         } catch (ex) {
//             this.setState({
//                 log: ex.toString()
//             })
//             this._cleanUp();
//         }
//     }

//     onChangeText = (text) => {
//         this.setState({
//             text
//         })
//     }

//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <TextInput
//                     style={styles.textInput}
//                     onChangeText={this.onChangeText}
//                     autoCompleteType="off"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     placeholderTextColor="#888888"
//                     placeholder="Enter text here" />

//                 <TouchableOpacity
//                     style={styles.buttonWrite}
//                     onPress={this.writeData}>
//                     <Text style={styles.buttonText}>Write</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={styles.buttonRead}
//                     onPress={this.readData}>
//                     <Text style={styles.buttonText}>Read</Text>
//                 </TouchableOpacity>

//                 <View style={styles.log}>
//                     <Text>{this.state.log}</Text>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//     },
//     textInput: {
//         marginLeft: 20,
//         marginRight: 20,
//         marginBottom: 10,
//         height: 50,
//         textAlign: 'center',
//         color: 'black'
//     },
//     buttonWrite: {
//         marginLeft: 20,
//         marginRight: 20,
//         marginBottom: 10,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//         backgroundColor: '#9D2235'
//     },
//     buttonRead: {
//         marginLeft: 20,
//         marginRight: 20,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//         backgroundColor: '#006C5B'
//     },
//     buttonText: {
//         color: '#ffffff'
//     },
//     log: {
//         marginTop: 30,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//     }
// })

// export default App;