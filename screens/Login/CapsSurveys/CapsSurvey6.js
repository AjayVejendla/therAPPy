//written by: Ariela Chomski
//debugged by: Ariela Chomski
import React, {Component} from 'react';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';

const survey = [
    {
        id: 'q26',
        text: 'I drink alcohol frequently',
    },
    {
        id: 'q27',
        text: 'I have spells of terror or panic',
    },
    {
        id: 'q28',
        text: 'I am enthusiastic about life',
    },
    {
        id: 'q29',
        text: "When I drink alcohol I can't remember what happened",
    },
    {
        id: 'q30',
        text: 'I feel tense',
    },
];

export default class CapsSurvey6 extends Component {
    state = {
        q26: -1,
        q27: -1,
        q28: -1,
        q29: -1,
        q30: -1,
        radio_props: [
            {label: '0', value: 0},
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
        ],
    };

    constructor(props) {
        super(props);
        this.answers = new Map();
    }
    handleKey(key) {
        console.log(key);
    }
    handlePackage(id, value) {
        this.answers.set(id, value);
        global.survey.push(value);
    }
    render() {
        let radioFormArr;
        radioFormArr = survey.map(buttonInfo => (
            <View key={buttonInfo.id}>
                <Text style={styles.loginText}>{buttonInfo.text}</Text>
                <RadioForm
                    radio_props={this.state.radio_props}
                    initial={0}
                    onPress={value => {
                        this.handlePackage(buttonInfo.id, value);
                    }}
                    formHorizontal={true}
                    labelHorizontal={false}
                />
            </View>
        ));
        return (
            <View style={styles.container}>
                <Text style={styles.loginText}>Initial Survey based on CAPS form</Text>
                <Text style={styles.loginText}>Questions: 26-30 / 62</Text>
                <ScrollView>{radioFormArr}</ScrollView>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => {
                        console.log(this.answers);
                        //firebase.firestore().collection(firebase.auth().currentUser.uid).doc('capsForm').set({'1-5':this.answers});
                        this.props.navigation.navigate('CapsSurvey7Screen')}}>
                    <Text style={styles.loginText}>To questions 31-35</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //therappy1: #707590
        //therappylessblue: #707586
        backgroundColor: '#f2e9e1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 50,
        //therappy1: #584d9b
        //therappylessblue: #584d9b
        //therappyteal: #20c0b0
        //therappyAIAIAIAI: #fdfdfb
        //lime green: #cbe86b
        color: '#ff666b',
        marginBottom: 40,
    },
    inputView: {
        width: '80%',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
    },
    inputText: {
        height: 50,
        color: '#000000',
    },
    forgot: {
        color: 'black',
        fontSize: 14,
    },
    loginText: {
        color: 'black',
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    rightBtn: {
        width: '45%',
        backgroundColor: '#ff666b',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightView: {
        flex: 1,
        marginTop: 25,
    },
    leftView: {
        flex: 1,
        marginLeft: 90,
        marginTop: 25,
    },
    leftBtn: {
        width: '45%',
        backgroundColor: '#ff666b',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtn: {
        width: '80%',
        backgroundColor: '#7f58ff',
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
        // padding:20,
    },
});
